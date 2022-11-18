import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectPostPage } from "../../features/postPage/postPageSlice";
import { LoadingAnim } from "../loadingAnim/LoadingAnim";
import { MainPost } from "../mainPost/mainPost";
import { Comment } from "../comment/Comment";
import './resultsSection.css'
import { useEffect } from "react";

export const PostPage = () => {
  const isLoading = useSelector(selectPostPage).isLoading;
  const post = useSelector(selectPostPage).postData;
  const comments = useSelector(selectPostPage).commentData;
  const navigate = useNavigate();

  useEffect(()=>{
    if(!Object.keys(post).length && !isLoading){
    navigate('/');  
    };
  }, [])

  return (
    <div className="postPage">
      {isLoading ? <LoadingAnim/> : <MainPost />}
      {comments.length && !isLoading ? comments.map(comment => (
        <Comment key={comment.data.id} data={comment.data} class='mainComment'/> )) : ''
      }
    </div>
  );
}