import React from "react";
import classes from "./Reports.module.css";

import svgss from '../Visuals/svgFiles';

import otherImage from "../../assets/atom.png"
import myImage from "../../assets/quickMath.png"


export default function Reports(props){
    return (<div className={classes.container}>
        <div className = {classes.tableTitle}>
            <h2>Subject Wise Performance Analysis</h2>
        </div>
        <div className = {classes.tableEnclosure}>
            <table className = {classes.tableTable}>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th><div style = {{marginLeft: "10%"}}>NAME</div></th>
                        <th>Course ID</th>
                        <th>Hours</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><div style = {{display:"flex", justifyContent: "flex-start", alignItems: "center"}}><span style ={{marginLeft: "10%"}}>1</span></div></td>
                        <td>
                            <div className = {classes.nameDiv}>
                                <div className = {classes.nameImage}>
                                    <img src = {myImage} />
                                </div>
                                <div className = {classes.nameText}>
                                    Physics
                                </div>

                            </div>
                        </td>
                        <td>502</td>
                        <td>131</td>
                        <td style = {{color: "#3BAFA8"}}>24</td>
                    </tr>
                    <tr>
                        <td><div style = {{display:"flex", justifyContent: "flex-start", alignItems: "center"}}><span style ={{marginLeft: "10%"}}>2</span> </div></td>
                        <td>
                            <div className = {classes.nameDiv}>
                                    <div className = {classes.nameImage}>
                                        <img src = {otherImage} />
                                    </div>
                                    <div className = {classes.nameText}>
                                        Math
                                    </div>
                            </div>
                        </td>
                        <td>501</td>
                        <td>1</td>
                        <td style = {{color: "#3BAFA8"}}>21</td>
                    </tr>
                </tbody>
                
            </table>
        </div>
    </div>);
}


