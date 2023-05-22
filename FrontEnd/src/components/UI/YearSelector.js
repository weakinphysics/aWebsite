import React from 'react'

import classes from './YearSelector.module.css'

const yearList = [];
for(let i = 1990; i < 2100; i++) yearList.push(i);

const yearList3eed = [];
for(let i = 0; i < 37; i++) yearList3eed.push(yearList.slice(3*i, 3*(i+1)));
console.log(yearList3eed);

function YearSelector(props) {
  console.log(props.currentYear);
  return (
    <div className = {classes.container}>
      {yearList3eed.map((item)=>{
        return (<div className = {classes.yearRow}>
        {
          item.map((it)=>{
            console.log((it === props.currentYear));
            return(<div className = {(it === props.currentYear)?classes.yearItemActive:classes.yearItem} onClick = {props.yearChangeHandler}>
              {it}
            </div>)
          })
        }
        </div>)
      })}
    </div>
  )


}

export default YearSelector