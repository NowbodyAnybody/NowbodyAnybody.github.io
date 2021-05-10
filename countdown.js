let timeCount = document.getElementById("timeCountdown");
let date = new Date();

let maturaDate = new Date("June 07, 2021 00:00:00")



updateTimes();

function updateTimes(){
    date = new Date();
    let timeDifference = maturaDate-date;
    timeCount.innerHTML = secondToString(timeDifference/1000);

    setTimeout(()=>{updateTimes()}, 50);
}





function secondToString(inSec){
    let days = Math.floor(inSec / (60*60*24)).toString();
    let hours = Math.floor(inSec % (60*60*24) / (60*60)).toString();
    let minutes = Math.floor(inSec % (60*60) /60).toString();
    let seconds = Math.floor(inSec % (60)).toString();

    if (days.length < 2){
        days = "0"+ days;
    }

    if (hours.length < 2){
        hours = "0"+ hours;
    }

    if (minutes.length < 2){
        minutes = "0"+ minutes;
    }

    if (seconds.length < 2){
        seconds = "0"+ seconds;
    }
    return days + ":" +hours + ":" + minutes + ":" +seconds;
}