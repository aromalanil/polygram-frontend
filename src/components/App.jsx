import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';
import Navbar from './layouts/Navbar';
import { RhinoProvider } from '../global/state';
import RightSideBar from './layouts/RightSideBar';

const App = () => (
  <>
    <RhinoProvider>
      <Router>
        <Navbar />
        <div className="page">
          <Routes />
        </div>
        <RightSideBar />
      </Router>
    </RhinoProvider>
  </>
);

export default App;
