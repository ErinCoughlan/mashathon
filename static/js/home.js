var dancer, prevDancer;

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

    /*
     * Dancer.js magic
     */
    Dancer.setOptions({
        flashSWF : '../../lib/soundmanager2.swf',
        flashJS  : '../../lib/soundmanager2.js'
    });
    dancer = new Dancer();

    // For reading in files
    var fileInput = document.getElementById("fileInput");
    var freader = new FileReader();

    freader.onload = function(e) {
        doTheWave(e.target.result);
        //document.getElementById('player').src = e.target.result;
        //document.getElementById('player').play();
    }

    fileInput.onchange = function(e) {
        var files = e.target.files;
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