import './index.scss';
import Card from '../../components/card';
import WeekCard from '../../components/weekCard';
import Column from '../../components/column';
import { useState, useEffect } from 'react';
import { getWeather, searchCities } from '../../services/weatherApi';

export default function LandingPage() {
    const [unitsOpen, setUnitsOpen] = useState(false)
    const [selectOpen, setSelectOpen] = useState(false)
    const [selectedDay, setSelectedDay] = useState(0)

    const [suggestions, setSuggestions] = useState([])
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)

    const [city, setCity] = useState("")

    function toggleUnits() {
        setUnitsOpen(!unitsOpen)
    }

    function toggleSelect() {
        setSelectOpen(!selectOpen)
    }

    async function searchWeather() {
        if (city.trim() === '') return

        setLoading(true)

        const data = await getWeather(city)
        setWeather(data)
        setLoading(false)
        setSuggestions([])
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

    function getWeatherIcon(condition) {
        const text = condition.toLowerCase()

        if (text.includes('sun') || text.includes('clear')) {
            return '/assets/images/icon-sunny.webp'
        }

        if (text.includes('partly cloudy')) {
            return '/assets/images/icon-partly-cloudy.webp'
        }

        if (text.includes('cloud') || text.includes('overcast')) {
            return '/assets/images/icon-overcast.webp'
        }

        if(text.includes('rain') || text.includes('drizzle')) {
            return '/assets/images/icon-rain.webp'
        }

        if (text.includes('snow') || text.includes('ice')) {
            return '/assets/images/icon-snow.webp'
        }

        if (text.includes('thunder')) {
            return '/assets/images/icon-storm.webp'
        }

        if (text.includes('fog') || text.includes('mist')) {
            return '/assets/images/icon-fog.webp'
        }

        return '/assets/images/icon-sunny.webp'
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

            {
            loading && !weather ? (
                <div id='loading-screen'>
                    <img src="/assets/images/icon-loading.svg" alt="Loading..." />
                </div>
            ) : (
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
                                        <h2>{new Date(weather?.location?.localtime).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}</h2>
                                    </div>

                                    <div className='place-info2'>
                                        <img src={getWeatherIcon(weather?.current?.condition?.text || '')} alt="" />
                                        <h1>{Math.round(weather?.current.temp_c)}°</h1>
                                    </div>
                                </div>
                            </div>

                            <div id='cards'>
                                <Card title="Feels Like" info={`${Math.round(weather?.current.feelslike_c)}°`} />
                                <Card title="Humidity" info={`${Math.round(weather?.current.humidity)}%`} />
                                <Card title="Wind" info={`${Math.round(weather?.current.wind_kph)} km/h`} />
                                <Card title="Precipitation" info={`${Math.round(weather?.current.precip_mm)} mm`} />
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
                                                icon={getWeatherIcon(day.day.condition.text)}
                                                max={`${Math.round(day.day.maxtemp_c)}°`}
                                                min={`${Math.round(day.day.mintemp_c)}°`}
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
                                        <p>
                                            {
                                                weather?.forecast?.forecastday?.[selectedDay] &&
                                                new Date(
                                                    weather.forecast.forecastday[selectedDay].date
                                                ).toLocaleDateString('en-US', {
                                                    weekday: 'long'
                                                })
                                            }
                                        </p>

                                        <img src="/assets/images/icon-dropdown.svg" alt="" />
                                    </div>
                                    
                                    {selectOpen &&
                                        <div className='options'>
                                            {
                                                weather?.forecast?.forecastday?.map((day, index) => (
                                                    <p
                                                        key={day.date}
                                                        onClick={() => {
                                                            setSelectedDay(index)
                                                            setSelectOpen(false)
                                                        }}
                                                    >
                                                        {
                                                            new Date(day.date).toLocaleDateString('en-US', {
                                                                weekday: 'long'  
                                                            })
                                                        }
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className='columns'>
                                {
                                    weather?.forecast?.forecastday?.[selectedDay]?.hour?.map(hour => (
                                        <Column 
                                            key={hour.time}
                                            image={getWeatherIcon(hour.condition.text)}
                                            hour={new Date(hour.time).toLocaleTimeString('en-US', {
                                                hour: 'numeric'
                                            })}
                                            degrees={`${Math.round(hour.temp_c)}°`}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </main>
            )}
            
            <footer className="attribution">
                <p>Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel='noopener noreferrer'>Frontend Mentor</a>.</p>
                <p>Coded by <a href="https://github.com/kahvicentee" target="_blank" rel='noopener noreferrer'>Karina Vicente</a>.</p>
            </footer>
        </div>
    )
}