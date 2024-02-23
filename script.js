let Api=``


place.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  
      search();
    }
  });
function  search(){
    let location=place.value
    Api=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e4343802996eff88313fdbbdc4e79475&units=metric`
    if(location){
        fetchWeather()
    }else{
        alert(`Please enter a city name`)
    }
}

function find(){

    try {
        navigator.geolocation.getCurrentPosition((resonse)=>{
            console.log(resonse);
           let latitude=resonse.coords.latitude
           let longitude=resonse.coords.longitude
           Api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e4343802996eff88313fdbbdc4e79475&units=metric`
           //console.log(latitude);
            fetchWeather()
        })
        
    } catch (error) {
        
    }
    
    


    
}

const fetchWeather = async()=>{   

   
    data =  await  fetch (Api)
      
    if(data.status==404){
       alert(`invalid city name`)
        place.value=``

    }
    else{
        data.json().then((details)=>{
            console.log(details);

            result.style.display=`block`
            title.style.display=`none`           
            top_logo.style.display=`block`
            current.style.display=`none`

            weatherData(details)
            place.value=``
           


        })      

       }
    
    


    const weatherData=(details)=>{
        const time=new Date() 

    const days=[`Sunday`,`Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`,`Saturday`]
    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
      ];
    
    const hour= time.getHours()
    const minutes= time.getMinutes()   
    const day=time.getDay()
    const date=time.getDate()
    const month=time.getMonth()
    const year=time.getFullYear()


    let temperature = details.main.temp
    let place = details.name
    let main = details.weather[0].main
    let feels_like = details.main.feels_like
    let pressure= details.main.pressure
    let humidity=details.main.humidity
    let wind= details.wind.speed
    let countr=details.sys.country
    let condition=details.weather[0].description
    
   /*  console.log(main);
   console.log(Math.floor(temperature));
   console.log(place);
   console.log(feels_like);
   console.log(pressure);
   console.log(humidity);
   console.log(wind);
   console.log(countr); */

    clock.innerHTML=`${hour}:${minutes} ${hour >=12? `PM`:`AM`}`
    cal.innerHTML= days[day]+ ' | ' +months[month]+ ` ` + date
    country.innerHTML=countr
    locationn.innerHTML=place
    temp.innerHTML=Math.floor(temperature) +`°C`
    sky.innerHTML=condition
    humid.innerHTML=humidity +`%`
    windd.innerHTMLwind + `m/s`
    pres.innerHTML=pressure + `pa`
    tempf.innerHTML=feels_like + `°C`

    

    //changing images and background




    switch (main) {
        case "Clear":
            if(hour>=19){
                bgbody.style.backgroundImage = "url('images/clear_night.gif')";
                weatherIcon.src=`./images/clear_night.png`
            }
            else{
                bgbody.style.backgroundImage = "url('images/clear.gif')";
                weatherIcon.src=`./images/clear.png`
            }
        break;

        case "Clouds":
            if(hour>=19){
                bgbody.style.backgroundImage = "url('images/cloud_night.gif')";
                weatherIcon.src=`./images/cloudy-night.png`
            }
            else{
                bgbody.style.backgroundImage = "url('images/clouds.gif')";
                weatherIcon.src=`./images/clouds.png`
            };
        break;
        case "Snow":
            if(hour>=19){
                bgbody.style.backgroundImage = "url('images/snow.gif')";
                weatherIcon.src=`./images/snow_night.png`
            }
            else{
                bgbody.style.backgroundImage = "url('images/snow_day.gif')";
                weatherIcon.src=`./images/snow.png`
            };
        break;
        
       case "Fog" :
        case "mist" :
        case "Haze":
            if(hour>=19){
                bgbody.style.backgroundImage = "url('images/mist.gif')";
                weatherIcon.src=`./images/mist_night.png`
            }
            else{
                bgbody.style.backgroundImage = "url('images/mist.gif')";
                weatherIcon.src=`./images/mist.png`
            };
        break;
        case "Rain":
            if(hour>=19){
                bgbody.style.backgroundImage = "url('images/rain.gif')";
                weatherIcon.src=`./images/heavy-rain_night.png`
            }
            else{
                bgbody.style.backgroundImage = "url('images/rain.gif')";
                weatherIcon.src=`./images/heavy_rain.png`
            };
        
        break;
        
        case "Thunderstorm":
           
                bgbody.style.backgroundImage = "url('images/thunderstorm.gif')";
                weatherIcon.src=`./images/thunderstorm.png`
        break;
        case "Drizzle":
            if(hour>=19){
                bgbody.style.backgroundImage = "url('images/drizzle_night.gif')";
                weatherIcon.src=`./images/rain_night.png`
            }
            else{
                bgbody.style.backgroundImage = "url('images/drizzle.gif')";
                weatherIcon.src=`./images/rain.png`
            };
        
        break;
        case "Ash":        
        case "Dust":    
                bgbody.style.backgroundImage = "url('images/dust.gif')";
                weatherIcon.src=`./images/dust.png`
        break;
        case "Smoke":    
            bgbody.style.backgroundImage = "url('images/smoke.gif')";
            weatherIcon.src=`./images/smoke.png`
        break;
        case "Tornado":  
        case "Squall":    
            bgbody.style.backgroundImage = "url('images/tornado.gif')";
            weatherIcon.src=`./images/tornado.png`
        break;   


        }

    
   

    }


}

