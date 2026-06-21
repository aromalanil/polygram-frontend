import { BrowserRouter as Router } from 'react-router-dom';
import { RhinoProvider } from '#store';

import Routes from './Routes';
import Layout from './layouts/Layout';

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
