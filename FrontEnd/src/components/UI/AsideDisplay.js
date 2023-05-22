import React, {useState} from 'react';

import WeeklyCalendar from '../Visuals/WeeklyCalendar';
import classes from "./AsideDisplay.module.css"

import svgss from '../Visuals/svgFiles';
import otherImage from "../../assets/moriarty.jpeg";

import Todo from '../Visuals/Todo';


export default function AsideDisplay(props){

    const [file, setFile] = useState(otherImage);
    const handleProfileChange = (e) => {
        setFile(URL?.createObjectURL(e.target.files[0]));
    };
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
                    <div className={classes.icon_container}>
                        <label for="files">
                            <div
                            className={classes.profile_pic}
                            style={{ backgroundImage: `url(${file || svgss[0]})` }}
                            >
                            <span>Change Image</span>
                            </div>
                        </label>
                        <input
                            className={classes.uploadImg}
                            id="files"
                            type="file"
                            accept="image/*"
                            multiple="false"
                            style={{ visibility: "hidden" }}
                            onChange={handleProfileChange}
                        />
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