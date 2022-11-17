import { Searchbar } from "../../features/postFilter/searchbar/Searchbar";
import './header.css';

export const Header = () => {
    return (
        <div className='header'>
            <h1>BrowseBurn</h1>
            <Searchbar/>
        </div>
    )
}