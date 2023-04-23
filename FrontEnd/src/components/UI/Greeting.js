import React from 'react';

import * as VscIcons from 'react-icons/vsc';
import * as BiIcons from 'react-icons/bi';

import classes from "./Greeting.module.css";

export default function Greeting(props){
    return (
        <div className = {classes.greetAndSearch}>
            <div className = {classes.greeting}>
                <span style = {{fontSize: "1.5em", marginBottom: "5%"}}>
                    Hello Moriarty 👋
                </span>
                <span style={{fontSize: "1em", color: "grey"}}>
                    Let's learn something new today!
                </span>
            </div>
            <div className= {classes.searchEnclosure}>
                <div className = {classes.searchBar}>
                    <input className = {classes.searchInput} type = "text" placeholder='search'/>
                    <BiIcons.BiSearch className={classes.searchIcon}/>
                </div>
                <div className = {classes.notificationIcon}>
                    <VscIcons.VscBellDot/>
                </div>
            </div>
        </div>
    );
}