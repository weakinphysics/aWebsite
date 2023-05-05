import React, {useState} from 'react'
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";




import LandingPage from "./components/UI/LandingPage.js"
import Login from './components/Form/Login.js';
import Register from './components/Form/Register';
import Home from './components/UI/Home';
import Assignments from './components/Visuals/Assignments';
import Overview from "./components/UI/Overview";
import Reports from "./components/UI/Reports";
import Settings from "./components/UI/Settings";
import Inbox from "./components/UI/Inbox";
import FileStorage from "./components/UI/FileStorage";

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
        {path: "/home/assignments", element: <Assignments/>},
        {path: "/home/reports", element: <Reports/>},
        {path: "/home/inbox", element: <Inbox/>},
        {path: "/home/settings", element: <Settings/>},
        {path: "/home/FileStorage", element: <FileStorage/>}
    ]
  },

]);

export default function App() {
  return (
      <RouterProvider router = {router}/>
    //<Route path="/forgot-password" component={ForgotPassword} />
  );
}

