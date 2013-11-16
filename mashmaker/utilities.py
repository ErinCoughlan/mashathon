
from os import walk
from os.path import join
from pyechonest import config,track
from random import randint, choice
import echonest.remix.audio as audio

import models
from models import trackInfo
config.ECHO_NEST_API_KEY = 'DY8SILMY87LES3ADW'

myMusicPath = "music"
myMusicList = []

def GetMP3FileList():
    f = []
    for (dirpath, dirnames, filenames) in walk(myMusicPath):
        filenames = filter(lambda x: x.endswith(".mp3"), filenames)
        f.extend([join(dirpath, filename) for filename in filenames])

    return f

def AnalyzeMP3Files():
    foo = GetMP3FileList()
    for file in foo:
        AnalyzeMP3File(file)

def AnalyzeMP3File(file):
    f = open(file)
    theTrack = track.track_from_file(f, 'mp3')
    theTrack.get_analysis()
    trackObj = models.trackInfo(theTrack,file)
    try: print theTrack.title
    except: print "unknown track"
    trackObj.save()
    f.close()

def CreateSongQueue(firstSong):
    myMusicList.append((firstSong, 0, None))
    currentSong = firstSong
    while True:
        (nextSong, nextSongStartTime, currentSongEndTime) = ChooseNextSong(currentSong)
        myMusicList[-1] = myMusicList[-1][:2] + (currentSongEndTime)
        myMusicList.append((nextSong, nextSongStartTime, None))
        currentSong = nextSong

def GetNextSong(firstSong):
    (nextSong, nextSongStartTime, previousSongEndTime) = ChooseNextSong(firstSong)
    SendMP3OfSong(nextSong, nextSongStartTime)

def ChooseNextSong(previousSong):
    numSongs = models.trackInfo.objects.latest('id').id
    nextSong = trackInfo.objects.get(pk=randint(1,numSongs))
    eval(nextSong.beats)
    nextSongStartBeat = choice(range(len(eval(nextSong.beats))))
    previousSongEndTime = choice(range(len(eval(previousSong.beats))))
    return (nextSong, nextSongStartBeat, previousSongEndTime)

def SendMP3OfSong(nextSong, nextSongStartBeat):
    collect = audio.AudioQuantumList()
    audiofile = audio.LocalAudioFile(str(nextSong.filePath))

    oldBeats = audiofile.analysis.beats
    beats = []
    i = 0

    for beat in oldBeats:
        if i >= nextSongStartBeat: collect.append(beat.children()[0])
        i += 1

    for beat in beats:
        collect.append(beat.children()[0])

    out = audio.getpieces(audiofile, collect)

    # TODO: actual path here
    out.encode("/tmp/".join(nextSong.title))

