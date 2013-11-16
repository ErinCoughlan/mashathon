from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import Context, loader
from django.http import Http404



# Create your views here.


def home(request):
    # homepage
    #t = loader.get_template('home.html')
    return render_to_response('mashmaker/home.html', {})