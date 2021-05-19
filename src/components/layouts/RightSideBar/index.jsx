import './style.scss';
import TopicsCard from './TopicsCard';
import SearchBar from '../../common/SearchBar';

const RightSideBar = () => (
  <div className="right-side-bar">
    <SearchBar autoFocus={false} />
    <TopicsCard />
    <div className="footer">
      &#169; {new Date().getFullYear()} Poly &bull; Final year Project, College Of Engineering
      Cherthala
    </div>
  </div>
);

export default RightSideBar;
