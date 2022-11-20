import { useSelector } from "react-redux"
import { selectSubRedditFilter } from "../subRedditFilterSlice"
import './subRedditInfo.css';

export const SubRedditInfo = () => {
    const activeSubReddit = useSelector(selectSubRedditFilter).activeSubReddit;
    const activeSubRedditInfo = useSelector(selectSubRedditFilter).activeSubRedditInfo.data;

    let header;
    let subscribers;
    let description;

    if(activeSubReddit === 'r/All'){
        header = 'Welcome to my Reddit Browser!';
        description = 'r/All is a collection of feeds from all SubReddits. If you want to view post from specific SubReddits, either select one from below or use the search feature!';
    } else {
        header = activeSubReddit;
        if(!activeSubRedditInfo){
            subscribers = 'Subscriber Count: Loading...';
            description = 'Loading SubReddit Info...';
        } else {
            subscribers = 'Subscriber Count: '+activeSubRedditInfo.subscribers;
            description = activeSubRedditInfo.public_description;
        }
    }
   
    return (
        <div className='subRedditInfo'>
            <h2 className='subRedditHeader'>{header}</h2>
            <p className='subRedditSubCount'>{subscribers}</p>
            <p className='subRedditDescription'>{description}</p>
        </div>
    )
}