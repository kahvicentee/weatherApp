import './index.scss';

export default function WeekCard(props) {
    return (
        <div id="comp-weekcard">
            <div id='week-card'>
                <p>{props.day}</p>
                <img src={props.icon} alt="" />

                <div className='max-min'>
                    <p>{props.max}</p>
                    <p>{props.min}</p>
                </div>
            </div>
        </div>
    )
}