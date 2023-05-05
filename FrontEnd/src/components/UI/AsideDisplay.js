import React from 'react';

import WeeklyCalendar from '../Visuals/WeeklyCalendar';
import classes from "./AsideDisplay.module.css"

import svgss from '../Visuals/svgFiles';
import otherImage from "../../assets/moriarty.jpeg";

import Todo from '../Visuals/Todo';


export default function AsideDisplay(props){
    return(
        <>
            <div className = {classes.profilePanel}>
                <div className = {classes.profilePanelHeader}>
                    <div className = {classes.profilePanelText}>
                        Profile
                    </div>s
                    <div className={classes.editProfileButton}>
                        {svgss[2]}
                    </div>
                </div>
                <div className = {classes.profileDisplay}>
                    <div className={classes.profilePictureOuterEnclosure}>
                        <div className = {classes.profilePictureEnclosure}>
                            <img src = {otherImage}/>
                        </div>
                    </div>
                    <div className={classes.profileDisplayText}>
                        <span>Moriarty Prajapati </span>
                        {svgss[3]}
                    </div>
                </div>
                <WeeklyCalendar/>
                <Todo/>
            </div>
        </>  
    )
}