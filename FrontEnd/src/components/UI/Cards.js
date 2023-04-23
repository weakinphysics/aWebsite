import React from 'react';

import classes from "./Cards.module.css";

export default function Cards(props){
    return (
        <div className = {classes.cardContainer}>
            {props.children}
        </div>
    );
}