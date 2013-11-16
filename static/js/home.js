/**
 * Set the text to the filename and begin upload and analyze.
 */
"use strict";
function upload(e) {
    // Change the text
    var textBox = document.getElementById('longInput');
    var input = document.getElementById('fileInput');
    var filename = $('input[type=file]').val().split('\\').pop();
    textBox.value = filename;

    // Upload the audio file
};

function previewSong(songSrc) {
    return '<audio src="' + songSrc + '" controls="controls">';
};


/** Submit handler through jquery */
$(document).ready(function() {
    //previewSong("song");

    var fileInput = document.getElementById("fileInput");
    var freader = new FileReader();

    freader.onload = function(e) {
        document.getElementById('player').src = e.target.result;
        document.getElementById('player').play();
    }

    fileInput.onchange = function(e) {
        var files = e.target.files;
        freader.readAsDataURL(files[0]);

        upload();
    }
});