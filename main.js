const api = {
    key : "7638c144a312ced0828ccfdeb2684209",
    base:"https://api.openweathermap.org/data/2.5/"
}

const icon = document.querySelector(".icon");
icon.addEventListener("click",setQuery);

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress",setQuery);
function setQuery(evt){
     if(evt.keyCode == 13){
         getResults(searchbox.value);
         console.log(searchbox.value);
     }
}

function getResults(query){
    // fetch(api.openweathermap.org/data/2.5/weather?q={query}&APPID={api.key})
    //fetch('${api.base}weather?q=${query}&APPID=${api.key}')
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+searchbox.value+'&units=metric&appid=7638c144a312ced0828ccfdeb2684209')
    // fetch('https://api.openweathermap.org/data/2.5/weather?q=`${query}&appid=${7638c144a312ced0828ccfdeb2684209}')
    .then(weather => {
            return weather.json();
        }).then(displayResults);
    
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.city');
    city.innerText = `${weather.name},${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector(".date");
    date.innerText = dateBuilder(now);
    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;C</span>`;
    let weather_el = document.querySelector(".weather");
    weather_el.innerText = weather.weather[0].main;
    let hilow = document.querySelector('.hi-low');
    // hilow.innerHTML = `${weather.main.temp_min}<span>&deg;C</span>/${weather.main.temp_max}<span>&deg;C</span>`;
}

function dateBuilder(d){
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Teusday","Wednesday","Thursday","Friday","Sartuday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${date} ${month} ${year}`
}