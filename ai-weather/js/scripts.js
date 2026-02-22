/***********************************
 *****INITIALISE********************
 ***********************************/
//This initialises the page once everything is loaded
window.addEventListener('load', init);
var weatherTemp;
var weatherArray = [];
var sunTemp;
var sunArray = [];
var apiKey = '74403c2554582f0499f5acdd116868bc';
var baseURLWeather = 'https://api.openweathermap.org/data/2.5/forecast?';
var baseURLSun = 'https://api.sunrise-sunset.org/json?';
var placeName;
var longitude;
var latitude;
var currentTime;
var sunHeight;
var fakeTime = new Date().getHours();
var completeWeatherArray = [];
var updateNow = 0;
//Page Set Up
function init() {
    resizeEverything();
    
    //Anonymous mousedown event for when the user selects their location
    $('#England').mousedown(function (event) {
        if (document.fullscreenElement) {
            //Gets width and height of the images
            var width = $(window).width();
            var height = 1080 * (width / 1920);
            //Gets mouse location for the mousedown
            var xMouse = event.pageX;
            var yMouse = event.pageY;
            //Uses pre-determined longitude and latitude that I calculated to figure our long lat of map at any size
            longitude = -10.14 + (16.32 * (xMouse / width));
            latitude = 55.89 - (6.09 * (yMouse / height));
            launchLocation();
        }
        openFullscreen();
        resizeEverything();
    });
}

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

//Function needed to begin the weather process
function launchLocation() {
    //Runs functions needed to begin the weather process
    weather24Hours();
    sunsetSunrise();
    presentationData();
    //Changes the screen for the user
    $(function() {
        $('#England').css('visibility', 'hidden');
        $('#Display').css('visibility', 'visible');
    });
    //Starts display section
    fillSign();
    resizeEverything();
    runWeather();
    $('#CloudsImage').mousedown(function(event) {
        location.reload();
    });
}
/***********************************
 *****DISPLAY***********************
 ***********************************/
//Resizes Everything
function resizeEverything() {
    var theFactoringNumber = ($(window).width()) / 1920;
    $('img').attr('width', (1920 * theFactoringNumber));
    $('#Atmosphere').css('bottom', (1080 * theFactoringNumber));
}
//This function fills out the sign
function fillSign() {
    //Gets width and height of the images
    var width = $(window).width();
    var height = 1080 * (width / 1920);
    //Converts Name to Upper Case
    placeName = placeName.toUpperCase();
    //Shrinks name down to fit the sign
    if (placeName.split('').length > 15) {
        var tempName = '';
        for (var i = 0; i < 12; i++) {
            tempName += placeName.split('')[i];
        }
        tempName += '...';
        placeName = tempName;
    }
    //Changes the sign text to shortened name
    $('#SignText').text(placeName);
    //Places the text in the right place on the sign
    $('#SignText').css('left', (100 * (width / 1920)));
    $('#SignText').css('bottom', (170 * (height / 1080)));
}
//Begins the process needed for the weather to play through
function runWeather() {
    var i = 0,
        howManyTimes = 24;

    function f() {
        if (fakeTime > 23) {
            fakeTime = 0;
        }
        //This changes all the images that display the weather
        $('#CloudsImage').attr('src', 'css/images/' + completeWeatherArray[fakeTime].weather.toLowerCase() + '.png');
        $('#WeatherImage').attr('src', 'css/images/' + completeWeatherArray[fakeTime].weather.toLowerCase() + '.gif');
        $('#SignEffectsImage').attr('src', 'css/images/sign' + completeWeatherArray[fakeTime].weather.toLowerCase() + '.gif');
        //This is an equation to show dawn dusk day and night
        if (sunArray[0].split(':')[0] == fakeTime || sunArray[1].split(':')[0] == fakeTime) {
            $('#SkyImage').attr('src', 'css/images/skydawndusk.png');
            $('#AtmosImage').attr('src', 'css/images/skyatmospheredawndusk.png');
        } else if (sunArray[0].split(':')[0] > fakeTime && sunArray[1].split(':')[0] < fakeTime) {
            $('#SkyImage').attr('src', 'css/images/sky.png');
            $('#AtmosImage').attr('src', 'css/images/skyatmosphere.png');
        } else if (sunArray[0].split(':')[0] < fakeTime || sunArray[1].split(':')[0] > fakeTime) {
            $('#SkyImage').attr('src', 'css/images/skynight.png');
            $('#AtmosImage').attr('src', 'css/images/skyatmospherenight.png');
        }
        //functions needed for sun height during the day
        var width = $(window).width();
        var height = 1080 * (width / 1920);
        if (sunArray[0].split(':')[0] >= fakeTime && fakeTime >= (sunArray[0].split(':')[0] - (sunHeight / 2))) {
            var workingOut = fakeTime - (sunArray[1].split(':')[0]);
            $('#Sun').css('left', (((workingOut / sunHeight) * (1920)) * (width / 1920)));
            workingOut = (sunArray[0].split(':')[0]) - fakeTime;
            $('#Sun').css('bottom', (((workingOut / (sunHeight / 2)) * (1080)) * (height / 1080)));
        }
        if (sunArray[1].split(':')[0] < fakeTime && fakeTime < (sunArray[0].split(':')[0] - (sunHeight / 2))) {
            var workingOut = fakeTime - (sunArray[1].split(':')[0]);
            $('#Sun').css('left', (((workingOut / sunHeight) * (1920)) * (width / 1920)));
            $('#Sun').css('bottom', (((workingOut / (sunHeight / 2)) * (1080)) * (height / 1080)));
        }
        fakeTime += 1;
        i++;
        updateNow++;
        //waits two seconds between each update
        if (i < howManyTimes) {
            setTimeout(f, 2000);
        }
        if (updateNow === 900) {
            updateNow = 0;
            redoWeather();
            return;
        }
        // after running 24 times this process is run to loop the day
        if (i === howManyTimes) {
            loop();
        }
    }
    f();
}
// this loops the weather function
function loop() {
    runWeather();
}
//When the weather is updated
function redoWeather() {
    fakeTime = new Date().getHours();
    launchLocation();
}
/***********************************
 *****MATHS*************************
 ***********************************/
//Gets the current time in the correct format.
function getCurrentTime() {
    var currentDate = new Date();
    var year = '' + currentDate.getFullYear();
    var month = '' + (currentDate.getMonth() + 1);
    if (month.length === 1) {
        month = '0' + month;
    }
    var date = '' + currentDate.getDate();
    if (date.length === 1) {
        date = '0' + date;
    }
    var hour = '' + currentDate.getHours();
    if (hour.length === 1) {
        hour = '0' + hour;
    }
    var min = '' + currentDate.getMinutes();
    if (min.length === 1) {
        min = '0' + min;
    }
    var secs = '' + currentDate.getSeconds();
    if (secs.length === 1) {
        secs = '0' + secs;
    }
    currentTime = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + secs;
    return currentTime;
}
//gets the relevant Sunset and Sunrise for the next 24 hours and formats them
function sunsetSunrise() {
    //Day 1 Times
    getSunData(weatherTemp.list[0].dt_txt.split(' ')[0]);
    sunArray[0] = sunTemp.results.sunrise;
    sunArray[1] = sunTemp.results.sunset;
    //Day 2 Times
    getSunData(weatherTemp.list[8].dt_txt.split(' ')[0]);
    sunArray[2] = sunTemp.results.sunrise;
	for (var i = 0; i < sunArray.length; i++) {
        if (sunArray[i].split(' ')[1] === 'PM') {
            sunArray[i] = ('' + (Number(sunArray[i].split(':')[0]) + 12) + ':' + sunArray[i].split(':')[1] + ':' + sunArray[i].split(':')[2]).split(' ')[0];
        } else {
            if (sunArray[i].split(':')[0].length === 1) {
                sunArray[i] = (('0' + sunArray[i].split(':')[0]) + ':' + sunArray[i].split(':')[1] + ':' + sunArray[i].split(':')[2]).split(' ')[0];
            }
            sunArray[i] = sunArray[i].split(' ')[0];
        }
    }
    if (sunArray[0] < sunArray[1]) {
        sunArray.reverse();
    }
}
//picks which sunset and rise to show
function presentationData() {
    // After sunsetSunrise() reverses the array it is: [tomorrow_sunrise, today_sunset, today_sunrise]
    // The day/night logic in runWeather needs [today_sunset, tomorrow_sunrise] (larger hour first)
    // so that the "between sunrise and sunset = day" check works at any time of day
    sunArray = [sunArray[1], sunArray[0]];
    sunHeight = Number(sunArray[0].split(':')[0]) - Number(sunArray[1].split(':')[0]);
    for (var i = 0; i < weatherArray.length; i++) {
        completeWeatherArray[new Date(weatherArray[i].timeCode * 1000).getHours()] = weatherArray[i];
    }
    // Find the first defined entry to use as fallback for hours before the forecast starts
    var firstDefined = null;
    for (var i = 0; i < 24; i++) {
        if (completeWeatherArray[i]) {
            firstDefined = completeWeatherArray[i];
            break;
        }
    }
    // Forward fill gaps; use firstDefined as fallback for any leading undefineds
    for (var i = 0; i < 24; i++) {
        if (!completeWeatherArray[i]) {
            completeWeatherArray[i] = (i > 0 && completeWeatherArray[i - 1]) ? completeWeatherArray[i - 1] : firstDefined;
        }
    }
}
//Weather for next 24 hours
function weather24Hours() {
    getWeatherData();
    placeName = weatherTemp.city.name;
    for (var i = 0; i < 9; i++) {
        //Time Code
        var timeCode = (weatherTemp.list[i].dt);
        //Temperature
        var temperature = weatherTemp.list[i].main.temp;
        //Weather
        var weather = weatherTemp.list[i].weather[0].main;
        //Wind Speed
        var windSpeed = weatherTemp.list[i].wind.speed;
        //Add all to Weather Array
        weatherArray[i] = {
            timeCode,
            temperature,
            weather,
            windSpeed
        };
    }
}
/***********************************
 *****DATA COLLECTION***************
 ***********************************/
//URL Builder for OpenWeatherMaps API
function urlBuilderWeather() {
    return '' + baseURLWeather + 'lat=' + latitude + '&lon=' + longitude + '&units=metric&mode=json&appid=' + apiKey;
}
//Get Weather Data from OpenWeatherMaps
function getWeatherData() {
    var myUrl = urlBuilderWeather();
    $.ajax({
        url: myUrl,
        dataType: 'json',
        async: false,
        success: function(data) {
            weatherTemp = data;
        }
    });
}
//URL Builder for Sunset and Sunrise API
function urlBuilderSun(date) {
    return '' + baseURLSun + 'lat=' + latitude + '&lng=' + longitude + '&date=' + date;
}
//Get Sunrise and Sunset from SunsetSunrise
function getSunData(date) {
    var myUrl = urlBuilderSun(date);
    $.ajax({
        url: myUrl,
        dataType: 'json',
        async: false,
        success: function(data) {
            sunTemp = data;
        }
    });
}