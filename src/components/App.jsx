import { RhinoProvider } from 'react-rhino';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';
import store from '../global/store';
import Layout from './layouts/Layout';

const App = () => (
  <>
    <RhinoProvider store={store}>
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </RhinoProvider>
  </>
);

export default App;
