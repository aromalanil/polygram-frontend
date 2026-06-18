import { Link } from 'react-router-dom';

import './style.scss';
import TopicsCard from './TopicsCard';
import SearchBar from '../../common/SearchBar';
import useMediaQuery from '../../../hooks/useMediaQuery';

const RightSideBar = () => {
  const isLargerDisplay = useMediaQuery('(min-width: 1150px)');

  return isLargerDisplay ? (
    <div className="right-side-bar">
      <SearchBar autoFocus={false} tab="Questions" />
      <TopicsCard />
      <div className="footer">
        &#169; {new Date().getFullYear()} Polygram &bull; A project by{' '}
        <Link to="/u/aromalanil">@aromalanil</Link>
      </div>
    </div>
  ) : null;
};

export default RightSideBar;
