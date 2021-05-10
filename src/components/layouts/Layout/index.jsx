import Navbar from '../Navbar';
import RightSideBar from '../RightSideBar';
import LoginModal from '../../common/LoginModal';
import OfflineBanner from '../../common/OfflineBanner';
import useUserDetails from '../../../hooks/useUserDetails';

const Layout = ({ children }) => {
  useUserDetails();

  return (
    <>
      <OfflineBanner />
      <Navbar />
      <div className="page">{children}</div>
      <RightSideBar />
      <LoginModal />
    </>
  );
};

export default Layout;
