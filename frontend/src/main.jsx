import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import {disableReactDevTools} from '@fvilers/disable-react-devtools';

if (import.meta.env.NODE_ENV === 'production') disableReactDevTools(); 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <Provider store={store}>
    {/* <RouterProvider router={router} /> */}
      <App />
  </Provider>,
  </React.StrictMode> 
  
);
