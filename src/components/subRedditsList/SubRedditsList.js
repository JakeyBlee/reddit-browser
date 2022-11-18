import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SubLink } from "../subLink/SubLink";
import { HomeButton } from "../subLink/HomeButton";
import { selectSubRedditFilter, fetchSubRedditInfo } from "../../features/subRedditFilter/subRedditFilterSlice";
import './subRedditsList.css';
import { SubRedditSearch } from "../../features/subRedditFilter/subRedditSearch/SubRedditSearch";
import { SubRedditInfo } from "../../features/subRedditFilter/subRedditInfo/SubRedditInfo";
import { useMediaQuery } from 'react-responsive';

export const SubReddits = () => {
  const isSmallScreen = useMediaQuery({query: '(max-width: 750px)'})
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
      <>
      {isSmallScreen ? (
      <ul className="smallNav">
        <HomeButton data={{display_name_prefixed: 'r/All'}} />
        <SubRedditSearch/>
      </ul>
      ) : (
      <ul className="subRedditList">
        <HomeButton data={{display_name_prefixed: 'r/All'}} />
        <SubRedditInfo />
        <SubRedditSearch/>
        <h2>Saved SubReddits</h2>
        {subReddits.map(sub => (
        <SubLink key={sub.id} data={sub} />
      ))}
      </ul>
      )}
      </>
    );
  }
}