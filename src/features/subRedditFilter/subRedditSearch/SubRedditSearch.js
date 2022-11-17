import { useDispatch, useSelector } from "react-redux";
import { addSavedSubReddit, selectSubRedditFilter, setActiveSubReddit, subRedditSearch } from "../subRedditFilterSlice";
import './subRedditSearch.css';

export const SubRedditSearch = () => {
    const searchResults = useSelector(selectSubRedditFilter).searchResults;
    const ListIsLoading = useSelector(selectSubRedditFilter).ListIsLoading;
    const dispatch = useDispatch();

    const handleChange = async (e) => {
        const searchTerm = e.target.value;
        const searchString = searchTerm.replace(' ','+');
        dispatch(subRedditSearch(searchString));
    };

    const handleClick = () => {
        dispatch(subRedditSearch(''));
        document.getElementsByClassName('searchSubReddits')[0].value = '';
    }

    return (
        <>
        <form className='subRedditSearchForm'>
            <input type='text' placeholder='Search SubReddits' className='searchSubReddits' onChange={handleChange}></input>
            <div className="searchIcon" onClick={handleClick}>
            </div>
        </form>
        <ul className="listContainer">
            {ListIsLoading ? 'Loading Subreddits...' : searchResults.map(result => (
            <li key={result.id} className='searchResult' onClick={() => {
                dispatch(addSavedSubReddit(result));
                dispatch(setActiveSubReddit(result.name));
                dispatch(subRedditSearch(''))
                document.getElementsByClassName('searchSubReddits')[0].value = '';
            }}>{result.name}</li>
            ))
            }
        </ul>
        </>
    );
}