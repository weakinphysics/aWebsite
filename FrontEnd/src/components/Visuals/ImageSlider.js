import React,{useState, useEffect} from "react";
import { imageData } from "./Constants";
import classes from "./ImageSlider.module.css"

/*
function theOtherSlider(props){
    const [current, setCurrent] = useState(0);
    const images = [];
    for(let [key, val] of Object.entries(imageData)){
        images.unshift(val);
    }
    console.log(images);
    React.useEffect(() => {
    const next = (current + 1) % slides.length;
    const id = setTimeout(() => setCurrent(next), time);
    return () => clearTimeout(id);
    }, [current]);
    const initialCarouselState = {
    offset: 0,  
    desired: 0,
    active: 0
};
}
*/
const images = [];
for(let [key, val] of Object.entries(imageData)){
    images.unshift(val);
}
let n = images.length;
export default function ImageSlider(props){
    const [slumber, setSlumber] = useState(0);
    useEffect(()=>{
        const theTimeout = setTimeout(()=>{ 
            console.log("incrementing slumber");
            setSlumber((prevState)=>{
                return prevState + 1;
            })
        }, 7000);
    }, [slumber]);

    return(
        <div className = {classes.imageSlider}>
            <img src = {images[slumber%n]} className = {classes["actual"]} alt="test"/>
        </div>  
    );
}

