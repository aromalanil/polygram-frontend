import './style.scss';
import TopicsCard from './TopicsCard';

const RightSideBar = () => (
  <div className="right-side-bar">
    <TopicsCard />
    <div className="footer">
      &#169; {new Date().getFullYear()} Poly &bull; Final year Project, College Of Engineering
      Cherthala
    </div>
  </div>
);

export default RightSideBar;
