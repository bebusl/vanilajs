const form = document.querySelector(".js-form"),/*이름 받는 form 가져옴*/
    input=form.querySelector("input"),/*이름 입력받은 거 content 가져옴 */
    greeting=document.querySelector(".js-greetings");/*greeting 출력할 부분 가져옴 */

const USER_LS="currentUser",
    SHOWING_CN="showing";

function saveName(text){
    localStorage.setItem(USER_LS,text);/* 웹SQL에 이름 저장시켜놓음 */
}

function handleSubmit(event){
    event.preventDefault();//이벤트를 취소할 수 있는 경우, 이벤트의 전파를 막지않고 그 이벤트를 취소합니다. 이 경우에는 제출하면 자동 새로고침되므로 새로고침 안되게 하는 거임.
    const currentValue=input.value;/*input에 들어온 값 확인 */
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);/*입력받을 부분에 showingclass 추가, 즉 class추가해서 display:block; 안보이던거 보이게함! */
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);/*다시안보이게 */
    greeting.classList.add(SHOWING_CN);
    greeting.innerText=`Hello ${text}`;
}

function loadName(){
    const currentUser= localStorage.getItem(USER_LS);
    if(currentUser==null){
        askForName();//저장 된 이름 없으면 이름 물어봄
    }else{
        paintGreeting(currentUser);//저장된 이름 있으면 환영문 출력
    }
}

function init(){
    loadName();
}

init();