import axios from "axios"

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
console.log(API_KEY)
const BASE_URL = 'https://api.weatherapi.com/v1'

export async function getWeather(city) {
    try {
        const resp = await axios.get(
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
        )

        return resp.data
    } catch(err) {
        console.log(err)
    }
}

export async function searchCities(city) {
    try {
        const resp = await axios.get(
            `${BASE_URL}/search.json?key=${API_KEY}&q=${city}`
        )

        return resp.data
    } catch (err) {
        console.log(err)
    }
}