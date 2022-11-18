import { setActiveFilter } from "../postFilterSlice";
import { setActiveSubReddit } from "../../subRedditFilter/subRedditFilterSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './searchbar.css';

export let searchTerm = '';

export const Searchbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [termToSearch, setTermToSearch] = useState('');

    const handleChange = (e) => {
        setTermToSearch(e.target.value);
    };

    const searchUrl = termToSearch.replace(' ','%20');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(termToSearch.length){
            dispatch(setActiveFilter(searchUrl));
            dispatch(setActiveSubReddit('r/All'))
            searchTerm = termToSearch;
            setTermToSearch('');
            navigate('/');
        } else {
            window.alert('Please enter search criteria.')
        }
    }

    return (
        <form className='searchForm' onSubmit={handleSubmit}>
            <input type='text' placeholder='Search posts' className='searchInput' value={termToSearch} onChange={handleChange}></input>
            <button className='searchButton'>
                <img src={require(`../../../media/search\ icon.png`)}/>
            </button>
        </form>
    );
}