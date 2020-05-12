var url = "https://fcc-weather-api.glitch.me/api/current?";
var urlTest = "https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139";
var lon;
var lat;

async function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      document.getElementById('location').innerHTML = "latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude;
      lon = position.coords.longitude;
      lat = position.coords.latitude;
    });
  }
}

async function getWeather() {
  return fetch(url + 'lat=' + lat + '&lon=' + lon)
    .then(res => res.json())
    .then(data => document.getElementById('weather').innerHTML = data.name)
}

// await is not working
async function App() {
  
  await Promise.all([
    (async()=>await getLocation())(),
    (async()=>await getWeather())()
  ])
}

App()