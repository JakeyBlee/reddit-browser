import { useState } from "react";
import './comment.css';

export const Comment = (props) => {
    const comment = props.data;
    const [replyFilter, setReplyFilter] = useState(true);

    let postAgeEpoch = (new Date())-(new Date(comment.created_utc*1000));
    let postAgeDays = (postAgeEpoch/86400000);
    let remainderHours = (postAgeEpoch-(Math.floor(postAgeDays)*86400000))/3600000;
    let remainderMinutes = (postAgeEpoch-(Math.floor(postAgeDays)*86400000)-(Math.floor(remainderHours)*3600000))/60000;
    let postAge;
    if(postAgeDays>=1){
        postAge = postAgeDays.toString().split('.')[0]+'d, '+(remainderHours.toString().split('.'))[0]+'h';
    } else if(remainderHours>=1){
        postAge = (remainderHours.toString().split('.'))[0]+'h, '+(remainderMinutes.toString().split('.'))[0]+'m';
    } else if(remainderMinutes>=1){
        postAge = (remainderMinutes.toString().split('.'))[0]+'m'
    } else {
        postAge = 'just now.'
    }

    const handleClick = () => {
        replyFilter ? setReplyFilter(false) : setReplyFilter(true);
    }

    let replies;
    if(comment.replies){
        let number = comment.replies.data.children.filter(reply => reply.kind !== 'more').length;
        if(number){
            if(replyFilter){
                replies = <p className='comments' onClick={handleClick}>{'Show '+number+(number>1?' replies':' reply')}</p>;
                } else {
                replies = <p className='comments' onClick={handleClick}>{'Hide'+(number>1?' all replies':' reply')}</p>;
            };
        }
    };

    return (
        <div className='inherited'>
        <div className={props.class}>
            <div className='commentInfo'>
                <div className='commentRating'>
                    {comment.ups}
                    <img alt='rating icon' src={require('../../media/rating icon.png')} />
                </div>
                <ul className='authorInfo'>
                    <li className='author'>Posted by u/{comment.author}</li>
                    <li className='creationDate'>{postAge} ago</li>
                </ul>
            </div>
            <p className="textContent">{comment.body}</p>
            <div className='postFooter'>
                {replies}
            </div>
        </div>
        {comment.replies && !replyFilter ? comment.replies.data.children.filter(reply => reply.kind === 't1').map(reply => (
        <Comment key={reply.data.id} data={reply.data} class='reply'/> )) : ''}
        </div>
    )
}