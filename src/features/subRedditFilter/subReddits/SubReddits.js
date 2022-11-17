import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SubLink } from "../../../components/subLink/SubLink";
import { HomeButton } from "../../../components/subLink/HomeButton";
import { selectSubRedditFilter, fetchSubRedditInfo } from "../subRedditFilterSlice";
import './subReddits.css';
import { SubRedditSearch } from "../subRedditSearch/SubRedditSearch";
import { SubRedditInfo } from "../subRedditInfo/SubRedditInfo";

export const SubReddits = () => {
  const dispatch = useDispatch();
  const subReddits = useSelector(selectSubRedditFilter).savedSubReddits;
  const activeSubReddit = useSelector(selectSubRedditFilter).activeSubReddit;

  useEffect(() => {
    if(activeSubReddit !== 'r/All'){
      dispatch(fetchSubRedditInfo(activeSubReddit))
    };
  }, [activeSubReddit]);

  if(subReddits.length){
    return (
      <ul className="subRedditList">
        <HomeButton data={{display_name_prefixed: 'r/All'}} />
        <SubRedditInfo />
        <SubRedditSearch/>
        <h2>Saved SubReddits</h2>
        {subReddits.map(sub => (
        <SubLink key={sub.id} data={sub} />
      ))}
      </ul>
    );
  }
}