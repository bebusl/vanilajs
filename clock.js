const clockContainer=document.querySelector(".js-clock"),
    clockTitle=clockContainer.querySelector("h1");


function getTime(){
    const date=new Date();
    const minutes=date.getMinutes();
    const hours=date.getHours();
    const seconds=date.getSeconds();

    clockTitle.innerText=`${hours < 10 ? `0${hours}` : hours}:${minutes<10?`0${minutes}`:minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init(){
    getTime();
    setInterval(getTime,1000);//단위 뭔지 까먹
    //milisecond기준. getTime함수를 1000ms단위로 실행시킴. 그래서 시간을 갱신시켜주는 것
}

init();