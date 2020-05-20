var url = "https://fcc-weather-api.glitch.me/api/current?";
var toggle = false;

// lon has issues with neg numbers. convert coordinates?
var getLocation = () => {
  return new Promise(resolve => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = Math.round(position.coords.latitude * 1000) / 1000;
        let lon = Math.round(position.coords.longitude * 1000) / 1000;
        document.getElementById('location').innerHTML = "latitude: " + lat + "<br>longitude: " + lon;
        resolve(url + 'lat=' + lat + '&lon=' + lon);
      });
    } else {
      resolve('no data');
    }
  });
}

var getWeather = async(url) => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}
    
async function App() {
  const location = await getLocation();
  const weather = await getWeather(location);

  var name = weather.name;
  var temp = weather.main.temp;
  var desc = weather.weather[0].description;

  toggle = !toggle;

  if(toggle) {
    temp = Math.round((temp * (9/5)) + 32) + "°F";
  } else {
    temp = temp + "°C";
  }

  var cloudRegex = /.cloud./;
  var rainRegex = /.rain/;
  var clearRegex = /clear/;

  if(cloudRegex.test(desc)) {
    document.getElementById('image').src = "images/cloud.png"
  } else if(rainRegex.test(desc)){
    document.getElementById('image').src = "images/rain.png"
  } else if(clearRegex.test(desc)) {
    document.getElementById('image').src = "images/sun.png"
  }

  document.getElementById('URL').innerHTML = location
  document.getElementById('weather').innerText = name + '\n\n' + temp + '\n\n' + desc
}

App()