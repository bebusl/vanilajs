const body=document.querySelector("body");

const IMG_NUMBER=3;

function paintImage(imgNumber){
    const image=new Image();
    image.src=`images/${imgNumber+1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}//이 함수 그냥 모르겠음


function genRandom(){
    const number=Math.floor(Math.random()*IMG_NUMBER);//난수 생성
    return number;
}//js에 Math라는 모듈이 있음 Math.random()랜덤한 수를 가져옴 Math.floor은 소수점 버림
//Meth.ceil()은 올림
function init(){
    const randomNumber=genRandom();
    paintImage(randomNumber);
}

init();