from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import Context, loader
from django.http import Http404

from random import shuffle

import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# Create your views here.


def home(request):
    # homepage
    musicDir = os.path.join(BASE_DIR, "music")
    files = os.listdir(musicDir + "/homework") + os.listdir(musicDir + "/pop:dance")
    files = filter( lambda f: not f.startswith('.'), files)
    shuffle(files)
    return render_to_response('mashmaker/home.html', {"file_list": files})