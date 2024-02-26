const apiKey = "d5752951419e4f68a7b211843242302 ";
const apiUrl = "https://api.weatherapi.com/v1/current.json?&aqi=yes&q=";
const weatherIcon = document.querySelector(".weather-icon");

document.querySelector(".search input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        performSearch();
    }
});

function performSearch() {
    var query = document.querySelector(".search input").value;
    console.log("Searching for: " + query);
    checkWeather(query);
}

async function checkWeather(city) {

    const response = await fetch(apiUrl + city + `&key=${apiKey}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();


    console.log(data);

    if (data) {
        document.querySelector(".city").innerHTML = data.location.name;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°c";
        document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
        document.querySelector(".wind").innerHTML = data.current.wind_kph + "kph";
    } else {
        console.error("No weather data found.");
    }
    
    weatherIcon.src = data.current.condition.icon;
}
