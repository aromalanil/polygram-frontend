import Navbar from '../Navbar';
import RightSideBar from '../RightSideBar';
import LoginModal from '../../common/LoginModal';
import OfflineBanner from '../../common/OfflineBanner';

const Layout = ({ children }) => (
  <>
    <OfflineBanner />
    <Navbar />
    <div className="page">{children}</div>
    <RightSideBar />
    <LoginModal />
  </>
);

export default Layout;
