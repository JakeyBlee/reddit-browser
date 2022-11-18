import { selectFilterResults, fetchPostsByFilter } from "../../features/postFilter/postFilterSlice";
import { selectSubRedditFilter } from "../../features/subRedditFilter/subRedditFilterSlice";
import { useSelector, useDispatch } from "react-redux";
import { FilterButton } from "../../features/postFilter/filterButtons/FilterButton";
import { LoadingAnim } from "../loadingAnim/LoadingAnim";
import { useEffect } from "react";
import { Post } from "../post/Post";
import { searchTerm } from "../../features/postFilter/searchbar/Searchbar";
import './resultsSection.css'

export const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectFilterResults).posts;
  const subReddit = useSelector(selectSubRedditFilter).activeSubReddit;
  const filter = useSelector(selectFilterResults).activeFilter;
  const topFilter = useSelector(selectFilterResults).topFilter;
  const isLoading = useSelector(selectFilterResults).isLoading;

  let header = `Showing ${filter} posts in ${subReddit}`;
  if(filter !== 'Hot' && filter !== 'New' && filter !== 'Top'){
    header = `Showing search results for: ${searchTerm}`
  }

  useEffect(() => {
    dispatch(fetchPostsByFilter([filter, subReddit, topFilter]));
  }, [filter, subReddit, topFilter]);
  
  if(posts.length){
    return (
      <ul className="postList">
        <p className="listHeader">{header}</p>
        <div className='buttons'>
          <FilterButton type='Hot'/>
          <FilterButton type='New'/>
          <FilterButton type='Top'/>
        </div>  
        {isLoading ? <LoadingAnim/> : posts.map(post => (
          <Post key={post.id} data={post.data} />
        ))}
      </ul>
    );
  };
}