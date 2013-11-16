/**
 * Set the text to the filename and begin upload and analyze.
 */
"use strict";
function upload() {
    var textBox = document.getElementById('longInput');
    var filename = $('input[type=file]').val().split('\\').pop();
    textBox.value = filename;
}