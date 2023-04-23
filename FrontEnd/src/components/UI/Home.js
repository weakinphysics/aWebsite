import React, {useEffect, useState} from 'react';
import {Outlet, useNavigate} from  'react-router-dom';
import classes from "./Home.module.css";
import Sidebar from "./Sidebar";
import sidebarContext from '../contexts/sidebarContext';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as FiIcons from 'react-icons/fi';
import * as BsIcons from 'react-icons/bs';


const menuData = [
    {
        title: "Overview",
        path: "/home/overview",
        icon: <BsIcons.BsGrid />,
    },
    {
        title: "Assignments",
        path: "/home/assignments",
        icon: <MdIcons.MdAssignment  />,
    },
    {
        title: "Reports",
        path: "/home/reports",
        icon: <AiIcons.AiOutlinePieChart />,
    },
    {
        title: "File Storage",
        path: "/home/filestorage",
        icon: <AiIcons.AiOutlineFileAdd />,
    },
    {
        title: "Inbox",
        path: "/home/inbox",
        icon: <FaIcons.FaEnvelopeOpenText />,
    },
    {
        title: "Settings",
        path: "/home/settings",
        icon: <FiIcons.FiSettings />,
    }
];


const Home = ()=>{
    const myList = menuData.map((item)=>false);
    myList.unshift(true);
    myList.pop();
    const [activeElements, setActiveElements] = useState(myList);
    const navigate = useNavigate();
    const myUserToken = localStorage.getItem("tokenRecvd");
    useEffect(()=>{
        if(!myUserToken) {
            navigate("/");
            return ()=>{}
        }
    }, []);

    const settingFunction = (index)=>{
        let mylist = menuData.map((item)=>false);
        mylist[index] = true;
        setActiveElements(mylist);
    }

    return (
        <div className = {classes.mainWindow}>
            <sidebarContext.Provider value = {{
                activeElements: activeElements,
                settingFunction: settingFunction
            }}>
                <div className={classes.sideBarWindow}><Sidebar menuData = {menuData}/></div>
                <div className={classes.sideWindow}>
                    <Outlet/>
                </div>
            </sidebarContext.Provider>
        </div>
    );
}



export default Home;