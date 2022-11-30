import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SubLink } from "../subLink/SubLink";
import { HomeButton } from "../subLink/HomeButton";
import { selectSubRedditFilter, fetchSubRedditInfo } from "../../features/subRedditFilter/subRedditFilterSlice";
import './subRedditsList.css';
import { setActiveSubReddit } from "../../features/subRedditFilter/subRedditFilterSlice";
import { setActiveFilter } from "../../features/postFilter/postFilterSlice";
import { SubRedditSearch } from "../../features/subRedditFilter/subRedditSearch/SubRedditSearch";
import { SubRedditInfo } from "../../features/subRedditFilter/subRedditInfo/SubRedditInfo";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

export const SubReddits = () => {
  const isSmallScreen = useMediaQuery({query: '(max-width: 750px)'})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subReddits = useSelector(selectSubRedditFilter).savedSubReddits;
  const activeSubReddit = useSelector(selectSubRedditFilter).activeSubReddit;

  useEffect(() => {
    if(activeSubReddit !== 'r/All'){
      dispatch(fetchSubRedditInfo(activeSubReddit))
    };
  }, [activeSubReddit]);

  const handleClick = (e) => {
    dispatch(setActiveSubReddit(e.target.value));
    dispatch(setActiveFilter('Hot'));
    navigate('/');
  }

  if(subReddits.length){
    return (
      <>
      {isSmallScreen ? (
      <ul className="smallNav">
        {/* <select onChange={handleClick}>
          <option>r/All</option>
          {subReddits.map(sub => <option key={sub.id}>{sub.name}</option>)}
        </select> */}
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