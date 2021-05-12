import Navbar from '../Navbar';
import RightSideBar from '../RightSideBar';
import Snackbar from '../../common/Snackbar';
import LoginModal from '../../common/LoginModal';
import useUserData from '../../../hooks/useUserData';
import OfflineBanner from '../../common/OfflineBanner';
import useIsUserLoggedIn from '../../../hooks/useIsUserLoggedIn';

const Layout = ({ children }) => (
  <>
    <GlobalDataFetch />
    <OfflineBanner />
    <Navbar />
    <div className="page">{children}</div>
    <RightSideBar />
    <LoginModal />
    <Snackbar />
  </>
);

const GlobalDataFetch = () => {
  useUserData();
  useIsUserLoggedIn();
  return <></>;
};

export default Layout;
