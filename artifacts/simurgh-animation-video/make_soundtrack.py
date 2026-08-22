import math
import wave
from pathlib import Path

import numpy as np

RATE = 48_000
DURATION = 22.48
N = int(RATE * DURATION)
t = np.arange(N, dtype=np.float64) / RATE
mix = np.zeros(N, dtype=np.float64)


def add_tone(start, duration, frequency, gain, attack=0.08, release=0.3, shimmer=0.0):
    i0 = int(start * RATE)
    i1 = min(N, i0 + int(duration * RATE))
    if i1 <= i0:
        return
    local = np.arange(i1 - i0, dtype=np.float64) / RATE
    env = np.ones_like(local)
    env *= np.minimum(1.0, local / max(attack, 1 / RATE))
    env *= np.minimum(1.0, (duration - local) / max(release, 1 / RATE))
    phase = 2 * np.pi * frequency * local
    tone = np.sin(phase) + 0.22 * np.sin(2 * phase) + shimmer * np.sin(3 * phase)
    mix[i0:i1] += gain * env * tone


def add_kick(start, gain=0.32):
    i0 = int(start * RATE)
    length = int(0.34 * RATE)
    i1 = min(N, i0 + length)
    local = np.arange(i1 - i0, dtype=np.float64) / RATE
    phase = 2 * np.pi * (42 * local + 62 * (1 - np.exp(-local * 18)) / 18)
    mix[i0:i1] += gain * np.sin(phase) * np.exp(-local * 13)


def add_tick(start, gain=0.055):
    i0 = int(start * RATE)
    length = int(0.055 * RATE)
    i1 = min(N, i0 + length)
    local = np.arange(i1 - i0, dtype=np.float64) / RATE
    rng = np.random.default_rng(int(start * 1000) + 47)
    mix[i0:i1] += gain * rng.normal(0, 1, i1 - i0) * np.exp(-local * 85)


# Warm suspended chords, aligned to the six visual scenes.
scene_starts = [0.0, 3.5, 7.2, 10.8, 14.6, 18.1]
chords = [
    (146.83, 220.00, 293.66),  # Dm-like
    (174.61, 220.00, 261.63),
    (130.81, 196.00, 261.63),
    (146.83, 220.00, 293.66),
    (164.81, 246.94, 329.63),
    (146.83, 220.00, 293.66),
]
for idx, start in enumerate(scene_starts):
    end = scene_starts[idx + 1] if idx + 1 < len(scene_starts) else DURATION
    for frequency in chords[idx]:
        add_tone(start, end - start + 0.3, frequency, 0.025, attack=0.55, release=0.7, shimmer=0.08)

# Minimal 112 BPM pulse and melodic glass-like arpeggio.
beat = 60 / 112
cursor = 0.0
step = 0
scale = [293.66, 349.23, 440.00, 523.25, 440.00, 349.23]
while cursor < DURATION:
    if step % 2 == 0:
        add_kick(cursor, 0.25 if cursor < 18.1 else 0.18)
    add_tick(cursor + beat / 2, 0.035)
    note = scale[step % len(scale)]
    add_tone(cursor + 0.02, 0.25, note, 0.035, attack=0.008, release=0.18, shimmer=0.25)
    cursor += beat
    step += 1

# Soft transition chimes at scene cuts.
for start in scene_starts[1:]:
    add_tone(start, 1.1, 587.33, 0.045, attack=0.01, release=0.9, shimmer=0.3)
    add_tone(start + 0.08, 1.0, 880.00, 0.027, attack=0.01, release=0.8, shimmer=0.2)

# Gentle stereo width and safe mastering.
delay = int(0.012 * RATE)
left = mix.copy()
right = np.zeros_like(mix)
right[delay:] = mix[:-delay]
right += 0.2 * mix
fade_in = np.minimum(1.0, t / 0.8)
fade_out = np.minimum(1.0, (DURATION - t) / 1.4)
envelope = np.clip(fade_in * fade_out, 0, 1)
stereo = np.stack([left, right], axis=1) * envelope[:, None]
peak = np.max(np.abs(stereo))
stereo = np.tanh(stereo / max(peak, 1e-9) * 1.35) * 0.72
pcm = np.int16(np.clip(stereo, -1, 1) * 32767)

output = Path(__file__).with_name('simurgh-ui-original-soundtrack.wav')
with wave.open(str(output), 'wb') as wav:
    wav.setnchannels(2)
    wav.setsampwidth(2)
    wav.setframerate(RATE)
    wav.writeframes(pcm.tobytes())
print(output)
