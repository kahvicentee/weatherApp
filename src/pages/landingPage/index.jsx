import './index.scss';
import Card from '../../components/card';
import WeekCard from '../../components/weekCard';
import Column from '../../components/column';
import { useState } from 'react';

export default function LandingPage() {
    const [unitsOpen, setUnitsOpen] = useState(false)
    const [selectOpen, setSelectOpen] = useState(false)

    async function toggleUnits() {
        setUnitsOpen(!unitsOpen)
    }

    async function toggleSelect() {
        setSelectOpen(!selectOpen)
    }

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
                            <input type="text" placeholder='Search for a place...' />
                        </div>

                        <button>Search</button>
                    </div>
                </div>

                <div id="info">
                    <div id='info-1'>
                        <div id='today-card'>
                            <div id='place-info'>
                                <div className='place-info1'>
                                    <h1>Berlin, Germany</h1>
                                    <h2>Tuesday, Aug 5, 2026</h2>
                                </div>

                                <div className='place-info2'>
                                    <img src="/assets/images/icon-sunny.webp" alt="" />
                                    <h1>20°</h1>
                                </div>
                            </div>
                        </div>

                        <div id='cards'>
                            <Card title="Feels Like" info="18°" />
                            <Card title="Humidity" info="46%" />
                            <Card title="Wind" info="14 km/h" />
                            <Card title="Precipitation" info="0 mm" />
                        </div>

                        <div id='week'>
                            <h2>Daily forecast</h2>

                            <div id='week-cards'>
                            <WeekCard 
                                day="Mon"
                                icon="/assets/images/icon-sunny.webp"
                                max="30°"
                                min="14°"
                            />

                            <WeekCard 
                                day="Tue"
                                icon="/assets/images/icon-storm.webp"
                                max="21°"
                                min="15°"
                            />

                            <WeekCard 
                                day="Wed"
                                icon="/assets/images/icon-sunny.webp"
                                max="40°"
                                min="28°"
                            />

                            <WeekCard 
                                day="Thu"
                                icon="/assets/images/icon-sunny.webp"
                                max="24°"
                                min="14°"
                            />

                            <WeekCard 
                                day="Fri"
                                icon="/assets/images/icon-snow.webp"
                                max="22°"
                                min="9°"
                            />

                            <WeekCard 
                                day="Sat"
                                icon="/assets/images/icon-fog.webp"
                                max="29°"
                                min="17°"
                            />

                            <WeekCard 
                                day="Sun"
                                icon="/assets/images/icon-partly-cloudy.webp"
                                max="20°"
                                min="12°"
                            />
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
                            <Column image="/assets/images/icon-rain.webp" hour="3 PM" degrees="20°"/>
                            <Column image="/assets/images/icon-storm.webp" hour="4 PM" degrees="20°"/>
                            <Column image="/assets/images/icon-sunny.webp" hour="5 PM" degrees="20°"/>
                            <Column image="/assets/images/icon-rain.webp" hour="6 PM" degrees="19°"/>
                            <Column image="/assets/images/icon-partly-cloudy.webp" hour="7 PM" degrees="18°"/>
                            <Column image="/assets/images/icon-snow.webp" hour="8 PM" degrees="18°"/>
                            <Column image="/assets/images/icon-sunny.webp" hour="9 PM" degrees="17°"/>
                            <Column image="/assets/images/icon-partly-cloudy.webp" hour="10 PM" degrees="17°"/>
                        </div>
                    </div>
                </div>
            </main>
            
            <footer class="attribution">
                <p>Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.</p>
                <p>Coded by <a href="https://github.com/kahvicentee" target="_blank">Karina Vicente</a>.</p>
            </footer>
        </div>
    )
}