import { Children, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router >
      <App/>
      </Router>
    </Provider>
  </StrictMode>,
);
