import React from 'react';

import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';

import classes from './Card.module.css'

export default function Card(props){
    return (
        <div className={classes.container} style = {{backgroundColor : props.bgColor}}>
            <div className={classes.imageDiv}>
                <div className ={classes.actualImageDiv}>
                    <img style = {{height: "100%", width: "100%", objectFit: "cover"}}src = {props.iconSrc} alt ="icon" ></img>
                </div>
            </div>
            <div className={classes.textDiv}>
                {props.cardTextContent}
            </div>
            <div className={classes.dataDivExternal}>
                <div className={classes.dataDivInternal}>
                    <div className={classes.iconDiv}>
                        <BsIcons.BsBook />
                        <div style={{fontSize: "0.8em", marginLeft: "15%"}}>24</div>
                    </div>
                    <div style = {{paddingLeft: "10%", paddingRight: "10%", borderLeft: "1px solid lightgrey", borderRight: "1px solid lightgrey"}}className={classes.iconDiv}>
                        <BiIcons.BiNotepad />
                        <div style={{fontSize: "0.8em", marginLeft: "15%"}}>8</div>
                    </div>
                    <div  className={classes.iconDiv}>
                        <BsIcons.BsPeople />
                        <div style={{fontSize: "0.8em", marginLeft: "15%"}}>99</div>
                    </div>
                </div>
            </div>
        </div>
    )
}