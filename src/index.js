import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const container = document.getElementById('root');

// if (container.hasChildNodes()) {
// hydrateRoot(
//   container,
//   <Provider store={store}>
//     <App />
//   </Provider>
// );
// } else {
createRoot(container).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
// }



