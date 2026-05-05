import './index.scss';
import Card from '../../components/card';
import WeekCard from '../../components/weekCard';

export default function LandingPage() {
    return (
        <div id="landing-page">
            <header id="header">
                <img src="/assets/images/logo.svg" alt="" />
                <div id='button'>
                    <img src="/assets/images/icon-units.svg" alt="" />
                    <p>Units</p>
                    <img src="/assets/images/icon-dropdown.svg" alt="" />
                </div>
            </header>

            <main>
                <div id="title">
                    <h1>How's the sky looking today?</h1>

                    <div id='search'>
                        <button>Search</button>
                    </div>
                </div>

                <div id="info">
                    <div id='info-1'>
                        <img src="/assets/images/bg-today-large.svg" alt="" />

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
                                day="Sun"
                                icon="/assets/images/icon-sunny.webp"
                                max="30°"
                                min="14°"
                            />

                            <WeekCard 
                                day="Mon"
                                icon="/assets/images/icon-storm.webp"
                                max="21°"
                                min="15°"
                            />

                            <WeekCard 
                                day="Tue"
                                icon="/assets/images/icon-sunny.webp"
                                max="40°"
                                min="28°"
                            />

                            <WeekCard 
                                day="Wed"
                                icon="/assets/images/icon-sunny.webp"
                                max="24°"
                                min="14°"
                            />

                            <WeekCard 
                                day="Thu"
                                icon="/assets/images/icon-snow.webp"
                                max="22°"
                                min="9°"
                            />

                            <WeekCard 
                                day="Fri"
                                icon="/assets/images/icon-fog.webp"
                                max="29°"
                                min="17°"
                            />

                            <WeekCard 
                                day="Sat"
                                icon="/assets/images/icon-partly-cloudy.webp"
                                max="20°"
                                min="12°"
                            />
                            </div>
                        </div>
                    </div>

                    <div id='info-2'>
                        <div className='houly-title'>

                        </div>

                        <div className='columns'>
                            <div className='column'>
                                <div className='column-hour'>
                                    <img src="" alt="" />
                                    <p>3 PM</p>
                                </div>

                                <p>20°</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}