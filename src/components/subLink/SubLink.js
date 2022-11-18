import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilter } from '../../features/postFilter/postFilterSlice';
import { setActiveSubReddit, selectSubRedditFilter, removeSavedSubReddit } from '../../features/subRedditFilter/subRedditFilterSlice';
import { useNavigate } from 'react-router-dom';
import './subLink.css';

export const SubLink = (props) => {
    const data = props.data;
    const navigate = useNavigate();
    const activeSubReddit = useSelector(selectSubRedditFilter).activeSubReddit;
    const dispatch = useDispatch();
    let image = <img className='subRedditIcon' src='https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png'/>;
    if(data.thumbnail){
        image = <img className='subRedditIcon' src={data.thumbnail}/>
    }
    let style = 'subLink'
    if(data.name === activeSubReddit){
        style = 'subLink active'
    }
    
    const handleClick = () => {
        if(activeSubReddit !== data.name){
           dispatch(setActiveSubReddit(data.name));
           dispatch(setActiveFilter('Hot')); 
           navigate('/');
        }
    }

    const handleRemove = (e) => {
        dispatch(removeSavedSubReddit(data.id));
        dispatch(setActiveSubReddit('r/All'));
        navigate('/');
    }
    
    return (
        <li className={style} onClick={handleClick}>
            {image}
            <h3>{data.name}</h3>
            <img className='removeIcon' src={require('../../media/remove\ icon.png')} onClick={handleRemove} />
        </li>
    )
}