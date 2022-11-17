import { Header } from "../components/header/Header";
import { PostList } from "../components/postList/PostList";
import { SubReddits } from "../features/subRedditFilter/subReddits/SubReddits"
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
          <PostList />
        </main>
      </div>
    </div>
  );
}