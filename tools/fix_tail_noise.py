#!/usr/bin/env python3
"""3.8系TTSが発話の後ろに付ける「グシャ」という短い雑音を切り落とす。
ルール: 発話のあと 0.2秒以上の無音をはさんで、0.4秒以下の音のかたまりで終わっていたら、そのかたまりを消す。
C（句を無音でつないだもの）は、つなぎ目の完全な無音で区切ってから句ごとに処理する。
使い方: fix_tail_noise.py ファイル...  （変更したファイル名を表示）"""
import array, math, os, subprocess, sys
SR = 24000; WIN = int(SR * 0.05)

def db(seg):
    if not seg: return -99
    return 20 * math.log10(max(1, math.sqrt(sum(x * x for x in seg) / len(seg))) / 32768)

def fix_piece(a):
    """1つの発話(array)の末尾の雑音を落として返す"""
    lv = [db(a[i:i + WIN]) for i in range(0, len(a), WIN)]
    loud = [l > -40 for l in lv]
    if not any(loud): return a, False
    # 末尾から見て最後の音のかたまり
    j = len(loud) - 1
    while j >= 0 and not loud[j]: j -= 1
    k = j
    while k >= 0 and loud[k]: k -= 1          # かたまりは (k, j]
    burst = j - k
    g = k
    while g >= 0 and not loud[g]: g -= 1      # その前の無音は (g, k]
    gap = k - g
    if g >= 0 and burst * 0.05 <= 0.4 and gap * 0.05 >= 0.2:
        cut = (k + 1) * WIN
        return a[:min(len(a), cut - int(gap * WIN * 0.5))], True
    return a, False

def split_zero(a, min_len=int(SR * 0.3)):
    """完全な無音(=0)が min_len 以上続く所で分ける"""
    parts, gaps, i, start, n = [], [], 0, 0, len(a)
    while i < n:
        if a[i] == 0:
            j = i
            while j < n and a[j] == 0: j += 1
            if j - i >= min_len and i > start:
                parts.append(a[start:i]); gaps.append(j - i); start = j
            i = j
        else: i += 1
    parts.append(a[start:]); return parts, gaps

def process(path):
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", path, "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True).stdout
    a = array.array("h", raw)
    # MP3は完全な0にならないので、ごく小さい値を0とみなして区切る
    z = array.array("h", (0 if abs(x) < 8 else x for x in a))
    parts, gaps = split_zero(z)
    changed = False; out = array.array("h")
    for idx, p in enumerate(parts):
        fp, c = fix_piece(p); changed |= c; out.extend(fp)
        if idx < len(gaps): out.extend(array.array("h", [0] * gaps[idx]))
    if not changed: return False
    tmp = path + ".tmp.mp3"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "s16le", "-ar", str(SR), "-ac", "1", "-i", "-", "-ac", "1", "-ar", str(SR), "-b:a", "64k", tmp],
                   input=out.tobytes(), check=True)
    os.replace(tmp, path); return True

if __name__ == "__main__":
    for p in sys.argv[1:]:
        if process(p): print("直した", os.path.basename(p))
