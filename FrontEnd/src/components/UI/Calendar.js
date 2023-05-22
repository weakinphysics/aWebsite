import React, {useState, useEffect, useRef} from 'react'
import * as IoIcons from 'react-icons/io'
import * as BsIcons from "react-icons/bs"

import classes from './Calendar.module.css'
import YearSelector from "./YearSelector"



const minYear = 1900;
const maxYear = 2099;

const yearList = [];

for(let i = minYear; i <= maxYear; i++) yearList.push(i);

function Calendar(props){

    const badPractice = useRef();


    const aajKaDin = new Date();
    const defaultYear = aajKaDin.getFullYear();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["S","M", "T", "W", "T", "F", "S"];
    const checksIfToday = (day)=>{
        return (day.getDate() === aajKaDin.getDate() && day.getMonth() === aajKaDin.getMonth() && day.getFullYear() === aajKaDin.getFullYear());
    }

    const [renderedMonth, setRenderedMonth] = useState([]);
    const [displayState, setDisplayState] = useState(1);
    const [superDisplayState, setSuperDisplayState] = useState(0);
    const [theDate, setTheDate] = useState(new Date(aajKaDin));

    const handlesYearChange = (here)=>{
        setDisplayState(1);
        setTheDate((cur)=>{
            return new Date(`${here}-01-01`)
        });
    }

    const handlesYearSelector = ()=>{
        setDisplayState((cur)=>!cur);
    }

    const handlesMonthIncrement = ()=>{
        setTheDate((cur)=>{
            return new Date(`${(cur.getFullYear()) + (cur.getMonth() === 11)}-${(cur.getMonth() === 11)?1:(cur.getMonth() + 2)}-01`);
        });
    }
    const handlesMonthDecrement = ()=>{
        setTheDate((cur)=>{
            return new Date(`${(cur.getFullYear() - (cur.getMonth() === 0)) }-${(cur.getMonth() === 0)?11:cur.getMonth()}-01`);
        });
    }

    
    useEffect(()=>{
        setRenderedMonth((prev)=>{
            const renderThis = [];
            const thisDay = new Date(`${theDate.getFullYear()}-${theDate.getMonth() + 1}-${1}`);
            let gap = thisDay.getDay();
            while(gap){
                renderThis.push(new Date(thisDay.getTime() - (86400000)*gap));
                gap--;
            }
            let k =  renderThis.length;
            const k_f = k;
            while(k <= 42){
                renderThis.push(new Date(thisDay.getTime() + (k - k_f)*86400000))
                k++;
            }
            const actualArray = [];
            for(let i = 0; i < 6; i++){
                actualArray.push(renderThis.slice(7*i, 7*(i+1)));
            }                   
            return actualArray;
        })
    }, [theDate]);




    const handlesSelection = (e)=>{
        setTheDate((curr)=>{
            const x =  new Date(`${theDate.getFullYear()}-${theDate.getMonth()+1}-${Number.parseInt(e.target.textContent)}`);
            badPractice.current.value = `${String(x.getDate()).padStart(2, '0')}-${String(x.getMonth()+1).padStart(2, '0    ')}-${x.getFullYear()}`;
            props.handlesDate(x);
            return x;
        });
        
    }

    const isTheDate = (x)=>{
        if(x.getDate() === theDate.getDate() && x.getMonth() === theDate.getMonth() && x.getFullYear() === theDate.getFullYear()) return true;
        return false;
    }



    const handlesInputChange = (e)=>{
        setTheDate((cur)=>{
            console.log("logging");
            if(e.target.value.length === 10){
                const boat = new Date(e.target.value);
                console.log(boat);
                return boat;
            }
            return cur;
        })

    }
  return (
    <div className = {classes.superContainer}>
        <div className = {classes.inputContainer}>
            <input ref = {badPractice} className = {classes.dateInput} placeholder={`${String(theDate.getDate()).padStart(2, '0')}-${String(theDate.getMonth()+1).padStart(2, '0')}-${theDate.getFullYear()}`} type="text" onChange = {handlesInputChange} onClick = {()=>{
                setSuperDisplayState((cur)=>0);
            }}/>
            <BsIcons.BsCalendar className = {classes.calendarIcon} onClick = {()=>{
                setSuperDisplayState((cur)=>!cur);
            }}/>
        </div>
        {(superDisplayState)?<div className = {classes.container}>
            <div className = {classes.controlBar}> 
                <div className = {classes.buttonsOnleft}>
                    <div className = {classes.monthAndYear}>
                    {months[theDate.getMonth()]} {theDate.getFullYear()}
                    </div> 
                    <div className = {classes.yearDropDown}>
                        <IoIcons.IoMdArrowDropdown onClick = {handlesYearSelector} />
                    </div>
                </div>
                <div className = {classes.arrowButtons}>
                    <IoIcons.IoIosArrowBack className = {classes.arrowButton} onClick = {handlesMonthDecrement}/> <IoIcons.IoIosArrowForward className = {classes.arrowButton} onClick = {handlesMonthIncrement}/>
                </div>
            </div>
            {(displayState)?<div className={classes.actualCalendar}>
                <div className={classes.calendarRow}>
                    {dayNames.map((item)=>{
                        return <div className = {classes.calendarCellHeader}>
                            {item}
                        </div>
                    })}
                </div>
                {
                    renderedMonth.map((item)=>{
                        return (<div className = {classes.calendarRow}>
                            {item.map((it)=>{
                                if(it.getMonth() === theDate.getMonth()) return (<div style = {{border: (checksIfToday(it))?"1px solid grey": "none", background: (isTheDate(it))?"royalblue": "", color: (isTheDate(it))?"white":""}} className = {classes.calendarCell} onClick = {handlesSelection}>
                                    {it.getDate()}
                                </div>)
                                else return <div className = {classes.calendarCellDead}>11</div>
                            })}
                        </div>)
                    })
                }
            </div>: <YearSelector yearChangeHandler = {handlesYearChange} currentYear = {theDate.getFullYear()}/>}
        </div>: <></>}
    </div>
  )
}

export default Calendar