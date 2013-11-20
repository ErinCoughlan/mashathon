var dancer, prevDancer;
var wavesurfer, wavesurfer2;
var last = 0;

"use strict";
function upload() {
    // Change the text
    var input = document.getElementById('fileInput');
    var filename = $('input[type=file]').val().split('\\').pop();

    // Send the audio file to the server
    chooseSong(filename);
};


function autoUpload(songName) {
    doTheWave("/static/" + songName);

    // Send the audio file to the server
    chooseSong(songName);
}


function previewSong(songSrc) {
    var elem = document.getElementById('preview');
    elem.innerHTML = '<audio src="' + songSrc + '" controls="controls">';
};


function chooseSong(songName) {
    var textBox = document.getElementById('longInput');
    textBox.value = songName;

    var dataObject = { 'filename': songName};
	// Actually submit the rating to the database
    $.ajax({
    	type: 'POST',
    	url: '../player/',
     	data: dataObject,
     	success: function (msg){
            var elem = document.getElementById("response");
     		if (msg.HTTPRESPONSE == 1) {
                elem.innerHTML = '<div class="success">Successfully uploaded the song. Analyzing...</div>';
            } else {
                elem.innerHTML = '<div class="fail">Failed upload. Please try again.</div>';
            }
      	}
    });
}


/** Submit handler through jquery */
$(document).ready(function() {
    //previewSong("song");

    // Wavesurfer is so much easier than Dancer
    wavesurfer = Object.create(WaveSurfer);
    wavesurfer2 = Object.create(WaveSurfer);
    var options = {
        container: document.getElementById('waveform'),
        waveColor: 'violet',
        progressColor: 'purple',
        minPxPerSec: 100,
        scrollParent: true
    }
    var options2 = {
        container: document.getElementById('waveform2'),
        waveColor: 'violet',
        progressColor: 'purple',
        minPxPerSec: 100,
        scrollParent: true
    }
    wavesurfer.init(options);
    wavesurfer2.init(options2);
    document.getElementById('waveform').style.display = "none";
    document.getElementById('waveform2').style.display = "none";

    // For reading in files
    var fileInput = document.getElementById("fileInput");
    var freader = new FileReader();

    freader.onload = function(e) {
        doTheWave(e.target.result);
    }

    fileInput.onchange = function(e) {
        var files = e.target.files;
        // Gives us e.target.result, which is a song
        freader.readAsDataURL(files[0]);

        upload();
    }
});

/* Wavesurfer is better than Dancer */
function doTheWave(AUDIO_FILE) {
    // Determine which waveform had been there longer and replace it
    if (last == 0) {
        swapElements(document.getElementById('waveform'), document.getElementById('waveform2'));
        document.getElementById('waveform').style.display = "block";
        wavesurfer.on('ready', function () {
            wavesurfer.play();
        });

        wavesurfer.on('error', function () {
            var elem = document.getElementById("response");
            elem.innerHTML = '<div class="fail">Failed upload. Please try again.</div>';
        });

        wavesurfer.load(AUDIO_FILE);
        last = 1;
    } else {
        swapElements(document.getElementById('waveform2'), document.getElementById('waveform'));
        document.getElementById('waveform2').style.display = "block";
        wavesurfer2.on('ready', function () {
            wavesurfer2.play();
        });

        wavesurfer2.on('error', function () {
            var elem = document.getElementById("response");
            elem.innerHTML = '<div class="fail">Failed upload. Please try again.</div>';
        });

        wavesurfer2.load(AUDIO_FILE);
        last = 0;
    }

}

function swapElements(obj1, obj2) {
    if (obj2.nextSibling === obj1) {
        obj1.parentNode.insertBefore(obj2, obj1.nextSibling);
    } else {
        obj1.parentNode.insertBefore(obj2, obj1);
    }
}