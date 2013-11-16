/**
 * Set the text to the filename and begin upload and analyze.
 */
"use strict";
function upload() {
    // Change the text
    var input = document.getElementById('fileInput');
    var filename = $('input[type=file]').val().split('\\').pop();

    // Send the audio file to the server
    chooseSong(filename);
};


function previewSong(songSrc) {
    var elem = document.getElementById('preview');
    elem.innerHTML = '<audio src="' + songSrc + '" controls="controls">';
};


function chooseSong(songName) {
    var dataObject = { 'filename': songName};

    var textBox = document.getElementById('longInput');
    textBox.value = songName;

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

    var fileInput = document.getElementById("fileInput");
    var freader = new FileReader();

    freader.onload = function(e) {
        document.getElementById('player').src = e.target.result;
        //document.getElementById('player').play();
    }

    fileInput.onchange = function(e) {
        var files = e.target.files;
        freader.readAsDataURL(files[0]);

        upload();
    }
});
