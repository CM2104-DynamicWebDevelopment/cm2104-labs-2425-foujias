/**
 * @Author: John Isaacs <john>
 * @Date:   14-Feb-192019
 * @Filename: timer.js
 * @Last modified by:   john
 * @Last modified time: 14-Feb-192019
 */

setCountdown(15, Boom);
setCountdown(10, Bam);
setCountdown(15, BigBadaBoom);


// function setCountdown(delay){
   //sets an timeout delay to display a message after the set delay
  // setTimeout(function() {
    // console.log("boom")
  // }, delay*1000);


   function setCountdown (delay, callback){
   //sets an timeout delay to display a message after the set delay
   setTimeout (function() {
     console.log("boom")
     callback();
   }, delay*1000);

     function Boom() {
    document.getElementById('alarm').innerHTML= <img id='alarmimage' src='alarm.jpg' />;
   }

     function Bam(){
    document.getElementById('bam').innerHTML= <img id='finish' src='bam.jpg' />;
   }

     function BigBadaBoom(){
    document.getElementById('BigBada').innerHTML= <img id='finishimage' src='BigBadaBoom.jpg' />;

   }

   //reduces the seconds left by 1
   var secondsleft = delay -1;
   //sets up an interval to fire every second
   var counter = setInterval(function() {

     //display the current seconds left
     //console.log (secondsleft--);
     document.getElementById('countdown').innerHTML= secondsleft--;

     //if we are at 0 stop the countdown
     if(secondsleft <=0){clearInterval(counter)} 
   }, 1000);
   

   // count douwn finish done by myself
   //var finishImage= Math.floor(Math.random()*101);
  // document.getElementById('finish').src = secondsleft--;
   
 }
