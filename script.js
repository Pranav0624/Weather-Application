const apiKey="01a67000b70593f788023344f2f36aec";

const weatherDataEl=document.getElementById("weather-data")

const cityInputEl=document.getElementById("city-input")

const formEl=document.querySelector("form")

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue=cityInputEl.value;
    getWeatherData(cityValue);

});

async function getWeatherData(cityValue){
    try {
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

        if(!response.ok){
            throw new Error("Network Response was not ok")
        }

        const data=await response.json()

        const temperature=Math.round(data.main.temp)

        console.log(data);
        const description=data.weather[0].description;
        const icon=data.weather[0].icon

        const details=[
            `Feels like:${Math.round(data.main.feels_like)} °C`,`Humidity:${data.main.humidity} %`,`Wind Speed:${data.wind.speed} m/s`,
        ]

        weatherDataEl.querySelector(".icon").innerHTML=`  <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icons">`

        weatherDataEl.querySelector(".temperature").textContent=`${temperature} °C`;
        weatherDataEl.querySelector(".description").textContent=description;

        weatherDataEl.querySelector(".details").innerHTML=details.map((detail)=>
        `<div>${detail}</div>`).join("")

    } catch (error) {
        
        weatherDataEl.querySelector(".icon").innerHTML="";

        weatherDataEl.querySelector(".temperature").textContent="";
        weatherDataEl.querySelector(".description").textContent=`Error Occured!Please try again later`;

        weatherDataEl.querySelector(".details").innerHTML="";
      
        
    }
}