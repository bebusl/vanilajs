const canvas = document.getElementById("jsCanvas");
const ctx=canvas.getContext("2d");
const colors= document.getElementsByClassName("controls_color");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const save=document.getElementById("jsSave");
canvas.width=700;
canvas.height=700;

let painting=false;
let filling=false;
const INITIAL_COLOR="#000000";
//canvas의 context는 픽셀에 접근 가능!
ctx.fillStyle="#ffffff";
ctx.fillRect(0,0,700,700);//배경색 칠해놓기

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth=2.5;


function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function onMouseLeave(event){
    stopPainting();
}

function handleRangeChange(event){
    const size=event.target.value;
    ctx.lineWidth=size;
}

function handleModeClick(){
    if(filling===true){
        filling=false;
        mode.innerText="Fill";
    }else{
        filling=true;
        mode.innerText="Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,700,700);}
}

function handleSaveClick(){
    const imageURL=canvas.toDataURL();
    const link=document.createElement("a");
    link.href=imageURL;
    link.download="hello";
    link.click();
}


Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(save){
    save.addEventListener("click",handleSaveClick);
}


if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",onMouseLeave);
    canvas.addEventListener("click",handleCanvasClick);
}
