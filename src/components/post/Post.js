import './Post.css';

export const Post = (props) => {
    const data = props.data;  
    let content;
    let thumbnail;
    if(data.post_hint === 'image'){
        content = (
            <div className='imagePost'>
                <img src={data.url} ></img>
            </div>
        );
    } else if(data.post_hint === 'video'){
        content = (
            <div className='videoPost'>
                <video src={data.secure_media.reddit_video.fallback_url} width={data.secure_media.reddit_video.width} height={data.secure_media.reddit_video.height} controls>Video not supported.</video>
            </div>
        );
    } else if(data.post_hint === 'hosted:video'){
        content = (
            <div className='videoPost'>
                <video src={data.secure_media.reddit_video.fallback_url} width={data.secure_media.reddit_video.width} height={data.secure_media.reddit_video.height} controls>Video not supported.</video>
            </div>
        );
    } else if(data.post_hint === 'rich:video' && data.preview.video){
        content = (
            <div className='videoPost'>
                <video src={data.preview.reddit_video_preview.fallback_url} width={data.preview.reddit_video_preview.width} height={data.preview.reddit_video_preview.height} controls>Video not supported.</video>
            </div>
        );
    } else if(data.thumbnail.startsWith('http')){
        thumbnail = <img className='thumbnail' src={data.thumbnail} width='150' height='100'></img>;
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

    let ratingClass;
    const rating = data.ups-data.downs;
    if(rating>0){
        ratingClass = 'positive';
    } else {
        ratingClass = 'negative';
    };

    const awards = data.all_awardings.map(award => (
        <div className='award'>
            <img className='awardIcon' src={award.icon_url}></img>
            <p className='awardCount'>{award.count}</p>
        </div>
    ));

    const clickHandler = () => {
        window.open(data.url);
    }

    return (
        <li className='post' onClick={clickHandler}>
            <div className='postInfo'>
                <div className={ratingClass}>{rating}</div>
                <h3 className='subRedditName'>{data.subreddit_name_prefixed}</h3>
                <ul className='authorInfo'>
                    <li className='author'>u/{data.author}</li>
                    <li className='creationDate'>/ ~ {postAge}</li>
                </ul>
            </div>
            <div className='postContent'>
               <h3>{data.title}</h3>
                {thumbnail}
            </div>
            {content}
            <div className='awards'>{awards}</div>
        </li>
    )
}