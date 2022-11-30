import { selectFilterResults, fetchPostsByFilter, fetchAdditionalPosts } from "../../features/postFilter/postFilterSlice";
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
  const additionalPosts = useSelector(selectFilterResults).additionalPosts;
  const subReddit = useSelector(selectSubRedditFilter).activeSubReddit;
  const filter = useSelector(selectFilterResults).activeFilter;
  const topFilter = useSelector(selectFilterResults).topFilter;
  const isMainLoading = useSelector(selectFilterResults).isMainLoading;
  const isAdditionalLoading = useSelector(selectFilterResults).isAdditionalLoading;

  let header = `Showing ${filter} posts in ${subReddit}`;
  if(filter !== 'Hot' && filter !== 'New' && filter !== 'Top'){
    header = `Showing search results for: ${searchTerm}`
  }

  const handleClick = (e) => {
    const lastPostId = posts[posts.length-1].data.name;
    dispatch(fetchAdditionalPosts([filter, subReddit, topFilter, lastPostId]));
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
        {isMainLoading ? <LoadingAnim/> : 
          posts.map(post => (
          <Post key={post.data.name} data={post.data} />
        ))}
        {!isMainLoading && 
        (isAdditionalLoading ? <LoadingAnim/> : <div className="loadMore" onClick={handleClick}>Click for more...</div>)
        }
        </ul>
    );
  };
}