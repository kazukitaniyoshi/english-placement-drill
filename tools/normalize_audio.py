#!/usr/bin/env python3
"""MP3の音量を TARGET LUFS にそろえる。測る→差の分だけ上げる→ピークを -1dB で抑える
使い方: normalize_audio.py [ファイル ...]（省略時は audio/ の全MP3）"""
import os, re, subprocess, sys
TARGET = -13.0
AUD = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "audio")

def loudness(p):
    out = subprocess.run(["ffmpeg", "-i", p, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", out)[-1])

def normalize(p):
    gain = TARGET - loudness(p)
    tmp = p + ".tmp.mp3"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", p, "-af", f"volume={gain:.2f}dB,alimiter=limit=0.89:level=false",
                    "-ac", "1", "-ar", "24000", "-b:a", "64k", tmp], check=True)
    os.replace(tmp, p)
    return loudness(p)

if __name__ == "__main__":
    files = sys.argv[1:] or [os.path.join(AUD, f) for f in sorted(os.listdir(AUD)) if f.endswith(".mp3") and f != "silence.mp3"]
    for p in files: print(f"{normalize(p):.1f} LUFS", os.path.basename(p))
