#!/usr/bin/env python3
"""問題のお手本音声を Gemini TTS で作り、audio/ に置く。
- 既にあるファイルは作らない（何度実行しても続きから再開）
- 無料枠の1日上限に当たったら止まる。翌日また実行すれば続きから作る
- 音声ファイル名は「本文」から決める（問題の並び順が変わってもズレない）
- 作り終わったら audio/manifest.js を作り直し、--publish なら commit & push する
"""
import os, sys, json, time, base64, wave, hashlib, subprocess, urllib.request, urllib.error, datetime

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUD = os.path.join(ROOT, "audio")
# 無料枠はモデルごとに別。上から順に使い、1日の上限に当たったら次のモデルへ
MODELS = os.environ.get("MODELS", "gemini-2.5-flash-preview-tts,gemini-3.1-flash-tts-preview,gemini-3.8-flash-tts,gemini-3.8-flash-lite-tts").split(",")
STYLED = {"gemini-2.5-flash-preview-tts"}   # 指示文つきで読ませられるモデル（他は指示文まで読んでしまうので本文だけ渡す）
exhausted = set()
FEMALE = ["Kore", "Aoede", "Leda", "Zephyr"]
MALE = ["Puck", "Charon", "Orus", "Fenrir"]
MIXED = [v for p in zip(FEMALE, MALE) for v in p]
NARRATOR = "Iapetus"
GAP_MS = int(os.environ.get("GAP_MS", "7000"))  # リクエスト間隔（無料枠の1分あたり上限よけ）
MAX_PER_RUN = int(os.environ.get("MAX_PER_RUN", "1000"))

def log(*a):
    print(datetime.datetime.now().strftime("%m-%d %H:%M:%S"), *a, flush=True)

def api_key():
    k = os.environ.get("GEMINI_API_KEY")
    if k: return k
    for l in open(os.path.expanduser("~/.claude/.env")):
        if l.startswith("GEMINI_API_KEY="):
            return l.split("=", 1)[1].strip().strip("\"'")
    sys.exit("GEMINI_API_KEY がありません")

def fname(part, key):
    return f"{part}-{hashlib.sha1(key.encode()).hexdigest()[:10]}.mp3"

def load_items():
    js = "global.window={};" + "".join(f'require("{ROOT}/data/{f}");' for f in ["partBG.js","partC.js","partD.js"]) + "process.stdout.write(JSON.stringify(window.RAW))"
    return json.loads(subprocess.check_output(["node", "-e", js]))

def jobs():
    R = load_items(); out = []
    for i, b in enumerate(R["B"]):
        out.append(("B", "B|" + b[0], f"Say in a natural, friendly American voice with lively intonation: {b[0]}", MIXED[i % 8], None, b[0], b[0]))
    for i, g in enumerate(R["G"]):
        out.append(("G", "G|" + g[0], f"Say in a natural, everyday voice with lively intonation: {g[0]}", MIXED[(i * 3 + 1) % 8], None, g[0], g[0]))
    for i, c in enumerate(R["C"]):
        ph = " ... ".join(x.rstrip(".") + "." for x in c[0])
        out.append(("C", "C|" + "|".join(c[0]), f"Say each phrase separately in a natural American voice, with a short pause between them: {ph}", MIXED[(i * 5 + 2) % 8], None, " ".join(c[0]), list(c[0])))
    for i, d in enumerate(R["D"]):
        first = "Woman" if d[0] == "W" else "Man"; other = "Man" if first == "Woman" else "Woman"
        names = [first, other, first]
        conv = "\n".join(f"{n}: {t}" for n, t in zip(names, d[1]))
        sp = [("Woman", FEMALE[i % 4]), ("Man", MALE[(i + 1) % 4])]
        out.append(("D", "D|" + d[0] + "|" + "|".join(d[1]),
                    "TTS the following conversation between Woman and Man, sounding like real people chatting, with natural, lively intonation:\n" + conv,
                    None, sp, " ".join(d[1]), [(dict(sp)[n], t) for n, t in zip(names, d[1])]))
        out.append(("D", "Q|" + d[2], f"Say in a calm, clear American voice: {d[2]}", NARRATOR, None, d[2], d[2]))
    return out

class Quota(Exception): pass

def call(key, prompt, voice, speakers, MODEL):
    if speakers:
        sc = {"multiSpeakerVoiceConfig": {"speakerVoiceConfigs": [{"speaker": s, "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": v}}} for s, v in speakers]}}
    else:
        sc = {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}}
    body = json.dumps({"contents": [{"parts": [{"text": prompt}]}],
                       "generationConfig": {"responseModalities": ["AUDIO"], "speechConfig": sc}}).encode()
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={key}"
    for attempt in range(6):
        try:
            d = json.load(urllib.request.urlopen(urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"}), timeout=180))
            return base64.b64decode(d["candidates"][0]["content"]["parts"][0]["inlineData"]["data"])
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors="ignore")
            if e.code == 429:
                if "PerDay" in msg or "per day" in msg.lower() or attempt >= 3:
                    raise Quota(msg[:300])
                log("429（1分あたり上限）→ 65秒待つ"); time.sleep(65); continue
            if e.code in (500, 502, 503, 504):
                log("HTTP", e.code, "→ 待って再試行"); time.sleep(20 * (attempt + 1)); continue
            raise RuntimeError(f"HTTP {e.code}: {msg[:300]}")
        except (KeyError, IndexError):
            log("音声が返らず → 再試行"); time.sleep(10); continue
        except Exception as e:
            log("通信エラー", e, "→ 再試行"); time.sleep(20); continue
    raise RuntimeError("再試行しても失敗")

SIL = b"\x00\x00"
def gap(sec): return SIL * int(24000 * sec)

def trim_pcm(pcm):
    """前後の無音を落とす。句や発話をつなぐ前に使う"""
    import array
    a = array.array("h", pcm); th = 400; n = len(a)
    i = 0
    while i < n and abs(a[i]) < th: i += 1
    j = n - 1
    while j > i and abs(a[j]) < th: j -= 1
    i = max(0, i - 1200); j = min(n, j + 2400)
    return a[i:j].tobytes()

def synth(key, job):
    """使えるモデルで音声(PCM)を作る。全モデルが上限なら Quota"""
    part, k, prompt, voice, speakers, text, plain = job
    for m in MODELS:
        if m in exhausted: continue
        try:
            if m in STYLED:
                return call(key, prompt, voice, speakers, m), m
            # 指示文なしモデル：本文だけ。C は句ごと、D の会話は発話ごとに作ってつなぐ
            if part == "C" and isinstance(plain, list):
                segs = [trim_pcm(call(key, x.rstrip(".") + ".", voice, None, m)) for x in plain]
                return gap(0.9).join(segs), m
            if isinstance(plain, list):
                segs = [trim_pcm(call(key, t, v, None, m)) for v, t in plain]
                return gap(0.45).join(segs), m
            return call(key, plain, voice, None, m), m
        except Quota:
            log("上限:", m, "→ 次のモデルへ"); exhausted.add(m)
    raise Quota("全モデルが今日の上限")

def encode(pcm, out):
    tmp = out + ".wav"
    w = wave.open(tmp, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm); w.close()
    # 前後の無音を削る（アプリは再生が終わってから回答タイマーを始めるため）
    af = "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.15,areverse"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", tmp, "-af", af, "-ac", "1", "-ar", "24000", "-b:a", "64k", out], check=True)
    os.remove(tmp)
    from normalize_audio import normalize
    normalize(out)   # スマホのスピーカーでも聞こえる音量に揃える
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out]).strip())

def plausible(dur, text, part):
    w = len(text.split())
    hi = w * 0.75 + (4.0 if part in ("C", "D") else 2.0)   # 指示文まで読んだら長くなる
    return 0.6 <= dur <= hi

def manifest():
    have = set(os.listdir(AUD))
    m = {}
    for part, key, *_ in jobs():
        f = fname(part, key)
        if f in have: m[key] = f
    with open(os.path.join(AUD, "manifest.js"), "w") as fp:
        fp.write("/* 自動生成（tools/gen_audio.py）。本文→音声ファイル */\nwindow.AUDIO=" + json.dumps(m, ensure_ascii=False, indent=0) + ";\n")
    return len(m)

def publish(n_new, total, all_count):
    if n_new == 0: return
    subprocess.run(["git", "-C", ROOT, "add", "audio"], check=True)
    subprocess.run(["git", "-C", ROOT, "commit", "-q", "-m", f"お手本音声を{n_new}本追加（計{total}/{all_count}）\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"], check=True)
    subprocess.run(["git", "-C", ROOT, "pull", "-q", "--rebase", "--autostash", "origin", "main"], check=True)
    subprocess.run(["git", "-C", ROOT, "push", "-q", "origin", "main"], check=True)
    log("公開しました", n_new, "本追加")

def main():
    os.makedirs(AUD, exist_ok=True)
    only = [a for a in sys.argv[1:] if not a.startswith("--")]
    key = api_key(); todo = [j for j in jobs() if (not only or j[0] in only)]
    all_count = len(jobs())
    made = 0; failed = []
    for job in todo:
        part, k, prompt, voice, speakers, text, plain = job
        out = os.path.join(AUD, fname(part, k))
        if os.path.exists(out): continue
        if made >= MAX_PER_RUN: break
        try:
            ok = False
            for t in range(2):
                pcm, used = synth(key, job)
                dur = encode(pcm, out)
                time.sleep(GAP_MS / 1000)
                if plausible(dur, text, part): ok = True; break
                log("長さが不自然", f"{dur:.1f}秒", k[:60], "→ 作り直し"); os.remove(out)
            if ok:
                mp = os.path.join(AUD, "models.json"); md = json.load(open(mp)) if os.path.exists(mp) else {}
                md[os.path.basename(out)] = used; json.dump(md, open(mp, "w"), indent=0, sort_keys=True)
            if ok: made += 1; log("OK", part, used.replace("gemini-", ""), f"{dur:.1f}秒", k[:60])
            else: failed.append(k)
        except Quota as e:
            log("今日の無料枠の上限に達しました。明日続きから作ります。", str(e)[:120]); break
        except Exception as e:
            log("失敗", k[:60], e); failed.append(k)
            if os.path.exists(out): os.remove(out)
    total = manifest()
    log(f"今回 {made} 本作成／合計 {total}/{all_count} 本／失敗 {len(failed)} 本")
    if "--publish" in sys.argv: publish(made, total, all_count)
    if total >= all_count: open(os.path.join(AUD, ".done"), "w").write("done\n")

if __name__ == "__main__":
    main()
