import React, {useState} from 'react'
import { NavLink, Outlet } from "react-router-dom";
import classes from "./LandingPage.module.css";
import ImageSlider from '../Visuals/ImageSlider.js';




export default function LandingPage() {
  
  return (
      <>
        <div className={classes.App}>
          <div className={classes.appAside}>
            <ImageSlider/>
          </div>
          <div className={classes["appForm"]}>
            
            <Outlet/>
            <footer> Brought to you by your friendly neighborhood Ishaan</footer>
          </div>
        </div>
      </>
    //<Route path="/forgot-password" component={ForgotPassword} />
  );
}
