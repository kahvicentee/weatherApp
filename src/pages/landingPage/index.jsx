import './index.scss';
import Card from '../../components/card';
import WeekCard from '../../components/weekCard';
import Column from '../../components/column';
import { useState, useEffect } from 'react';
import { getWeather, searchCities } from '../../services/weatherApi';

export default function LandingPage() {
    const [unitsOpen, setUnitsOpen] = useState(false)
    const [selectOpen, setSelectOpen] = useState(false)

    const [suggestions, setSuggestions] = useState([])
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)

    const [city, setCity] = useState("")

    async function toggleUnits() {
        setUnitsOpen(!unitsOpen)
    }

    async function toggleSelect() {
        setSelectOpen(!selectOpen)
    }

    async function searchWeather() {
        if (city.trim() === '') return

        setLoading(true)

        const data = await getWeather(city)
        setWeather(data)
        setLoading(false)
    }

    async function handleSuggestions(value) {
        setCity(value)

        if(value.length < 2) {
            setSuggestions([])
            return
        }

        const data = await searchCities(value)

        setSuggestions(data)
    }

    async function getCurrentLocationWeather() {
        setLoading(true)

        navigator.geolocation.getCurrentPosition (
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const data = await getWeather(`${latitude},${longitude}`)

                setWeather(data)
                setLoading(false)
            },

            (error) => {
                console.log(error)
                setLoading(false)
            }
        );
    }

    useEffect(() => {
        getCurrentLocationWeather()
    }, [])

    useEffect(() => {
        const delay = setTimeout(async () => {
            if(city.length >=2) {
                const data = await searchCities(city)

                setSuggestions(data)
            } else {
                setSuggestions([])
            }
        }, 300);

        return () => clearTimeout(delay)
    }, [city])

    return (
        <div id="landing-page">
            <header id="header">
                <img src="/assets/images/logo.svg" alt="" />
                <div id='button'>
                    <img src="/assets/images/icon-units.svg" alt="" />
                    <p>Units</p>
                    <img src="/assets/images/icon-dropdown.svg" alt="" className='arrow' onClick={toggleUnits}/>
                </div>
            </header>

            <main>
                <div id="title">
                    <h1>How's the sky looking today?</h1>

                    <div id='search'>
                        <div className='input-wrapper'>
                            <img src="/assets/images/icon-search.svg" alt="" />
                            <input 
                                type="text" 
                                placeholder='Search for a place...' 
                                value={city} 
                                onChange={(e) => setCity(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        searchWeather()
                                    }  
                                }}
                            />

                            { suggestions.length > 0 &&
                                <div className='suggestions'>
                                    {
                                        suggestions.map(suggestion => (
                                            <div 
                                            className='suggestion'
                                            key={suggestion.id}
                                            onClick={() => {
                                                setCity(`${suggestion.name}, ${suggestion.country}`)
                                                setSuggestions([])
                                            }}
                                            >
                                                <p>{suggestion.name}, {suggestion.region} - {suggestion.country}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>

                        <button onClick={searchWeather}>
                            {loading ? 'Loading...' : 'Search'}
                        </button>
                    </div>
                </div>

                <div id="info">
                    <div id='info-1'>
                        <div id='today-card'>
                            <div id='place-info'>
                                <div className='place-info1'>
                                    <h1>{weather?.location.name}, {weather?.location.country}</h1>
                                    <h2>{weather?.location.localtime}</h2>
                                </div>

                                <div className='place-info2'>
                                    <img src="/assets/images/icon-sunny.webp" alt="" />
                                    <h1>{weather?.current.temp_c}°</h1>
                                </div>
                            </div>
                        </div>

                        <div id='cards'>
                            <Card title="Feels Like" info={`${weather?.current.feelslike_c}°`} />
                            <Card title="Humidity" info={`${weather?.current.humidity}`} />
                            <Card title="Wind" info={`${weather?.current.wind_kph} km/h`} />
                            <Card title="Precipitation" info={`${weather?.current.precip_mm} mm`} />
                        </div>

                        <div id='week'>
                            <h2>Daily forecast</h2>

                            <div id='week-cards'>
                                {
                                    weather?.forecast?.forecastday?.map(day => (
                                        <WeekCard 
                                            key={day.date}
                                            day={new Date(day.date).toLocaleDateString('en-US', {
                                                weekday: 'short'
                                            })}
                                            icon={day.day.condition.icon}
                                            max={`${day.day.maxtemp_c}°`}
                                            min={`${day.day.mintemp_c}°`}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div id='info-2'>
                        <div className='hourly'>
                            <h3>Hourly forecast</h3>
                            
                            <div id='hourly-select'>
                                <div className='select' onClick={toggleSelect}>
                                    <p>Monday</p>
                                    <img src="/assets/images/icon-dropdown.svg" alt="" />
                                </div>
                                
                                {selectOpen &&
                                    <div className='options'>
                                        <p>Monday</p>
                                        <p>Tuesday</p>
                                        <p>Wednesday</p>
                                        <p>Thursday</p>
                                        <p>Friday</p>
                                        <p>Saturday</p>
                                        <p>Sunday</p>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='columns'>
                            {
                                weather?.forecast?.forecastday?.[0]?.hour?.map(hour => (
                                    <Column 
                                        key={hour.time}
                                        image={hour.condition.icon}
                                        hour={new Date(hour.time).toLocaleTimeString('en-US', {
                                            hour: 'numeric'
                                        })}
                                        degrees={`${hour.temp_c}°`}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </main>
            
            <footer className="attribution">
                <p>Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.</p>
                <p>Coded by <a href="https://github.com/kahvicentee" target="_blank">Karina Vicente</a>.</p>
            </footer>
        </div>
    )
}