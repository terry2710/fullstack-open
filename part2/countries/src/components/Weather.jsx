import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        if (!api_key) {
            return
        }
        setWeather(null)
        axios
            .get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: capital,
                    appid: api_key,
                    units: 'metric'
                }
            })
            .then(response => setWeather(response.data))
            .catch(error => console.log('failed to fetch weather', error))
    }, [capital])

    if (!api_key) {
        return <p>Set VITE_WEATHER_KEY in .env to show the weather</p>
    }

    if (!weather) {
        return null
    }

    return (
        <div>
            <h3>Weather in {capital}</h3>
            <p><strong>temperature</strong> {weather.main.temp} °C</p>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
            />
            <p><strong>wind</strong> {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather
