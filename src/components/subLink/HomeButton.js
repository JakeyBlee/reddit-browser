import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilter } from '../../features/postFilter/postFilterSlice';
import { setActiveSubReddit, selectSubRedditFilter } from '../../features/subRedditFilter/subRedditFilterSlice';
import { useNavigate } from 'react-router-dom';
import './homeButton.css';

export const HomeButton = (props) => {
    const data = props.data;
    const navigate = useNavigate();
    const activeSubReddit = useSelector(selectSubRedditFilter).activeSubReddit;
    const dispatch = useDispatch();
    const image = <img className='subRedditIcon' src='https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png'/>;
    let style = 'homeButton'
    if(data.display_name_prefixed === activeSubReddit){
        style = 'homeButton active'
    }
    
    const handleClick = () => {
        dispatch(setActiveSubReddit(data.display_name_prefixed));
        dispatch(setActiveFilter('Hot'));
        navigate('/');
    }
    
    return (
        <li className={style} onClick={handleClick}>
                {image}
                <h3>Home - {data.display_name_prefixed}</h3>
                <p>A single feed for all subReddits.</p>
        </li>
    )
}