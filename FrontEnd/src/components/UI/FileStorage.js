import React from 'react';
import classes from './FileStorage.module.css';

import DisplayItem from '../Visuals/DisplayItem';
import StorageGraph from './StorageGraph';

import image1 from "../../assets/got.jpg";
import image2 from "../../assets/sherlock.jpg";
import image3 from "../../assets/moriarty.jpeg";
import image4 from "../../assets/walter.jpg"

const files = [
  {
      type: "image",
      data: image1,
  },
  {
      type: "image",
      data: image1,
  },
  {
      type: "image",
      data: image1,
  },
  {
      type: "image",
      data: image1,
  },
  {
      type: "textFile",
      data: "SagradaFamilia.pdf",
  }

];

const recents = [
  {
    type: "image",
    label: "A picture",
    data: image1,
},
{
    type: "image",
    label: "Another picture",
    data: image2,
},
{
    type: "image",
    label: "testing.jpeg",
    data: image3,
},
{
    type: "image",
    label: "witch",
    data: image4,
},
{
    type: "textFile",
    label: "SagradaFamilia.pdf",
    data: null
}
];



function FileStorage() {
  return (
    <div className = {classes.container}>
      <div className = {classes.mainData}>
        <div className = {classes.pageOptions}>
          <div className = {classes.btn}>
              New File Upload
          </div>
          <div className = {classes.btn}>
              New Folder Upload
          </div>
          <div className = {classes.btn}>
              Shared With Me
          </div>
          <div className = {classes.btn}>
              My Course Work
          </div>
        </div>
        <div className = {classes.recents}>
          <div style = {{marginLeft: "2%", fontSize: "1.2em", fontWeight: "bold"}}>Suggested</div>
          <ul className = {classes.recentsList}>
            {recents.map((item)=>{
              return <li className = {classes.listItem}>
                <DisplayItem fileType = {item.type} fileUrl = {item.data} itemName = {item.label}/>
              </li>
            })}
          </ul>
        </div>
        <div className = {classes.folders}>
        </div>
      </div>
      <div className = {classes.dataOverview}>
            <StorageGraph/>
            <ul className = {classes.legend}>
              <li>Storage used by data</li>
              <li>Storage used by system</li>
              <li>Available space</li>
            </ul>
      </div>
    </div>
  )
}

export default FileStorage;