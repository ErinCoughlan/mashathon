
from os import walk
from os.path import join
from pyechonest import config,track

import models

config.ECHO_NEST_API_KEY = 'DY8SILMY87LES3ADW'

myMusicPath = "music"

def GetMP3FileList():
    f = []
    for (dirpath, dirnames, filenames) in walk(myMusicPath):
        filenames = filter(lambda x: x.endswith(".mp3"), filenames)
        f.extend([join(dirpath, filename) for filename in filenames])

    return f

def AnalyzeMP3Files():
    foo = GetMP3FileList()
    for file in foo:
        f = open(file)
        theTrack = track.track_from_file(f, 'mp3')
        theTrack.get_analysis()
        trackObj = models.trackInfo(theTrack)
        try: print theTrack.title
        except: print "unknown track"
        trackObj.save()




