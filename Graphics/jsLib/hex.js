/**
 * Created by sam0hack on 6/5/16.
 */


(function() {
    'use strict';

    function displayHexClock() {
        var clock = new Date(),
            h = clock.getHours(),
            m = clock.getMinutes(),
            s = clock.getSeconds();

        if(h <= 9) h = '0' + h;
        if(m <= 9) m = '0' + m;
        if(s <= 9) s = '0' + s;

        var time = h + ':' + m + ':' + s;


        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        var month = month[clock.getMonth()];


        var weekday = new Array(7);
        weekday[0]=  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var weekday = weekday[clock.getDay()];

        var year = clock.getFullYear();

        
        document.getElementById('time').innerHTML = time;
        document.getElementById('hc').innerHTML = weekday +' / ' + month +' / '+ year;
    }
    displayHexClock();
    setInterval(displayHexClock, 1000);
}());