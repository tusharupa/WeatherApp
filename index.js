
const submit = document.querySelector('.searchLocation');
const information =document.querySelector('.information');

submit.addEventListener('click',()=>{
    const inputData = document.querySelector('.search');
    // document.querySelector('.not-found').classList.remove('active');
    if(JSON.stringify(inputData.value)=="")
    return;

    loadData(inputData.value);
    
});

async function loadData(city){
    const weatherData = await api.getData(city);
    renderData(weatherData);
    document.querySelector('.search').value="";
}

const api = (() =>{
const API_KEY = '1750541b7dce4345a7d23814232004';
const baseURL = 'http://api.weatherapi.com/v1'
function processData(weatherData) {
    const processedData = {
        name: weatherData.location.name,
        country: weatherData.location.country,
        tempC: weatherData.current.temp_c,
        tempF: weatherData.current.temp_f,
        condition: weatherData.current.condition.text,
        conditionGif: weatherData.current.condition.icon,
        humidity: weatherData.current.humidity,
        cloud: weatherData.current.cloud,
        aqi: weatherData.current.air_quality.us-epa-index
    };
    return processedData;
}
async function getData(location){
try{
    const response = await fetch(`${baseURL}/current.json?key=${API_KEY}&q=${location}&aqi=yes`,{ mode: 'cors'});
    if(response.status>=400)
    {
        document.querySelector('.not-found').classList.add('active');
        document.querySelector('.search').value="";
        return;
    }
    document.querySelector('.not-found').classList.remove('active');
    const data = await response.json();
    
    return data;
    
}
catch(e){
    console.log(e);
}
}
return{
    getData,
    processData
};
})();

function renderData(weatherData) {
    const location = document.querySelector('.weatherLocation');
    location.textContent=weatherData.location.name+", "+ weatherData.location.country;
    
    const iconImage = document.querySelector('#iconImage');
    switch(weatherData.current.condition.code){
        case '1000':
            iconImage.src="images/clear.png";
            break;
        case '1003':
        case '1006':
        case '1009':
            iconImage.src="images/cloud.png";
            break;
        case '1030':
        case '1135':
        case '1147':
            iconImage.src="images/mist.png";
            break;
        case '1063':
        case '1087':
        case '1117':
        case '1150':
        case '1153':
        case '1180':
        case '1183':
        case '1186':
        case '1189':
        case '1192':
        case '1195':
        case '1198':
        case '1201':
        case '1240':
        case '1243':
        case '1246':
        case '1273':
        case '1276':
            iconImage.src="images/rain.png";
            break;
        default:
            iconImage.src="images/snow.png";
            break;
    }
    const tempC = document.querySelector('.temperature');
    tempC.textContent=weatherData.current.temp_c+'°C';
    const description = document.querySelector('.description');
    description.textContent=weatherData.current.condition.text;
    
    const windSpeed = document.querySelector('.windSpeed');
    windSpeed.textContent=weatherData.current.wind_kph+"kph";

    const humidity=document.querySelector('.humidityPercentage');
    humidity.textContent=weatherData.current.humidity+"%";

}

loadData('mumbai');