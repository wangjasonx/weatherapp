const api = {
    key: "f600b77c4e6ce35853af4add126b7091",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress', setQuery);
let state = null;

function setQuery(event) {
    if(event.keyCode == 13) {
        let inputValues = searchBox.value.split(",");
        for(let i = 0; i < inputValues.length; i++) {
            inputValues[i] = inputValues[i].trim();
        }

        if(inputValues.length == 2) {
            state = inputValues[1];
        } else {
            state = null;
        }
        getResults(searchBox.value);
        console.log(inputValues);
        console.log(searchBox.value);
    }
}

function getResults(city, state) {
    fetch(`${api.base}weather?q=${city},${state}&units=imperial&APPID=${api.key}`)
      .then(weather => {
          return weather.json();
      }) .then(displayResults);
}


function displayResults(weather) {
    let city = document.querySelector('.location .city');

    console.log(weather);

    if(state === null) {
        state = weather.sys.country;
    }
    city.innerText = `${weather.name}, ${state}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;
    setBackground(Math.round(weather.main.temp));


    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hi_low = document.querySelector('.hi-low');
    hi_low.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
}

function setBackground(temp) {

    if(temp >= 65) {
        document.body.style.backgroundImage = "url('background.jpg')";
    } else {
        document.body.style.backgroundImage = "url('background-2.png')";
    }
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let day = days[d.getDay()- 1];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}