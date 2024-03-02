import React, { useState } from 'react';
import humidity from "../../assesst/humidity.png";
import windy from "../../assesst/wind.png";
import "./display.css";


function Display({ cityData,backgroundImage }) {
    console.log("cityData", cityData);

    return (
        <>
            <div>
              <div style={{display:"flex",justifyContent:"center"}}>
                <h1>{cityData?.main?.temp}&deg;C</h1>
                <img src={backgroundImage} className='weather-icon' alt="wether icon" />
              </div>
     
                <div>
                <h1 className='city-name'>{cityData?.name}</h1>
                <h4 className='city-wether'>{cityData?.weather[0]?.description}</h4>
                </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{display:"flex",justifyContent:"center",fontWeight: 500}}> 
                    <img src={humidity} className='humidity' alt="humidity icon" />
                    <span>{cityData?.main?.humidity}%</span><span>Humidity</span>
                </div>
                <div style={{display:"flex",justifyContent:"center",fontWeight: 500}}>
                    <img src={windy} className='humidity' alt="wind icon" />
                    <span>{cityData?.wind?.speed}km/h</span><span>Wind Speed</span>
                </div>
            </div>
        </>
    );
}

export default React.memo(Display);
