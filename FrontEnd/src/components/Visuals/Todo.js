import React, {useState, useEffect} from 'react';

import classes from "./Todo.module.css";

import {Checkbox} from '@mui/material'

const currentTodo = [
    {
        data: "Developing Restaurant Apps",
        description: "Programming",
        deadline: "08:00 AM"
    },
    {
        data : "Research Objective User",
        description: "Product Design",
        deadline: "02:40 PM"
    },
    {
        data: "Report Analysis B2B Business",
        description: "Business",
        deadline: "04:50 PM"
    }
]

export default function Todo(props){
    const [stateList, setStateList] = useState(currentTodo.map((item)=>false));

    return (
        <div className = {classes.container}>
            <ul className= { classes.list}>
                {currentTodo.map((item)=>{
                    return (
                        <li className =  {classes.listItemOuter} style ={{display: "flex"}}>
                            <Checkbox
                                defaultChecked="false"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <div className={classes.listItem}>
                                <h4>{item.data}</h4>
                                <div className = {classes.description}>
                                    {item.description}
                                    <div className = {classes.deadline} >{item.deadline}</div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}