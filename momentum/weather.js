const COORDS='coords';
const API_KEY="e628dec79267499d3a2274ee9bc5deab";//API공부
const weather=document.querySelector(".js-weather");
//requestfh refresh없이 가져올 수 있음
function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    }).then(function(json){
        const temperature=json.main.temp;
        const place=json.name;
        weather.innerText=`${temperature}℃ @ ${place}`;
    });//.tehn()은 정보 불러오고 나서
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordObj={
        latitude,longitude
    };//키와 밸류 똑같이 저장하려면 이렇게 할 수 있음
    saveCoords(coordObj);
    getWeather(latitude,longitude);
}//위도 경도 불러움

function handleGeoError(){
    console.log("cant access geo location")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
    const loadedCoords=localStorage.getItem(COORDS);
    console.log(localStorage.getItem(COORDS));
    if(loadedCoords==null){
        console.log("HELLO?");
        askForCoords();
    }else{
        const parsedCoords=JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

loadCoords();