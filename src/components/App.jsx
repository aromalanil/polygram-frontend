import Routes from './Routes';
import Navbar from './layouts/Navbar';
import { RhinoProvider } from '../global/state';
import RightSideBar from './layouts/RightSideBar';

const App = () => (
  <>
    <RhinoProvider>
      <div className="app">
        <Navbar />
        <div className="page">
          <Routes />
        </div>
        <RightSideBar />
      </div>
    </RhinoProvider>
  </>
);

export default App;
