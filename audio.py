from scipy.io.wavfile import read
import sys;args=sys.argv[1:]

samplingRate, audio = read(args[0])

print(samplingRate)
print(audio[5])