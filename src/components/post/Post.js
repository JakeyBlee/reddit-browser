import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPostData } from '../../features/postPage/postPageSlice';
import './Post.css';

export const Post = (props) => {
    const data = props.data;  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let content;
    let thumbnail;
    if(data.post_hint === 'image'){
        content = (
            <div className='imagePost'>
                <img alt='post main content' src={data.url} ></img>
            </div>
        );
    } else if(data.post_hint === 'video'){
        content = (
            <div className='videoPost'>
                <video preload="auto" autoplay="autoplay" loop="loop" src={data.secure_media.reddit_video.fallback_url} width={data.secure_media.reddit_video.width} height={data.secure_media.reddit_video.height} type="video/mp4" controls>Video not supported.</video>
            </div>
        );
    } else if(data.post_hint === 'hosted:video'){
        content = (
            <div className='videoPost'>
                <video preload="auto" autoplay="autoplay" loop="loop" src={data.secure_media.reddit_video.fallback_url} width={data.secure_media.reddit_video.width} height={data.secure_media.reddit_video.height} type="video/mp4" controls>Video not supported.</video>
            </div>
        );
    } else if(data.post_hint === 'rich:video' && data.preview.video){
        content = (
            <div className='videoPost'>
                <video preload="auto" autoplay="autoplay" loop="loop" src={data.preview.reddit_video_preview.fallback_url} type="video/mp4" width={data.preview.reddit_video_preview.width} height={data.preview.reddit_video_preview.height} controls>Video not supported.</video>
            </div>
        );
    } else if(data.url.endsWith('.gifv')){
        const source = data.url.replace('.gifv', '.mp4')
        content = (
            <div className='videoPost'>
                <video preload="auto" autoplay="autoplay" loop="loop" src={source} type="video/mp4" controls>Video not supported.</video>
            </div>
        );
    } else if(data.thumbnail.startsWith('http')){
        thumbnail = <img alt='post thumbnail' className='thumbnail' src={data.thumbnail}></img>;
    }
    if(data.selftext){
        content = (
            <div className='textPost'>
                <div className='selfText'>{data.selftext}</div>
                <div className='fadeFilter'><p>Show More</p></div>
            </div>
        );
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

    const awards = data.all_awardings.map(award => (
        <div className='award'>
            <img alt='award' className='awardIcon' src={award.icon_url}></img>
            <p className='awardCount'>{award.count}</p>
        </div>
    ));

    const clickHandler = async () => {
        dispatch(fetchPostData(data.permalink));
        navigate(`/${data.author_fullname}`);
    };

    return (
        <li className='post' onClick={clickHandler}>
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
                {thumbnail}
            </div>
            {content}
            <div className='postFooter'>
                <p className='comments'>{data.num_comments} Comments</p>
            </div>
        </li>
    )
}