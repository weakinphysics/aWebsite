import React from 'react';

import classes from "./Leaderboard.module.css";

import svgss from './svgFiles';

import otherImage from "../../assets/download.jpeg"
import myImage from "../../assets/image.jpeg"

export default function Leaderboard(props){
    return(
        <div className={classes.container}>
            <div className = {classes.tableTitle}>
                <h2>Leader Board</h2>
            </div>
            <div className = {classes.tableEnclosure}>
                <table className = {classes.tableTable}>
                    <thead>
                        <tr>
                            <th>RANK</th>
                            <th><div style = {{marginLeft: "10%"}}>NAME</div></th>
                            <th>COURSE</th>
                            <th>HOURS</th>
                            <th>POINTS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><div style = {{display:"flex", justifyContent: "flex-start", alignItems: "center"}}><span style ={{marginRight: "10%"}}>1</span> {svgss[0]}</div></td>
                            <td>
                                <div className = {classes.nameDiv}>
                                    <div className = {classes.nameImage}>
                                        <img src = {myImage} />
                                    </div>
                                    <div className = {classes.nameText}>
                                        Ishaan Chandra
                                    </div>

                                </div>
                            </td>
                            <td>502</td>
                            <td>131</td>
                            <td style = {{color: "#3BAFA8"}}>122</td>
                        </tr>
                        <tr>
                            <td><div style = {{display:"flex", justifyContent: "flex-start", alignItems: "center"}}><span style ={{marginRight: "10%"}}>2</span> {svgss[1]}</div></td>
                            <td>
                                <div className = {classes.nameDiv}>
                                        <div className = {classes.nameImage}>
                                            <img src = {otherImage} />
                                        </div>
                                        <div className = {classes.nameText}>
                                            Lakshay
                                        </div>
                                </div>
                            </td>
                            <td>502</td>
                            <td>1</td>
                            <td style = {{color: "#3BAFA8"}}>121</td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
        </div>
    )
}