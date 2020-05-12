var url = "https://fcc-weather-api.glitch.me/api/current?";
var urlTest = "https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139";
var newURL;

var getLocation = new Promise((resolve) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;
      document.getElementById('location').innerHTML = "latitude: " + lat + "<br>longitude: " + lon;
      newURL = url + 'lat=' + lat + '&lon=' + lon;
    });
  }

  resolve();
})

// newURL is undefined but urlTest works
var getWeather = 
  fetch(/*urlTest/ newURL*/)
    .then(res => res.json())
    .then(data => JSON.stringify(data))
    
async function App() {
  const location = await getLocation;
  const weather = await getWeather;
  document.getElementById('test').innerHTML = newURL
  document.getElementById('weather').innerHTML = weather
}

App()