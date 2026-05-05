import './index.scss';

export default function Card(props) {
    return (
        <div id="comp-card">
            <div id='card'>
                <p className='title'>{props.title}</p>
                <p className='info'>{props.info}</p>
            </div>
        </div>
    )
}