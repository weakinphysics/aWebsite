import React from 'react';

import classes from "./AsideDisplay.module.css"

import svgss from '../Visuals/svgFiles';
import otherImage from "../../assets/moriarty.jpeg";


export default function AsideDisplay(props){
    return(
        <>
            <div className = {classes.profilePanel}>
                <div className = {classes.profilePanelHeader}>
                    <div className = {classes.profilePanelText}>
                        Profile
                    </div>
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
            </div>
        </>  
    )
}