import React from 'react'

import classes from "./Overview.module.css";

import Cards from './Cards';
import Card from '../Visuals/Card';
import Greeting from './Greeting';
import Leaderboard from '../Visuals/Leaderboard';
import AsideDisplay from './AsideDisplay';
import Graphs from '../Visuals/Graphs';
import Icon1 from "../../assets/Icon1.png";
import Icon2 from "../../assets/Icon2.png";
import Icon3 from "../../assets/Icon3.png";

export default function Overview(){
    return(
        <div className = {classes.container}>
            <div className = {classes.mainCard}>
                <Greeting/>
                <Cards>
                    <Card bgColor = "#E1E2F6" cardTextContent = "Basic: HTML and CSS" iconSrc = {Icon1}/>
                    <Card bgColor = "#F8EFE2" cardTextContent = "Branding Design" iconSrc = {Icon2}/>
                    <Card bgColor = "#EFF7E2" cardTextContent = "Motion Design" iconSrc = {Icon3}/>
                </Cards>
                <Graphs/>
                <Leaderboard/>
            </div>
            <div className={classes.sideCard}>
                <AsideDisplay/>
            </div>
        </div>
    )
}