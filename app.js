var url = "https://fcc-weather-api.glitch.me/api/current?";

var getLocation = () => {
  return new Promise(resolve => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        document.getElementById('location').innerHTML = "latitude: " + lat + "<br>longitude: " + lon;
        resolve(url + 'lat=' + lat + '&lon=' + lon);
      });
    } else {
      resolve();
    }
  });
}

// newURL is undefined but urlTest works
var getWeather = async(url) => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}
    
async function App() {
  const location = await getLocation();
  const weather = await getWeather(location);

  var weatherData = [
    weather.name, weather.main.temp, weather.weather[0].description
  ]

  weatherData[1] = weatherData[1] + "&degC"
  document.getElementById('URL').innerHTML = location
  document.getElementById('weather').innerHTML = weatherData.join(', ')
}

App()