import React, { useEffect, useState } from 'react'
import Display from '../display/display'
import { Card } from "antd"
import clear from "../../assesst/clear.png";
import cloud from "../../assesst/cloud.png";
import drizzle from "../../assesst/drizzle.png";
import rain from "../../assesst/rain.png";
import "./home.css"

function Home() {
  const [city, setCity] = useState('London')
  const [cityData, setCityData] = useState([])
  const [backgroundImage, setBackgroundImage] = useState(clear);
  const [icon, setIcon] = useState('')

  const handleChange = (e) => {
    console.log(e.target.value)
    setCity(e.target.value);

  }

  console.log("isit", cityData)

  const setBackgroundImageByIcon = (icon, setBackgroundImage) => {
    console.log("called")
    if (icon === "01d" || icon === "01n") {
        setBackgroundImage(clear);
    } else if (icon === "02d" || icon === "02n" || icon === "04d" || icon === "04n") {
        setBackgroundImage(cloud);
    } else if (icon === "03d" || icon === "03n") {
        setBackgroundImage(drizzle);
    } else if (icon === "09d" || icon === "09n" || icon === "10d" || icon === "10n") {
        setBackgroundImage(rain);
    } else if (icon === "11d" || icon === "11n") {
        setBackgroundImage(cloud);
    } else {
        setBackgroundImage(clear);
    }
};

const getData = async () => {
  try {
    if (!city) {
      return; // If the city is empty, return early without making the API call
    }
    
    let api_key = "afab6cd10f30942f5b62a39e12d430ca"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`
    
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.cod === "404") {
      // Handle the case where city is not found
      alert("City not found. Please enter a valid city name.");
      setCity('');
      return;
    }
    
    setCityData([data]);
    setCity('');
    setBackgroundImageByIcon(data.weather[0].icon, setBackgroundImage);
   
  } catch (error) {
    alert(error);
  }
}


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getData();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [city]);

 
  return (
    <div className='home-div'>
      <Card
        className='home-card'
      // style={{background:"blue"}}
      >
        <input
          name='city'
          type="text"
          value={city}
          onChange={(e) => handleChange(e)}
          className='inbox'
          placeholder='Search City...'
        />

        {
          cityData?.length > 0 && cityData?.map((item) => {
            return (
              <div>
                {/* <img src={backgroundImage} className='weather-icon' alt="wether icon" /> */}
                <Display cityData={item} backgroundImage={backgroundImage} />
              </div>

            )
          })
        }

      </Card>

    </div>
  )
}

export default Home