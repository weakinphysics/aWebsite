import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import classes from "./Sidebar.module.css";
import sidebarContext from '../contexts/sidebarContext';



export default function Sidebar(props){
    const navigate = useNavigate();
    const ctx = useContext(sidebarContext);
    const scheme1 = {
        backgroundColor: "black",
        color: "white"
    }
    const scheme2 = {
        backgroundColor: "transparent",
        color: "black"
    }
    
    const settingFunction = (e)=>{
        console.log(e.target.closest("li").id);
        ctx.settingFunction(e.target.closest("li").id);
    }

    const initiateLogout = ()=>{
        localStorage.removeItem("tokenRecvd");
        navigate('/');
    }
    return (
        <div className = {classes.sidebarContainer}>
            <div className = {classes.logo}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.6941 0.883651C18.143 0.605057 17.4922 0.605058 16.9411 0.883651L0.331451 9.27973L17.8176 18.1189L35.3037 9.27973L18.6941 0.883651Z" fill="#F9A682"/>
                    <path d="M0.331451 9.27973V26.0992C0.331451 26.857 0.772087 27.5457 1.46017 27.8633L17.8176 35.4128V18.1189L0.331451 9.27973Z" fill="#BAE3E2"/>
                    <path d="M17.8176 18.1189V35.4128L34.175 27.8633C34.8631 27.5457 35.3037 26.857 35.3037 26.0992V9.27973L17.8176 18.1189Z" fill="#30B3AB"/>
                </svg>
                <span className = {classes.logotext}>
                    Learninja<span style ={{color: "darkorange", fontSize: "1.5em"}}>.</span>
                </span>
            </div>
            <ul className={classes.menuItems}>
                {
                    props.menuData.map((item, index)=>{
                        return(
                                <li key = {index} id = {index} className={classes.menuItem} onClick = {settingFunction}>
                                    <Link to = {item.path}>
                                        <div style = {ctx.activeElements[index]?scheme1:scheme2} className={classes.menuItemText} onClick = {(item.title === "Logout")?initiateLogout:()=>{}}>
                                            {item.icon}<span>{item.title}</span>
                                        </div >
                                    </Link>
                                </li>
                        )
                    })
                }
            </ul>
            
        </div>
    )
}