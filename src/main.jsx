import React from 'react';
import ReactDOM from 'react-dom/client';

//Importing .jsx -components.
import App from './App.jsx';
import Home from './components/home.jsx';
import Customer from './components/customer.jsx';
import Training from './components/training.jsx';


//Importing Router components.
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//import './index.css'
const router = createBrowserRouter([
  {
    path: "/jansson_Personal_Trainer",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "customer",
        element: <Customer />
      },
      {
        path: "training",
        element: <Training />
      }

    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
