import React from 'react'
import classes from './DisplayItem.module.css'

import svgss from './svgFiles'

function DisplayItem(props) {

  return (
    <div className = {classes.container}>
        <div className = {classes.title}>
            {props.itemName}
        </div>
        {(props.fileType === "image") && <div className = {classes.displayContent}>
            <img src = {props.fileUrl}></img>
        </div>}
        {(props.fileType !== "image") && <div className = {classes.displayContent}>
            {svgss[4]}
        </div>}
    </div>
  )
}

export default DisplayItem