
from os import walk

myMusicPath = "../music"

def getMP3FileList():
    f = []
    for (dirpath, dirnames, filenames) in walk(myMusicPath):
        filenames = filter(lambda x: x.endswith(".mp3"), filenames)
        f.extend(filenames)
    return f


