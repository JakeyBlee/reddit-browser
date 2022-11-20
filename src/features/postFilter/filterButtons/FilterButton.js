import './filterButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilter, setTopFilter, selectFilterResults } from '../postFilterSlice';

export const FilterButton = (props) => {
    const dispatch = useDispatch();
    const activeFilter = useSelector(selectFilterResults).activeFilter;
    const topFilter = useSelector(selectFilterResults).topFilter;

    let style = 'button';
    if(activeFilter === props.type){
        style = 'button active'
    }

    const handleFilterClick = (e) => {
        dispatch(setTopFilter(e.target.value));
    }

    const handleClick = (e) => {
        dispatch(setActiveFilter(props.type));
    }

    let filter;
    if(props.type === 'Top' && style==='button active'){
        filter = (
            <select className={style} defaultValue={topFilter} onChange={handleFilterClick}>
                <option value='hour'>Now</option>
                <option value='day'>Today</option>
                <option value='week'>This Week</option>
                <option value='month'>This Month</option>
                <option value='year'>This Year</option>
                <option value='all'>All Time</option>    
            </select>
        )
    }

    return (
        <>
        <div className={style} onClick={handleClick}>
            <img alt='subreddit icon' src={require(`../../../media/${props.type} icon.png`)}/>
            <p>{props.type}</p>
        </div>
        {filter}
        </>
    );
}