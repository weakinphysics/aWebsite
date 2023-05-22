import React, { useState, useEffect } from "react";

import svgss from './svgFiles';

import classes from "./WeeklyCalendar.module.css"

export default function WeeklyCalendar(props){
  const aajKaDin = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["S","M", "T", "W", "T", "F", "S"];
  const [snapshot, setSnapshot] = useState(new Date());

  const [currWeek , setCurrWeek] = useState([{
    actualDate: snapshot,
    day: "M",
    isActive: "no",
    theDate : 15
  },
  {
    day: "M",
    isActive: "no",
    theDate : 15
  },
  {
    day: "M",
    isActive: "no",
    theDate : 15
  },
  {
    day: "M",
    isActive: "no",
    theDate : 15
  },
  {
    day: "M",
    isActive: "no",
    theDate : 15
  }]);
  const goBackInTime = (e)=>{
    setSnapshot((ss)=>{
      const ans = new Date(currWeek[0].actualDate.getTime() - 86400000*7);
      return ans;
    })
  }

  const goForwardInTime = (e)=>{
    setSnapshot((ss)=>{
      const ans = new Date(currWeek[0].actualDate.getTime() + 86400000*7);
      return ans;
    })
  }
  useEffect(() => {
    const today = snapshot.getDay();
    setCurrWeek((theWeek)=>{
        let temp = 0;
        let ea = [];
        const margo = {
          cl: (snapshot.getDate() === aajKaDin.getDate())?"activeCombo":"inactiveCombo",
          day: dayNames[today],
          theDate: snapshot.getDate(),
          datCl: (snapshot.getDate() === aajKaDin.getDate())?"activeDate":"inactiveDate"
        }
        if(snapshot.getDay() === 0) margo.actualDate = snapshot;
        ea.push(margo); 
        while(temp < today){
          const oneLove = new Date(snapshot.getTime() - (temp + 1)*86400000);
          console.log(oneLove.getDay());
          const cargo = {
            cl: (oneLove.getDate() === aajKaDin.getDate())?"activeCombo":"inactiveCombo",
            day: dayNames[oneLove.getDay()],
            theDate: oneLove.getDate(),
            datCl: (oneLove.getDate() === aajKaDin.getDate())?"activeDate":"inactiveDate"
          };
          if(oneLove.getDay() === 0) cargo.actualDate = oneLove;
          ea.unshift(cargo)
          temp++;
        }

        temp = today + 1;
        while(temp < 7){
          const postDate = new Date(snapshot.getTime() + (temp - today)*86400000);
          ea.push({
            cl: (postDate.getDate() === aajKaDin.getDate())?"activeCombo":"inactiveCombo",
            day: dayNames[postDate.getDay()],
            theDate: postDate.getDate(),
            datCl: (postDate.getDate() === aajKaDin.getDate())?"activeDate":"inactiveDate"
          })
          temp++;
        }
        return ea;  
    });
    }, [snapshot])
  

  return (
    <div className = {classes.container}>
      <div className = {classes.month}>
        <div className = {classes.arrowDiv} onClick = {goBackInTime} >{svgss[6]}</div>
        {months[snapshot.getMonth()]}, {snapshot.getFullYear()}  
        <div className = {classes.arrowDiv} onClick = {goForwardInTime} >{svgss[5]}</div>
      </div>
      <div className = {classes.week}>
          {currWeek.map((item)=>{
            return(
              <div className = {classes[item.cl]}>
                <div className = {classes.dayClass}>
                  {item.day}
                </div>
                <div className = {classes[item.datCl]}>
                  {item.theDate}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}