import { Header } from "../components/header/Header";
import { SubReddits } from "../components/subRedditsList/SubRedditsList"
import { Outlet } from "react-router-dom";
import './App.css';

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
      <div className="body">
        <aside>
          <SubReddits />
        </aside>
        <main id='main'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Next patch improvements:

// Selftext markdown conversion
// Video audio / autoplay when within viewport
// Select from saved subreddits on mobile