import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSavedSubReddit, selectSubRedditFilter, setActiveSubReddit, subRedditSearch } from "../subRedditFilterSlice";
import { useNavigate } from "react-router-dom";
import './subRedditSearch.css';

export const SubRedditSearch = () => {
    const [searchField, setSearchField] = useState('');
    const searchResults = useSelector(selectSubRedditFilter).searchResults;
    const ListIsLoading = useSelector(selectSubRedditFilter).ListIsLoading;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = async (e) => {
        const searchTerm = e.target.value;
        setSearchField(searchTerm);
        const searchString = searchTerm.replace(' ','+');
        dispatch(subRedditSearch(searchString));
    };

    const handleClick = () => {
        dispatch(subRedditSearch(''));
        setSearchField('');
    }

    let style = 'searchIcon';
    if(searchField){
        style = 'clearIcon';
    }

    return (
        <div className='barAndResults'>
        <form className='subRedditSearchForm'>
            <input type='text' value={searchField} placeholder='Search SubReddits' className='searchSubReddits' onChange={handleChange}></input>
            <div className={style} onClick={handleClick}>
            </div>
        </form>
        <ul className="listContainer">
            {ListIsLoading ? <li className="searchResult">Loading Subreddits...</li> : searchResults.map(result => (
            <li key={result.id} className='searchResult' onClick={() => {
                dispatch(addSavedSubReddit(result));
                dispatch(setActiveSubReddit(result.name));
                dispatch(subRedditSearch(''))
                setSearchField('');
                navigate('/');
            }}>{result.name}</li>
            ))
            }
        </ul>
        </div>
    );
}