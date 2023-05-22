import React, {useState} from 'react'

import * as AiIcons from 'react-icons/ai'

import classes from "./TimeSelector.module.css";


const hours = [];
for(let i = 0; i < 24; i++) hours.push(i);

const mins = [];
for(let i = 0; i < 59; i++) mins.push(i);



function TimeSelector() {
    
    const now = new Date();
    console.log(String(now.getHours()).padStart(2, '0'));
    const [selectedTime, setSelectedTime] = useState(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
    const [displayList, setDisplayList] = useState(0);

    const handlesHours = (e)=>{
        setSelectedTime((cur)=>{
            const straw = e.target.textContent.padStart(2, '0') + ':' + cur.slice(3, 5);
            console.log(straw);
            return straw;
        })
    }

    const handlesMinutes = (e)=>{
        console.log(e.target.textContent);
        setSelectedTime((cur)=>{
            const straw = cur.slice(0, 3)  +  e.target.textContent.padStart(2, '0');
            console.log(straw);
            return straw;
        })
    }

    return (
        <div className={classes.superContainer}>
        <div className = {classes.container}>
            <input className = {classes.timeInput} type = "time" value = {selectedTime} />
            <AiIcons.AiOutlineFieldTime className = {classes.timeIcon} onClick = {()=>{
                setDisplayList((cur)=>!cur);
            }}/>
        </div>
        {(displayList)?<div className = {classes.listContainer}>
            <div className = {classes.listHours}>
                {hours.map((item)=>{
                    return (<div className = {(Number.parseInt(selectedTime.slice(0, 2)) === item)?classes.itemDivActive: classes.itemDiv} onClick = {handlesHours}>{String(item).padStart(2, '0')}</div>);
                })}
            </div>
            <div className = {classes.listMins}>
                {mins.map((item)=>{
                    return (<div className = {(Number.parseInt(selectedTime.slice(3, 5)) === item)?classes.itemDivActive: classes.itemDiv} onClick = {handlesMinutes}>{String(item).padStart(2, '0')}</div>);
                })}
            </div>
        </div>:<></>}
        </div>
    )
}

export default TimeSelector