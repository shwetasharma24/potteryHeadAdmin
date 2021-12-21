import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {store, persistor} from "./adminRedux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { userRequest } from "../src/axios/requestMethods";

userRequest.interceptors.request.use(function (config) {
        const token = store.getState().user.currentUser.accessToken;
        config.headers.Token =  token ? `Bearer ${token}` : '';
        return config;
      });

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
