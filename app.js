var url = "https://fcc-weather-api.glitch.me/api/current?";
var urlTest = "https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139";
var newURL;

var getLocation = new Promise((resolve) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;
      document.getElementById('location').innerHTML = "latitude: " + lat + "<br>longitude: " + lon;
    });
  }

  resolve();
  return { lon, lat };
})
newURL = url + 'lat=' + getLocation.lat + '&lon=' + getLocation.lon;

// newURL is undefined but urlTest works
var getWeather = 
  fetch(urlTest)
    .then(res => res.json())
    .then(data => JSON.stringify(data))
    
async function App() {
  await getLocation;
  const weather = await getWeather;
  document.getElementById('test').innerHTML = newURL
  document.getElementById('weather').innerHTML = weather
}

App()