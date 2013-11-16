/**
 * Created by nicholas on 11/15/13.
 */

// Load the application once the DOM is ready, using `jQuery.ready`:
function test() {
  console.log('here');
  // To enable flash fallback, specify the paths for the flashSWF and flashJS
  Dancer.setOptions({
    flashJS  : '../../lib/soundmanager2.js',
    flashSWF : '../../lib/soundmanager2.swf'
  });

  var audio  = new Audio();//document.getElementsByTagName('audio')[0],
    audio.src = "../static/test.mp3";
  var
    dancer = new Dancer(),
    kick = dancer.createKick({
      onKick: function ( mag ) {
        console.log('Kick!');
      },
      offKick: function ( mag ) {
        console.log('no kick :(');
      }
    });

  // Let's turn this kick on right away
  kick.on();

  dancer.onceAt( 10, function() {
    // Let's set up some things once at 10 seconds
  }).between( 10, 60, function() {
    // After 10s, let's do something on every frame for the first minute
  }).after( 60, function() {
    // After 60s, let's get this real and map a frequency to an object's y position
    // Note that the instance of dancer is bound to "this"
    object.y = this.getFrequency( 400 );
  }).onceAt( 120, function() {
    // After 120s, we'll turn the kick off as another object's y position is still being mapped from the previous "after" method
    kick.off();
  }).load( audio ); // And finally, lets pass in our Audio element to load

  dancer.play();

  waver(dancer);

  return dancer;

}

function waver(dancer) {


var data = [];

var waveform = new Waveform({
  container: document.getElementById("visual"),
  interpolate: false,
  height: 100
});
var ctx = waveform.context;

var gradient = ctx.createLinearGradient(0, 0, 0, waveform.height);
gradient.addColorStop(0.0, "#f60");
gradient.addColorStop(1.0, "#ff1b00");
waveform.innerColor = gradient;

var i=0;
setInterval(function(){
  data.push(Math.cos(i++/25) - 0.2 + Math.random()*0.3);//dancer.getWaveform());
  waveform.update({
    data: data
  });
}, 50);

}
