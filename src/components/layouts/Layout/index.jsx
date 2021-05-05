import Navbar from '../Navbar';
import RightSideBar from '../RightSideBar';
import LoginModal from '../../common/LoginModal';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className="page">{children}</div>
    <RightSideBar />
    <LoginModal />
  </>
);

export default Layout;
