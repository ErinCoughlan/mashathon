/**
 * Set the text to the filename and begin upload and analyze.
 */
"use strict";
function upload(e) {
    // Change the text
    var textBox = document.getElementById('longInput');
    var upload = document.getElementById('selector');
    var filename = $('input[type=file]').val().split('\\').pop();
    textBox.value = filename;

    // Upload the audio file
    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
        alert('The File APIs are not fully supported in this browser.');
        return;
    } else {
        var file = input.files[0];
        var fr = new FileReader();
        //fr.readAsText(file);
        fr.readAsDataURL(file);
   }
}