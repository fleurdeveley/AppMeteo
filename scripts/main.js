const keyAPI = '66e8a7dddd1ca3296bd326b63d68e78c';

let resultsAPI;

const weather = document.querySelector('.weather'); 
const temperature = document.querySelector('.temperature');
const localization = document.querySelector('.localization');
const hour = document.querySelectorAll('.hour-name-prevision');
const temperatureForHour = document.querySelectorAll('.hour-prevision-value');
const daysDiv = document.querySelectorAll('.day-prevision-name');
const temperatureDaysDiv = document.querySelectorAll('.day-prevision-temperature');
const iconImage = document.querySelector('.logo-météo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        callAPI(lon, lat);
    }, () => {
        alert(`Vous avez refusé la géolocalisation. L'application ne peut pas fonctionner. 
        Veuillez l'activer.`);
    })
}

function callAPI(lon, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
    exclude=minutely&units=metric&lang=fr&appid=${keyAPI}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        resultsAPI = data;

        weather.innerText = resultsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultsAPI.current.temp)}°`;
        localization.innerText = resultsAPI.timezone;

        // the hours, in increments of 3, with their temperature
        let actualHour = new Date().getHours();

        for(let i = 0; i < hour.length; i++) {
            let hourIncrement = actualHour + i * 3;

            if(hourIncrement > 24) {
                hour[i].innerText = `${hourIncrement - 24} h`;
            } else if(hourIncrement == 24) {
                hour[i].innerText = '00 h';
            }else {
                hour[i].innerText = `${hourIncrement} h`;    
            } 
        }

        // temperature every 3 hours
        for(let j = 0; j < temperatureForHour.length; j++) {
            temperatureForHour[j].innerText = `${Math.trunc(resultsAPI.hourly[j * 3].temp)}°`;
        }

        // first 3 letters of days
        for(let k = 0; k < tableDaysInOrder.length; k++) {
            daysDiv[k].innerText = tableDaysInOrder[k].slice(0, 3);
        }

        // temperature for day
        for(let m = 0; m < 7; m++) {
            temperatureDaysDiv[m].innerText = `${Math.trunc(resultsAPI.daily[m + 1].temp.day)}°`;
        }

        // dynamic icon
        if(actualHour >= 6 && actualHour < 21) {
            iconImage.src = `ressources/day/${resultsAPI.current.weather[0].icon}.svg`;
        } else {
            iconImage.src = `ressources/night/${resultsAPI.current.weather[0].icon}.svg`;
        }

        chargementContainer.classList.add('disparition');
    })
}
