var dancer, prevDancer;
var wavesurfer;

"use strict";
function upload() {
    // Change the text
    var input = document.getElementById('fileInput');
    var filename = $('input[type=file]').val().split('\\').pop();

    // Send the audio file to the server
    chooseSong(filename);
};


function autoUpload(songName) {
    doTheWave2("/static/" + songName);

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

    /*
     * Dancer.js magic
     */
    Dancer.setOptions({
        flashSWF : '../../lib/soundmanager2.swf',
        flashJS  : '../../lib/soundmanager2.js'
    });
    dancer = new Dancer();

    // Wavesurfer is so much easier than Dancer
    wavesurfer = Object.create(WaveSurfer);
    var options = {
        container: document.getElementById('waveform'),
        waveColor: 'violet',
        progressColor: 'purple',
        minPxPerSec: 100,
        scrollParent: true
    }
    wavesurfer.init(options);
    document.getElementById('waveform').style.display = "none";

    // For reading in files
    var fileInput = document.getElementById("fileInput");
    var freader = new FileReader();

    freader.onload = function(e) {
        doTheWave2(e.target.result);
    }

    fileInput.onchange = function(e) {
        var files = e.target.files;
        // Gives us e.target.result, which is a song
        freader.readAsDataURL(files[0]);

        upload();
    }
});


/** Dancer everything... */
function doTheWave(AUDIO_FILE) {
    var audio = document.getElementById("player");

    var
        waveform = document.getElementById( 'wave1' ),
        ctx = waveform.getContext( '2d' );

    var kick = dancer.createKick({
        onKick: function () {
            ctx.strokeStyle = '#ff0077';
        },
        offKick: function () {
            ctx.strokeStyle = '#666';
        }
    }).on();

    dancer
        .load({ src: AUDIO_FILE})
        .waveform( waveform, { strokeStyle: '#666', strokeWidth: 2 });

    dancer.play();
};


function doTheWave2(AUDIO_FILE) {
    document.getElementById('waveform').style.display = "block";
    wavesurfer.on('ready', function () {
        wavesurfer.play();
    });

    wavesurfer.on('error', function () {
        var elem = document.getElementById("response");
        elem.innerHTML = '<div class="fail">Failed upload. Please try again.</div>';
    });

    wavesurfer.load(AUDIO_FILE);
}