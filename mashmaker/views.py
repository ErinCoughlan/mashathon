from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import Context, loader
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt

import json

import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

from random import shuffle

# Create your views here.


def home(request):
    # homepage
    #t = loader.get_template('home.html')
    musicDir = os.path.join(BASE_DIR, "music")
    files = os.listdir(musicDir + "/homework") + os.listdir(musicDir + "/pop:dance")
    files = filter( lambda f: not f.startswith('.'), files)
    files = filter( lambda f: not "'" in f, files)
    shuffle(files)
    return render_to_response('mashmaker/home.html', {"file_list": files})

def visual(request):
    return render_to_response('mashmaker/visual.html', {})

def music(request):
    if request.method == "POST":
        print "post done"
        json_data = json.dumps({"HTTPRESPONSE":1})
        # json data is just a JSON string now.
        return HttpResponse(json_data, mimetype="application/json")
    else:
        print "post failed"
        json_data = json.dumps({"HTTPRESPONSE":0})
        # json data is just a JSON string now.
        return HttpResponse(json_data, mimetype="application/json")

@csrf_exempt
def player(request):
    if request.method == "POST":
        print "post done"
        data = request.REQUEST
        filename = data['filename']

        path1 = os.path.join(BASE_DIR, "music/homework/"+filename)
        path2 = os.path.join(BASE_DIR, "music/pop:dance/"+filename)
        if os.path.exists(path1) or os.path.exists(path2):
            json_data = json.dumps({"HTTPRESPONSE":1})
        else:
            json_data = json.dumps({"HTTPRESPONSE":0})
        return HttpResponse(json_data, mimetype="application/json")


def getNextChunk(request):
    if request.method == "GET":
        mp3 = open(os.path.join(BASE_DIR, "static/test.mp3"), 'r')
        data = mp3.read()
        mp3.close()
        response = HttpResponse(data, mimetype='audio/mpeg3')
        response['Content-Disposition'] = 'attachment; filename=test.mp3'
        return response
