import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilter } from '../../features/postFilter/postFilterSlice';
import { setActiveSubReddit, selectSubRedditFilter } from '../../features/subRedditFilter/subRedditFilterSlice';
import './homeButton.css';

export const HomeButton = (props) => {
    const data = props.data;
    const activeSubReddit = useSelector(selectSubRedditFilter).activeSubReddit;
    const dispatch = useDispatch();
    let image = <img src='https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png'/>;
    if(data.header_img){
        image = <img src={data.header_img}/>
    }
    let style = 'homeButton'
    if(data.display_name_prefixed === activeSubReddit){
        style = 'homeButton active'
    }
    
    const handleClick = () => {
        dispatch(setActiveSubReddit(data.display_name_prefixed));
        dispatch(setActiveFilter('Hot'));
    }
    
    return (
        <li className={style} onClick={handleClick}>
            {image}
            <h3>Home - {data.display_name_prefixed}</h3>
            <p>A single feed for all subReddits.</p>
        </li>
    )
}