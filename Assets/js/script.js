const apiKey = "22aad5d451c2ec776e183d07258de906";
// fetch uvindex by storing lat and long from first fetch(data.coord.lon/lat)
function fetchWeather(city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q="
    + city
    + "&units=imperial&appid="
    + apiKey
  )
    .then((res) => res.json())
    .then((data) => displayWeather(data))
    .then((data) => cityForecasts(city));
}

function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  const { lat, lon } = data.coord;
  console.log(name, icon, description, temp, humidity, speed);
  console.log(lat, lon);


  $('#weather-card').html(
    `
      <div class="date">City:   ${name}  </div>
      <div class="temp">Temp: ${temp} F</div>
      <div class="wind">Wind: ${speed} mph</div>
      <div class="humidity">Humidity: ${humidity}%</div>
    `
  );

  fetchUV(lat, lon);
}

function fetchUV(lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat="
    + lat
    + "&lon="
    + lon
    + "&appid="
    + apiKey
  )
    .then((res) => res.json())
    .then((res) => { 
      $('#weather-card').append(`<div class="uv">UV Index: ${res.current.uvi}</div>`);
    });
}

function cityForecasts(city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q="
    + city
    + "&units=imperial&appid="
    + apiKey
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      var array = [];
      for (var i = 0; i <= 32; i += 8) {
        // console.log(data.list[i]);
        array.push(data.list[i]);
      };
      // console.log(array);

      var forecastDays = [];
      for (var i = 0; i < 5; i++) {
        forecastDays.push(array[i].dt_txt);
        forecastDays[i] = forecastDays[i].slice(0, 10);
      }

      // console.log(forecastDays);

      $('#upcoming-forecasts').html(`<h4>5-Day Forecast:</h4>`).append(
        `
            <div class="row">
            <div class="col-md-2">
            <div class="card border-primary">
            <div class="text-white day card-header">${forecastDays[0]}</div>
            <div class="text-white temp">Temp: ${array[0].main.temp}</div>
            <div><img src="http://openweathermap.org/img/w/${array[0].weather[0].icon}.png"></div>
            <div class="text-white wind">Wind: ${array[0].wind.speed}mph</div>
            <div class="text-white humidity">Humidity: ${array[0].main.humidity}%</div>
            </div>
            </div>
            
            <div class="col-md-2">
            <div class="card border-primary bg-red">
            <div class="text-white day card-header">${forecastDays[1]}</div>
            <div class="text-white temp">Temp: ${array[1].main.temp}</div>
            <div><img src="http://openweathermap.org/img/w/${array[1].weather[0].icon}.png"></div>
            <div class="text-white wind">Wind: ${array[1].wind.speed}mph</div>
            <div class="text-white humidity">Humidity: ${array[1].main.humidity}%</div>
            </div>
            </div>
            
            <div class="col-md-2">
            <div class="card border-primary">
            <div class="text-white day card-header">${forecastDays[2]}</div>
            <div class="text-white temp">Temp: ${array[2].main.temp}</div>
            <div><img src="http://openweathermap.org/img/w/${array[2].weather[0].icon}.png"></div>
            <div class="text-white wind">Wind: ${array[2].wind.speed}mph</div>
            <div class="text-white humidity">Humidity: ${array[2].main.humidity}%</div>
            </div>
            </div>
            
            <div class="col-md-2">
            <div class="card border-primary">
            <div class="text-white day card-header">${forecastDays[3]}</div>
            <div class="text-white temp">Temp: ${array[3].main.temp}</div>
            <div><img src="http://openweathermap.org/img/w/${array[3].weather[0].icon}.png"></div>
            <div class="text-white wind">Wind: ${array[3].wind.speed}mph</div>
            <div class="text-white humidity">Humidity: ${array[3].main.humidity}%</div>
            </div>
            </div>
            
            <div class="col-md-2">
            <div class="card border-primary">
            <div class="text-white day card-header">${forecastDays[4]}</div>
            <div class="text-white temp">Temp: ${array[4].main.temp}</div>
            <div><img src="http://openweathermap.org/img/w/${array[4].weather[0].icon}.png"></div>
            <div class="text-white wind">Wind: ${array[4].wind.speed}mph</div>
            <div class="text-white humidity">Humidity: ${array[4].main.humidity}%</div>
            </div>
            </div>
            </div>
            `
      );
    })
}

function citySearch() {
  // event.preventDefault();
  var searchTerm = $('#search-input').val();
  $('#search-input').val("");
  fetchWeather(searchTerm);
  console.log(searchTerm);
}

$('#search-btn').on("click", function addToLocal(event) {
  event.preventDefault();
  let cityEntered = $(this).siblings().val();
  localStorage.setItem("cities", cityEntered);

  citySearch()
});

