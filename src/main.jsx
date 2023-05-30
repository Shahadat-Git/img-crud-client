import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import Update from './components/Update';
import { Toaster } from 'react-hot-toast';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home>s</Home>,
  },
  {
    path: '/item/:id',
    element: <Update></Update>,
    // loader: ({ params }) => fetch(`http://localhost:5000/item/${params.id}`)
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      reverseOrder={false}
    ></Toaster>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
