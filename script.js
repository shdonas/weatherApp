var btnSearch = document.getElementById("btnSearch");

if (btnSearch) {
    btnSearch.addEventListener('click', function () {
        var cityName = document.getElementById('userInput').value;
        document.getElementById("save0").innerHTML = cityName;
        console.log(cityName);
        loadData(cityName);
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

            $('.location').append(location);
            $('.icon').attr('src', icon);
            $('.weather').append(weather);
            $(".temp").append(temp);
            $('.feelsLike').append(feelsLike);
        })

    $.getJSON(API_forecast,
        function (data) {
            console.log(data);

            var date = data.list[0].dt_txt;
            var formatDate = new Date(date);

            // var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            var weather = data.list[0].weather.main;
            var temp = data.list[0].main.temp + "F";
            var feelsLike = "Feels Like: " + data.list[0].main.feels_like;

            $('.date1').append(formatDate.getDay());
            // $('.icon').attr('src', icon);
            $('.weather').append(weather);
            $(".temp").append(temp);
            $('.feelsLike').append(feelsLike);

        })
}