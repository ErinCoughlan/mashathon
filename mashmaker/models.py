from django.db import models
from django.core.files import File

# Create your models here.

class trackInfo(models.Model):
    filePath = models.CharField(max_length=255)
    title = models.CharField(max_length=127)
    danceability = models.FloatField()
    energy = models.FloatField()
    loudness = models.FloatField()
    speechiness = models.FloatField()
    acousticness = models.FloatField()
    key = models.IntegerField()
    mode = models.IntegerField()
    valence = models.FloatField()
    timeSig = models.IntegerField()
    tempo = models.FloatField()
    beats = models.CharField(max_length=10000)


    def __init__(self, theTrack, trackFilePath):
        super(trackInfo, self).__init__()
        self.filePath = trackFilePath
        self.title = theTrack.meta['title'] if theTrack.meta['title'] is not None else "unknown"
        self.danceability = theTrack.danceability if theTrack.danceability is not None else -1
        self.energy = theTrack.energy if theTrack.energy is not None else -1
        self.loudness = theTrack.loudness if theTrack.loudness is not None else -1
        self.speechiness = theTrack.speechiness if theTrack.speechiness is not None else -1
        self.acousticness = theTrack.acousticness if theTrack.acousticness  is not None else -1
        self.key = theTrack.key if theTrack.key is not None else -1
        self.mode = theTrack.mode if theTrack.mode is not None else -1
        self.valence = theTrack.valence if theTrack.valence is not None else -1
        self.timeSig = theTrack.time_signature if theTrack.time_signature  is not None else -1
        self.tempo = theTrack.tempo if theTrack.tempo is not None else -1
        self.beats = repr(theTrack.beats)








