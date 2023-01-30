import moment from 'moment';
import 'moment/locale/es'; // without this line it didn't work
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './Redux/store';
import './Styles/MainSidebar.css';
import './Styles/styles.css';
moment.locale('es')

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <HashRouter basename={GlobalConfig.basename || '/'} > */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </HashRouter> */}
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);
