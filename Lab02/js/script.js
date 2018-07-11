var temp = [];
var aLength;

function autocomplete() {

 var options = {
  types: ['(cities)']
 };

 var input = document.getElementById('userCity');
 var autocomplete = new google.maps.places.Autocomplete(input, options);
}

google.maps.event.addDomListener(window, 'load', autocomplete);

function switchUnits() {
    if (document.getElementById("c").checked) {
      
      for(i=0; i<=4; i++){
        document.getElementById("temp" + i).innerHTML = Math.round(temp[i]) + "<i class='wi wi-celsius'></i>";
      };
      var counter = 0;
      for(i=6; i<=aLength; i+=8){
        counter++;
        document.getElementById("dayTe" + counter).innerHTML = Math.round(temp[i]) + "<i class='wi wi-celsius'></i>";
      };

    }else {

      for(i=0; i<=4; i++){
        var maxConv = temp[i] * 9/5 + 32;
        document.getElementById("temp" + i).innerHTML = Math.round(maxConv) + "<i class='wi wi-fahrenheit'></i>";
      };

      var counter = 0;
      for(i=5; i<=aLength; i+=8){
        counter++;
        var maxConv = temp[i] * 9/5 + 32;
        document.getElementById("dayTe" + counter).innerHTML = Math.round(maxConv) + "<i class='wi wi-fahrenheit'></i>";
      };
    }
}

function getLocationAndWeather(){
  if (window.XMLHttpRequest){
    var xhr = new XMLHttpRequest();
    var c = document.getElementById("userCity").value;

    xhr.addEventListener("load", function() {
    var response = JSON.parse(xhr.responseText);
    console.log(response);

    var country = response.sys.country;
    var city = response.name;
    document.getElementById("city").innerHTML = city + ", " + country;

    var arrayLength = response.list.length;
    aLength = arrayLength;
    // Hours
    for (i=0; i<=4; i++) {
      
      var date_time = response.list[i].dt;
      var date = new Date(date_time*1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var hours = date.getUTCHours();
      var minutes = "0" + date.getUTCMinutes();
      document.getElementById("time"+i).innerHTML = months[date.getUTCMonth()] + " " + date.getUTCDate() + " - " + hours + ":" + minutes + "UTC"; 

      var icon = response.list[i].weather[0].id;
      document.getElementById("icon"+i).innerHTML = "<i class='wi wi-owm-" + icon + "'></i>";
      
      var temperature = response.list[i].main.temp;
      document.getElementById("temp"+i).innerHTML = Math.round(temperature) + "<i class='wi wi-celsius'></i>";
      temp[i] = temperature;

      // Only for Current Weather
      var weatherDescription = response.list[0].weather[0].description;
      document.getElementById("weather0").innerHTML = weatherDescription;

      var humidity = response.list[0].main.humidity;
      document.getElementById("humd0").innerHTML = "<i class='wi wi-humidity'></i> " + humidity + "%";

      var wind = Math.round((response.list[0].wind.speed * 3.6) * 100) / 100;
      document.getElementById("wind0").innerHTML = "<i class='wi wi-windy'></i> " + wind + "km/H";
    };

    // Days
    var count = 0;
    for (i=5; i<=arrayLength; i+=8) {

      count++;

      var timeP = document.createElement("p");
      var date_time = response.list[i].dt;
      var date = new Date(date_time*1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      document.getElementById("dayT"+count).innerHTML = months[date.getUTCMonth()] + " " + date.getUTCDate(); 

      var icon = response.list[i].weather[0].id;
      document.getElementById("dayI"+count).innerHTML = "<i class='wi wi-owm-" + icon + "'></i>";
      
      var temperature = response.list[i].main.temp;
      document.getElementById("dayTe"+count).innerHTML = Math.round(temperature) + "<i class='wi wi-celsius'></i>";
      temp[i] = temperature;

      var weatherDescription = response.list[i].weather[0].description;
      document.getElementById("dayW"+count).innerHTML = weatherDescription;

      var humidity = response.list[i].main.humidity;
      document.getElementById("dayH"+count).innerHTML = "<i class='wi wi-humidity'></i> " + humidity + "%";

      var wind = Math.round((response.list[i].wind.speed * 3.6) * 100) / 100;
      document.getElementById("dayWi"+count).innerHTML = "<i class='wi wi-windy'></i> " + wind + "km/h";
    };



    }, false);

    xhr.addEventListener("error", function(err){
      alert("Could not complete the request");
    }, false);

    xhr.open("GET", "//api.openweathermap.org/data/2.5/weather?q=" + c + "&APPID=98164dba4d0275cee356499f521ea54c&units=metric", true);
    xhr.send();
  }
  else{
    alert("Unable to fetch the location and weather data.");
  }           
}
