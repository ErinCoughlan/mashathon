from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import Context, loader
from django.http import Http404



# Create your views here.


def home(request):
    # homepage
    #t = loader.get_template('home.html')
    musicDir = os.path.join(BASE_DIR, "music")
    files = os.listdir(musicDir + "/homework") + os.listdir(musicDir + "/pop:dance")
    files = filter( lambda f: not f.startswith('.'), files)
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

def player(request):
    if request.method == "POST":
        print "post done"
        data = request.REQUEST
        filename = data['fileneame']

        if os.path.exists(os.path.join(BASE_DIR, "music/"+filename)):
            json_data = json.dumps({"HTTPRESPONSE":1})
        else:
            json_data = json.dumps({"HTTPRESPONSE":0})
        return HttpResponse(json_data, mimetype="application/json")

