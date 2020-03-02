const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput=toDoForm.querySelector("input"),
    toDoList=document.querySelector(".js-toDoList");

const TODOS_LS="toDos";//LS뜻이 먼지 모르겠음

let toDos=[];//todo많으니까 배열에 넣어야 돼서 빈 배열 생성

function filterFn(toDo){
    return toDo.id===1;
}

function deleteToDo(event){
    const btn=event.target;//어떤 btn이 눌렸는지 찾음
    const li=btn.parentNode;//btn이 들어있는 부모element를 불러옴(여기선 각각의 id가 다른 li가 되겠네)
    toDoList.removeChild(li);

    const cleanToDos=toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);//li.id가 string임
    });//filter function 공부, 지금 지운 li의 id를 가진 요소는 localstorage에서 삭제해야하므로 그거 빼고 걸러낸 array다시 여기에 저장

    toDos=cleanToDos;//todo를 걸러낸애로 바꾸고
    saveToDos();//바꾼애를 다시 저장
}

function paintToDO(text){
    const li = document.createElement("li");//createElement는 빈 HTML요소 만들어 주는 것
    const delBtn=document.createElement("button");
    delBtn.innerText="🙅‍♀️";
    delBtn.addEventListener("click",deleteToDo);
    const span=document.createElement("span");
    const newId=toDos.length+1;
    span.innerText=text;
    li.appendChild(delBtn);
    li.appendChild(span);//li안에 넣어주는겨! 여기서 필요한 요소에 내용까지 다 넣은다음에
    li.id=newId;
    toDoList.appendChild(li);//원하는 곳의 child로 넣어주면 완성!
    const toDoObj={
        text : text,//text는 매개변수. 그니까 받아온거!
        id : newId
    };
    toDos.push(toDoObj);//array에 넣음
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));//배열을 너어용
    //localStorage에서 value값으로는 모두 string으로 저장하려고 하기 때문에 JSON.stringify()로 스트링으로 변환시켜 주어야한다.
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=toDoInput.value;
    paintToDO(currentValue);
    toDoInput.value="";//초기화, 다시 입력할 수 있도록
}

function loadToDos(){
    const loadedToDos=localStorage.getItem(TODOS_LS);
    if(loadedToDos!==null){
        const parsedToDos=JSON.parse(loadedToDos);//불러온 거 해야징
        parsedToDos.forEach(function(toDo){//가져온 todo 어레이에 저장되어 있는 것에 이 함수를 하나하나 순서대로 적용함
            paintToDO(toDo.text);//todo는 객체니까 그 안의 text에 접근
        })// rkrrkrdml 
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();