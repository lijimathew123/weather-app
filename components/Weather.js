import React, { useState } from 'react'
import axios from 'axios'

function Weather() {
    const [city,setCity] = useState("");
    const [country,setCountry] = useState("");
    const [temp,setTemp] = useState("");
    const [min,setMin] = useState("");
    const [max,setMax] = useState("");
    const [description , setDescription] = useState("");
    const [icon,setIcon]= useState("");
    const [showMyComponent,setShowMyComponent] = useState(false);
    const getweatherdata = async(city, country)=>{
        await axios({
            method:'GET',
            url:`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=1454f88d51382e4c72c5dc8475a67052`,
        }).then((res)=>{
            console.log(res.data);
            console.log(res.data.main.temp);
            
            setTemp(res.data.main.temp - 273.15);
            setIcon(res.data.weather[0].icon);
            setMin(res.data.main.temp_min - 273.15);
            setMax(res.data.main.temp_max - 273.15);
            setDescription(res.data.weather[0].description);
            setCountry(res.data.sys.country);
            setShowMyComponent(true);


        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div className='container'>
        <h2 className='heading'>Weather cast</h2>
        <div className='input-field'>
            <input 
            type="text" 
            value={city} 
            onChange= {(e)=> setCity(e.target.value)}
            placeholder='city name'  className='mx-2 p-1'/>
            <input 
            type="text" 
            value={country} 
            onChange= {(e)=> setCountry(e.target.value)} 
            placeholder='country name' className='mx-2 p-1' />
            <button onClick={() => getweatherdata(city,country)}
            className="btn btn-primary"
            style={{backgroundColor:'#51456a',fontWeight:'bold', fontSize:20, border:0 }} >Get Weather</button>

        </div>

         
         {showMyComponent ? (
            <div className='data_container p-4 my-5'>
            <h1>{city},{country}</h1>
            <div className='my-2'>
               <img  src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon" style={{width:200, height:200}} />
            </div>
            { temp? <h2>{Math.floor(temp)}C</h2> : null }
            <h4 className='my-4'>Min: <span>{Math.floor(min)}C</span> <span className='mx-3'>|</span> Max: <span>{Math.floor(max)}C</span></h4>
            <h2>{description}</h2>
            <h4>Date: {new Date().toLocaleDateString()}</h4>
          </div>
         ) : null }

         
       
      
    </div>
  )
}

export default Weather

