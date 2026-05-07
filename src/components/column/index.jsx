import './index.scss';

export default function Column(props) {
    return (
        <div id="comp-column">
            <div className='column'>
                <div className='column-hour'>
                    <img src={props.image} alt="" />
                    <p>{props.hour}</p>
                </div>

                <p>{props.degrees}</p>
            </div>
        </div>
    )
}