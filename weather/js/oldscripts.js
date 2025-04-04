//This initialises the page once everything is loaded
window.addEventListener("load", init);
var weatherTemp;
var weatherArray = [];
var sunTemp;
var sunArray = [];
var apiKey = "74403c2554582f0499f5acdd116868bc";
var baseURLWeather = "http://api.openweathermap.org/data/2.5/forecast?";
var baseURLSun = "http://api.sunrise-sunset.org/json?";
var placeName;
var longitude;
var latitude;
var currentTime;
var sunHeight;
var now = new Date().getHours();
var fakeTime = now;
var completeWeatherArray = [];
//Page Set Up
function init() {
	//simple();
	resizeEverything();
	$("#England").mousedown(function(event) {
		/*
		 ** Most south is 1070 px   49.91 Long
		 ** Most north is 10 px     55.78 long
		 ** Most east is 1400 px   -5.72 Lat
		 ** most west is 520 px    1.76 Lat
		 */
		var width = $(window).width();
		var height = 1080 * (width / 1920);
		var xMouse = event.pageX;
		var yMouse = event.pageY;
		//console.log(xMouse + "/" + width);
		//console.log(-10.14+(16.32*(xMouse / width)));
		longitude = -10.14 + (16.32 * (xMouse / width));
		//console.log(yMouse + "/" + height);
		//console.log(55.89-(6.09*(yMouse / height)));
		latitude = 55.89 - (6.09 * (yMouse / height));
		//console.log(" " + xMouse / width + " " + yMouse / height );
		launchLocation();
	});
}

function fillSign() {
	var width = $(window).width();
	var height = 1080 * (width / 1920);
	placeName = placeName.toUpperCase();
	if (placeName.split("").length > 15) {
		var tempName = "";
		for (i = 0; i < 12; i++) {
			tempName += placeName.split("")[i];
		}
		tempName += "...";
		placeName = tempName;
	}
	$("#SignText").text(placeName);
	$("#SignText").css("left", (100 * (width / 1920)));
	$("#SignText").css("bottom", (170 * (height / 1080)));
}

function launchLocation() {
	weather24Hours();
	sunsetSunrise();
	presentationData();
	$(function() {
		$("#England").css("visibility", "hidden");
		$("#Display").css("visibility", "visible");
	});
	fillSign();
	resizeEverything();
	runWeather();
}

function runWeather() {
	var i = 0,
		howManyTimes = 24;

	function f() {
		
		
		if (fakeTime > 23) {
			fakeTime = 0;
		}
		
		//console.log(fakeTime);
		//Weather
		$("#CloudsImage").attr("src", "css/images/" + completeWeatherArray[fakeTime].weather + ".png");
		$("#WeatherImage").attr("src", "css/images/" + completeWeatherArray[fakeTime].weather + ".gif");
		$("#SignEffectsImage").attr("src", "css/images/sign" + completeWeatherArray[fakeTime].weather + ".gif");
		//Time of Day
		if(sunArray[0].split(":")[0]==fakeTime|sunArray[1].split(":")[0]==fakeTime){
			$("#SkyImage").attr("src", "css/images/SkyDawnDusk.png");
			$("#AtmosImage").attr("src", "css/images/SkyAtmosphereDawnDusk.png");
		} else if (sunArray[0].split(":")[0]>fakeTime&&sunArray[1].split(":")[0]<fakeTime){
			$("#SkyImage").attr("src", "css/images/Sky.png");
			$("#AtmosImage").attr("src", "css/images/SkyAtmosphere.png");
		} else if (sunArray[0].split(":")[0]<fakeTime|sunArray[1].split(":")[0]>fakeTime){
			$("#SkyImage").attr("src", "css/images/SkyNight.png");
			$("#AtmosImage").attr("src", "css/images/SkyAtmosphereNight.png");
		}
		//Sun Height
		var width = $(window).width();
		var height = 1080 * (width / 1920);
		if(sunArray[0].split(":")[0]>=fakeTime&&fakeTime>=(sunArray[0].split(":")[0]-(sunHeight/2))){
			//console.log("sunset");
			var workingOut = fakeTime-(sunArray[1].split(":")[0]);
			//console.log(workingOut);
			$("#Sun").css("left", (((workingOut/sunHeight)*(1920))*(width / 1920)));
			workingOut = (sunArray[0].split(":")[0])-fakeTime;
			//console.log(workingOut);
			//console.log((((workingOut/sunHeight)*(1080))*(height / 1080)));
			$("#Sun").css("bottom", (((workingOut/(sunHeight/2))*(1080))*(height / 1080)));
		}
		
		if(sunArray[1].split(":")[0]<fakeTime&&fakeTime<(sunArray[0].split(":")[0]-(sunHeight/2))){
			//console.log("sunrise");
			var workingOut = fakeTime-(sunArray[1].split(":")[0]);
			//console.log(workingOut);
			$("#Sun").css("left", (((workingOut/sunHeight)*(1920))*(width / 1920)));
			//console.log((((workingOut/sunHeight)*(1080))*(height / 1080)));
			$("#Sun").css("bottom", (((workingOut/(sunHeight/2))*(1080))*(height / 1080)));
		}
			
		
		
		//$("#Sun").css("left", (0 * (width / 1920)));
		//$("#Sun").css("bottom", (1080 * (height / 1080)));
		
		fakeTime += 1;
		
		i++;
		if (i < howManyTimes) {
			setTimeout(f, 1000);
		}
		if (i == howManyTimes){
			//console.log("loop");
			loop();
		}
	}
	f();
}

function loop(){
	runWeather();
}

//Simple Set Up Function
function simple() {
	latitude = 52.360252;
	longitude = -2.066178;
}

function viewport() {
	//console.log($(window).height());
	//console.log($(window).width());
}
//Current Time set up
function getCurrentTime() {
	var currentDate = new Date();
	var year = "" + currentDate.getFullYear();
	var month = "" + (currentDate.getMonth() + 1);
	if (month.length == 1) {
		month = "0" + month;
	}
	var date = "" + currentDate.getDate();
	if (date.length == 1) {
		date = "0" + date;
	}
	var hour = "" + currentDate.getHours();
	if (hour.length == 1) {
		hour = "0" + hour;
	}
	var min = "" + currentDate.getMinutes();
	if (min.length == 1) {
		min = "0" + min;
	}
	var secs = "" + currentDate.getSeconds();
	if (secs.length == 1) {
		secs = "0" + secs;
	}
	//console.log(+new Date());
	currentTime = year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + secs;
	//console.log(currentTime);
	return currentTime;
}
//URL Builder for OpenWeatherMaps API
function urlBuilderWeather() {
	//console.log("URL Builder Weather Launched");
	return "" + baseURLWeather + "lat=" + latitude + "&lon=" + longitude + "&units=metric&mode=json&appid=" + apiKey;
}
//Get Weather Data
function getWeatherData() {
	//console.log("Get Weather Data Launched");
	var myUrl = urlBuilderWeather();
	//console.log(myUrl)
	/*$.getJSON(myUrl).always(function(data){
		weatherTemp = data;
		//console.log(weatherTemp);
	});*/
	$.ajax({
		url: myUrl,
		dataType: 'json',
		async: false,
		success: function(data) {
			weatherTemp = data;
			//console.log(weatherTemp);
		}
	});
}
//Get Sunrise and Sunset
function getSunData(date) {
	//console.log("Get Sun Data Launched");
	var myUrl = urlBuilderSun(date);
	//console.log(myUrl)
	/*return $.getJSON(myUrl).always(function(data){
		//console.log("4");
		sunTemp = data;
		//console.log(sunTemp);
	});*/
	$.ajax({
		url: myUrl,
		dataType: 'json',
		async: false,
		success: function(data) {
			sunTemp = data;
			//console.log(sunTemp);
		}
	});
}
//URL Builder for Sunset and Sunrise API
function urlBuilderSun(date) {
	//console.log("URL Builder Sun Launched");
	return "" + baseURLSun + "lat=" + latitude + "&lng=" + longitude + "&date=" + date;
}
//Sunset and Sunrise for the next 24 hours
function sunsetSunrise() {
	//Day 1 Times
	//console.log(weatherTemp.list[0].dt_txt.split(" ")[0]);
	getSunData(weatherTemp.list[0].dt_txt.split(" ")[0]);
	//console.log(sunTemp);
	//console.log(sunTemp.results.sunrise);
	sunArray[0] = sunTemp.results.sunrise;
	sunArray[1] = sunTemp.results.sunset;
	//Day 2 Times
	//console.log(weatherTemp.list[8].dt_txt.split(" ")[0]);
	getSunData(weatherTemp.list[8].dt_txt.split(" ")[0]);
	//console.log(sunTemp);
	//console.log(sunTemp.results.sunrise);
	sunArray[2] = sunTemp.results.sunrise;
	for (i = 0; i < sunArray.length; i++) {
		if (sunArray[i].split(" ")[1] == "PM") {
			sunArray[i] = ("" + (Number(sunArray[i].split(":")[0]) + 12) + ":" + sunArray[i].split(":")[1] + ":" + sunArray[i].split(":")[2]).split(" ")[0];
		} else {
			if (sunArray[i].split(":")[0].length == 1) {
				sunArray[i] = (("0" + sunArray[i].split(":")[0]) + ":" + sunArray[i].split(":")[1] + ":" + sunArray[i].split(":")[2]).split(" ")[0];
			}
			sunArray[i] = sunArray[i].split(" ")[0]
		}
	}
	if(sunArray[0]<sunArray[1]){
		sunArray.reverse();
	}
	//console.log(sunArray)
}
//which sunset and rise should i show
function presentationData() {
	//console.log("ForLoop")
	for (i = 0; i < sunArray.length; i++) {
		if (sunArray[i] > getCurrentTime().split(" ")[1]) {
			sunArray = [sunArray[i], sunArray[i + 1]];
			//console.log(sunArray)
		}
	}
	//console.log("SunIF")
	if (sunArray[0] > sunArray[1]) {
		sunHeight = Number(sunArray[0].split(":")[0]) - Number(sunArray[1].split(":")[0]);
	} else {
		sunHeight = Number(sunArray[1].split(":")[0]) - Number(sunArray[0].split(":")[0]);
	}
	//console.log(sunHeight);
	//console.log(new Date(weatherArray[8].timeCode * 1000).getHours());
	for (i = 0; i < weatherArray.length; i++) {
		completeWeatherArray[(new Date(weatherArray[i].timeCode * 1000).getHours()) - 1] = weatherArray[i];
	}
	for (i = 0; i < completeWeatherArray.length; i++) {
		if (!completeWeatherArray[i]) {
			completeWeatherArray[i] = completeWeatherArray[i - 1];
		}
	}
	completeWeatherArray[22] = completeWeatherArray[21];
	completeWeatherArray[23] = completeWeatherArray[21];
	//console.log(completeWeatherArray);
}
//Weather for next 24 hours
function weather24Hours() {
	getWeatherData();
	//console.log(weatherTemp.city.name);
	placeName = weatherTemp.city.name;
	for (i = 0; i < 9; i++) {
		//Time Code
		//console.log(weatherTemp.list[i].dt);
		var timeCode = (weatherTemp.list[i].dt);
		//Time Written
		//console.log(weatherTemp.list[i].dt_txt);
		//var timeWritten = weatherTemp.list[i].dt_txt;
		//Temperature
		//console.log(weatherTemp.list[i].main.temp + " degrees C");
		var temperature = weatherTemp.list[i].main.temp;
		//Weather
		//console.log(weatherTemp.list[i].weather[0].main + " Weather Symbol");
		var weather = weatherTemp.list[i].weather[0].main;
		//Wind Speed
		//console.log(weatherTemp.list[i].wind.speed + " m/s");
		var windSpeed = weatherTemp.list[i].wind.speed;
		//Add all to Weather Array
		weatherArray[i] = {
			timeCode,
			temperature,
			weather,
			windSpeed
		};
	}
	//console.log(weatherArray);
}

function resizeEverything() {
	theFactoringNumber = ($(window).width()) / 1920;
	$('img').attr('width', (1920 * theFactoringNumber));
	$("#Atmosphere").css('bottom', (1080 * theFactoringNumber));
}