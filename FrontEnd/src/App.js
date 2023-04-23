import React, {useState} from 'react'
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";




import LandingPage from "./components/UI/LandingPage.js"
import Login from './components/Form/Login.js';
import Register from './components/Form/Register';
import Home from './components/UI/Home';
import Assignments from './components/Visuals/Assignments';
import Overview from "./components/UI/Overview";

import "./App.css"

const user =  {
  username : "weakinphysics@gmail.com",
  password : "password"
}


const router = createBrowserRouter([
  { path: "/",
    element: <LandingPage/>,
    children: [
      {path: "/", element : <Login user = {user}/>},
      {path: "/register", element : <Register/>}
    ]
  },
  {
    path: "/home",
    element: <Home/>,
    children: [
        {path: "/home/overview", element: <Overview/>},
        {path: "/home/assignments", element: <Assignments/>}
    ]
  },

]);

export default function App() {
  return (
      <RouterProvider router = {router}/>
    //<Route path="/forgot-password" component={ForgotPassword} />
  );
}

