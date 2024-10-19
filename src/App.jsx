import React from "react";
import Quiz from "./pages/Quiz";
import Home from "./pages/Home";
import './index.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";

function App() {

  const router = createBrowserRouter([
      {
        path : "/",
        element : <Layout/>,
        children : [
          {
            path:'/',
            element: <Home/>
          },
          {
            path:'/quiz',
            element:<Quiz/>
          }
        ]
      },
       
  ])
  return (
  <>
  <RouterProvider router={router}/>
      
  </>
 
  );
}

export default App;
