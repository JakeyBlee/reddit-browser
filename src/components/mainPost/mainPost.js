import { useSelector } from 'react-redux';
import { selectPostPage } from '../../features/postPage/postPageSlice';
import { Poll } from '../poll/Poll';
import './mainPost.css';

export const MainPost = () => {
    const data = useSelector(selectPostPage).postData;

    // let id;
    // if(data.name){
    //     id = data.name;
    // };
    let text;
    if(data.selftext){
        text = data.selftext;
    };
    let awards;
    if(data.all_awardings){
        awards = data.all_awardings.map(award => (
        <div className='award'>
            <img alt='award icon' className='awardIcon' src={award.icon_url}></img>
            <p className='awardCount'>{award.count}</p>
        </div>
        ))
    };

    let content;
    if(data.post_hint === 'image'){
        content = (
            <div className='imagePost'>
                <img alt='main post content' src={data.url}></img>
            </div>
        );
    } else if(data.post_hint === 'video'){
        content = (
            <div className='videoPost'>
                <video preload="auto" autoPlay="autoplay" loop="loop" src={data.secure_media.reddit_video.fallback_url} width={data.secure_media.reddit_video.width} height={data.secure_media.reddit_video.height} type="video/mp4" controls>Video not supported.</video>
            </div>
        );
    } else if(data.post_hint === 'hosted:video'){
        content = (
            <div className='videoPost'>
                <video preload="auto" autoPlay="autoplay" loop="loop" src={data.secure_media.reddit_video.fallback_url} width={data.secure_media.reddit_video.width} height={data.secure_media.reddit_video.height} type="video/mp4" controls>Video not supported.</video>
            </div>
        );
    } else if(data.post_hint === 'rich:video' && data.preview.video){
        content = (
            <div className='videoPost'>
                <video preload="auto" autoPlay="autoplay" loop="loop" src={data.preview.reddit_video_preview.fallback_url} type="video/mp4" width={data.preview.reddit_video_preview.width} height={data.preview.reddit_video_preview.height} controls>Video not supported.</video>
            </div>
        );
    } else if(data.url?.endsWith('.gifv')){
        const source = data.url.replace('.gifv', '.mp4')
        content = (
            <div className='videoPost'>
                <video preload="auto" autoPlay="autoplay" loop="loop" src={source} type="video/mp4" controls>Video not supported.</video>
            </div>
        );
    } else if(data.thumbnail?.startsWith('http')){
        content = (
            <div className='videoPost'>
                <a href={data.url}>{data.url}</a>
                <img alt='post thumbnail' src={data.thumbnail}></img>
            </div>
        );
    } else if(data.tournament_data){
        content = (
            <div className='pollPost'>
                {data.tournament_data.predictions.map(poll => (
                <Poll key={poll.id} data={poll} class='reply'/> ))}
            </div>
        );
    } else if(data.url && !data.url.startsWith('https://www.reddit.com')){
        content = (
        <div className='linkPost'>
            <a href={data.url}>{data.url}</a>
        </div>
        )
    };

    let postAgeEpoch = (new Date())-(new Date(data.created*1000));
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

    return (
        <li className='mainPost'>
            <div className='postInfo'>
                <div className='rating'>
                    <img alt='rating' src={require('../../media/rating icon.png')} />
                    {data.ups}
                </div>
                <div className='subInfo'>
                    <h2 className='subRedditName'>{data.subreddit_name_prefixed}</h2>
                    <div className='awards'>{awards}</div>    
                </div>
                <ul className='authorInfo'>
                    <li className='author'>Posted by u/{data.author}</li>
                    <li className='creationDate'>{postAge} ago</li>
                </ul>
            </div>
            <div className='postContent'>
               <h3>{data.title}</h3>
            </div>
            <p className='textContent'>{text}</p>
            {content}
            <div className='postFooter'>
                {/* <p className='mainComments'>{data.num_comments} Comments</p> */}
            </div>
        </li>
    )
}