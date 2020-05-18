//задаем константы
var $tempMode = $("#tempMode");
var $tmp = $("#tmp");
var $tmp3 = $("#tmp3");
var $tmp1 = $("#tmp1");
var $tmp2 = $("#tmp2");
var $tmp20 = $("#tmp20");
var $tmp21 = $("#tmp21");

function formatTemperature(kelvin) {
	var clicked = false;
    var fahr = ((kelvin * 9 / 5) - 459.67).toFixed(0);
    var cels = Math.floor((kelvin - 273.15).toFixed(1));
    $tmp1.html(cels);
    var firstClick = false;
	$tempMode.off("click").on("click", function() 
	{
		  firstClick = true;
		  console.log(clicked);
		  clicked === false ? clicked = true : clicked = false;
		  clicked === true ? $tempMode.html(" " + "&degF") : $tempMode.html(" " + "&degC") ;
		  if (clicked) 
		  {
			$tmp1.html(fahr);
		 }  
	  else
		$tmp1.html(cels);
	});
}

//обработка полученных данных, вставка их в форму 
//сегодня
function dataHandler(data) {
    dataString = JSON.stringify(data);    
    formatTemperature(data.main.temp);

    if (data.main.temp && data.sys) {
      // display icon
      if (data.weather) {
        var img2URL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        $("#tmp3").attr("src", img2URL);
	//Меняем регистр заглавной буквы описания погоды
		var str = data.weather[0].description;
		str = str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
		$("#tmp").html(data.weather[0].description);
		document.getElementById("tmp").innerHTML = " " + str;
		}
// отображение скорости ветра
      if (data.wind) {
        var knots = data.wind.speed;
        $tmp2.html(knots.toFixed(1) + " м/с");
      }
	   if (data.main) {
        var hum2 = data.main.pressure;
		var mm = (data.main.pressure * 0.75006).toFixed(0);
        $tmp21.html(mm + " мм.рт.ст.");
    }
       if (data.main) {
        var hum3 = data.main.humidity;
        $tmp20.html(hum3 + " %");
    }
  }
}

function dataHandler2(data) {
	var now = new Date();
	let h = now.getHours();
    var num = 8-(Math.floor(h/3));
//завтра
		document.getElementById("demo6").innerHTML = data.list[num+4].dt_txt;
		document.getElementById("demo4").innerHTML = "Макс." + " " + Math.floor(((data.list[num+4].main["temp"])-32)*5/9)+"°C";
		document.getElementById("demo7").innerHTML = data.list[num+1].dt_txt;
		document.getElementById("demo5").innerHTML = "Мин." +  " " + Math.floor(((data.list[num+1].main["temp"])-32)*5/9)+"°C";
		var imgURL = "https://openweathermap.org/img/w/" + data.list[num+4].weather[0].icon + ".png";
		$("#tmp4").attr("src", imgURL);
//послезавтра
		document.getElementById("demo8").innerHTML = data.list[num+12].dt_txt;
		document.getElementById("demo9").innerHTML = "Макс. " + " " + Math.floor(((data.list[num+12].main["temp"])-32)*5/9)+"°C";
		document.getElementById("demo10").innerHTML = data.list[num+9].dt_txt;
		document.getElementById("demo11").innerHTML = "Мин." +  " " + Math.floor(((data.list[num+15].main["temp"])-32)*5/9)+"°C";
		var imgURL = "https://openweathermap.org/img/w/" + data.list[num+12].weather[0].icon + ".png";
		$("#tmp5").attr("src", imgURL);
//после-послезавтра
		document.getElementById("demo12").innerHTML = data.list[num+20].dt_txt;
		document.getElementById("demo13").innerHTML = "Макс." + " " + Math.floor(((data.list[num+20].main["temp"])-32)*5/9)+"°C";
		document.getElementById("demo14").innerHTML = data.list[num+17].dt_txt;
		document.getElementById("demo15").innerHTML = "Мин." +  " " + Math.floor(((data.list[num+23].main["temp"])-32)*5/9)+"°C";
        var imgURL = "https://openweathermap.org/img/w/" + data.list[num+20].weather[0].icon + ".png";
		$("#tmp6").attr("src", imgURL);		
//после-после-послезавтра	
		document.getElementById("demo16").innerHTML = data.list[num+28].dt_txt;
		document.getElementById("demo17").innerHTML = "Макс." + " " + Math.floor(((data.list[num+28].main["temp"])-32)*5/9)+"°C";
		document.getElementById("demo18").innerHTML = data.list[num+25].dt_txt;
		document.getElementById("demo19").innerHTML = "Мин." +  " " + Math.floor(((data.list[num+31].main["temp"])-32)*5/9)+"°C";
        var imgURL = "https://openweathermap.org/img/w/" + data.list[num+28].weather[0].icon + ".png";
		$("#tmp7").attr("src", imgURL);		
   } 
 
 //вывод на страницу локализации
 function getWeather(locdata) {
    console.log("getWeather has been called.")
    var lat = locdata.latitude;
    var lon = locdata.longitude;
	var cit = locdata.city;
	
    if (locdata){ 
      console.log("success");
      $("#city-text").html(locdata.city );
      $("#city-text2").html(locdata.country_name);
      $("#city-text4").html(" Широта: " + locdata.latitude + " Долгота: " + locdata.longitude);
    } else {
    console.log("fail");
    }
//запрос даных погоды сейчас		
	var apiURI2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4e0a83a26de7e3ec5a6eb10e374ab342`;  
		console.log("success getWeather2");
		console.log(apiURI2);
		return $.ajax({
		  url: apiURI2,
		  dataType: "jsonp",
		  type: "GET",
		  async: "true",
		}).done(dataHandler);
	 }
//запрос даных прогноза погоды	 
function getWeather2(locdata) {
    console.log("getWeather2 has been called.")
    var lat = locdata.latitude;
    var lon = locdata.longitude;
	var apiURI= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=4e0a83a26de7e3ec5a6eb10e374ab342&units=imperial`;
			console.log("success getWeather");
			console.log(apiURI);
			return $.ajax({
			  url: apiURI,
			  dataType: "json",
			  type: "GET",
			  async: "true",
			}).done(dataHandler2);
	 }	
//получение локализации
		var counter = 0;
		  function getLocation() {
			console.log("Update# " + counter++);
			//call location api for location data
			return $.ajax({
			  url: "https://ipapi.co/jsonp/",
			  dataType: "jsonp",
			  type: "GET",
			  async: "true",
			});
		  }
		var updateInterval = setInterval(getLocation().done(getWeather), 300000);
		var updateInterval = setInterval(getLocation().done(getWeather2), 300000);
//Показ времени, дни недели 
   function showDateTime() {
				var now = new Date();
				date.textContent = `${now.toLocaleDateString("ru-ru", { day: "numeric", month: "long" })} ${now.getFullYear()} года, `
					+ now.toLocaleDateString("ru-ru", { weekday: "long" });
				time.textContent = correctTime(now);
				
				var d = new Date();
				var n1, n2, n3, n4;
				var weekday = new Array(7);
					weekday[0] = "Воскресенье";
					weekday[1] = "Понедельник";
					weekday[2] = "Вторник";
					weekday[3] = "Среда";
					weekday[4] = "Четверг";
					weekday[5] = "Пятница";
					weekday[6] = "Суббота";
					 
					 if(d.getDay() == 3){
						   n1 = weekday[(d.getDay()+1)];
						   n2 = weekday[(d.getDay()+2)];
						   n3 = weekday[(d.getDay()+3)];
						   n4 = weekday[7-(d.getDay()+4)];} if(d.getDay() == 4)
					     {
						   n1 = weekday[(d.getDay()+1)];
						   n2 = weekday[(d.getDay()+2)];
						   n3 = weekday[7-(d.getDay()+3)];
						   n4 = weekday[9-(d.getDay()+4)];} if(d.getDay() == 5)
					     {
						   n1 = weekday[(d.getDay()+1)];
						   n2 = weekday[7-(d.getDay()+2)];
						   n3 = weekday[9-(d.getDay()+3)];
						   n4 = weekday[11-(d.getDay()+4)];} if(d.getDay() == 6)
					     {
						   n1 = weekday[7-(d.getDay()+1)];
						   n2 = weekday[9-(d.getDay()+2)];
						   n3 = weekday[11-(d.getDay()+3)];
						   n4 = weekday[13-(d.getDay()+4)];}  if(d.getDay() < 3) 
						 {
					       n1 = weekday[(d.getDay()+1)];
						   n2 = weekday[(d.getDay()+2)];
						   n3 = weekday[(d.getDay()+3)];
						   n4 = weekday[(d.getDay()+4)];
					     }
						
								document.getElementById("day1").innerHTML = n1;
								document.getElementById("day2").innerHTML = n2;
								document.getElementById("day3").innerHTML = n3;
								document.getElementById("day4").innerHTML = n4;
			}
				showDateTime();
				setInterval(showDateTime, 1000);
		 
				let stopwatchId, stopwatch_ms,
					timerId, timer_ms;
				
// Общая функция корректного отображения времени. 
				function correctTime(time) {
					let h = time.getHours(),
						m = time.getMinutes(),
						s = time.getSeconds();
					return `${(h < 10 ? "0" : "") + h}:${(m < 10 ? "0" : "") + m}:${(s < 10 ? "0" : "") + s}`;
				}
		 
// В Opera отображение ведущего нуля часов глючит в Intl.
				function correctTimeIntl(time) {
					let format = Intl.DateTimeFormat("ru-ru", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
					return format.format(time);
           }
