import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';
import Layout from './layouts/Layout';
import { RhinoProvider } from '../global/state';

const App = () => (
  <>
    <RhinoProvider>
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </RhinoProvider>
  </>
);

export default App;
