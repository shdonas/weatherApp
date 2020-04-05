var btnSearch = document.getElementById("btnSearch");

if (btnSearch) {
    btnSearch.addEventListener('click', function () {

        var cityName = document.getElementById('userInput').value;
        // document.getElementById("save").innerHTML = cityName;
        console.log(cityName);

        loadData(cityName);
        store(cityName);
        console.log(items);

        // displayStorage();
        displaySearch(cityName);


        document.getElementById("userInput").value = "";
    });
}


function loadData(city) {

    var API_currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=f4cc075ea301646a421c78dc383a795a";
    var API_forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=f4cc075ea301646a421c78dc383a795a"

    $.getJSON(API_currentWeather,
        function (data) {
            console.log(data);

            var location = data.name;
            var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            var weather = data.weather[0].main;
            var temp = data.main.temp + "F";
            var feelsLike = "Feels Like: " + data.main.feels_like;
            var hum = "humidity: " + data.main.humidity;

            $('.location0').html(location);
            $('.icon0').attr('src', icon);
            $('.weather0').html(weather);
            $(".temp0").html("Temperature: " + temp);
            $('.feelsLike0').html(feelsLike);
            $('.humidity').html(hum);
        })

    $.getJSON(API_forecast,
        function (data) {
            console.log(data);
            var value = 2;

            for (i = 1; i <= 5; i++) {

                var date1 = data.list[value].dt_txt;
                var formatDate1 = new Date(date1);

                var icon1 = "http://openweathermap.org/img/w/" + data.list[value].weather[0].icon + ".png";
                var weather1 = data.list[value].weather[0].main;
                var temp1 = data.list[value].main.temp + "F";
                var feelsLike1 = "Feels Like: " + data.list[value].main.feels_like;

                $('.date' + i).html(formatDate1.toLocaleDateString());
                $('.icon' + i).attr('src', icon1);
                $('.weather' + i).html(weather1);
                $(".temp" + i).html(temp1);
                $('.feelsLike' + i).html(feelsLike1);

                value += 8;

            }

        })

}


var items = [];
var saveSearch = document.getElementById("saveSearch");

function store(cityName) {
    items.push(cityName);
    localStorage.setItem("item", items);
}

function displayStorage() {
    for (var i = 0; i < items.length; i++) {

        var newSearch = document.createElement("p");
        newSearch.textContent = items[i];
        saveSearch.appendChild(newSearch);
    }
}

function displaySearch(cityName) {
    var newSearch = document.createElement("p");
    newSearch.textContent = cityName;
    newSearch.onclick = function(){
        loadData(cityName);
    }
    saveSearch.appendChild(newSearch);
    
}