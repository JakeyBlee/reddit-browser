import './poll.css';

export const Poll = (props) => {
    return (
        <div className='poll'>
            <h3>{props.data.status == 'OPEN' ? 'Ongoing' : 'Completed'}</h3>
            <h4>{props.data.title}</h4>
            <div className='options'>
                {props.data.options.map(option => (
                <div className={option.id === props.data.resolved_option_id ? 'correct' : 'option'}>    
                    <h5>{option.text}</h5>
                    <p>{Math.round(option.vote_count/props.data.total_vote_count*100)}%</p>
                </div>
                ))}
            </div>
        </div>
    )
}