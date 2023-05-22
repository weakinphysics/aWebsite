import React, {useRef, useState, useEffect} from 'react'
import * as d3 from "d3";


function StorageGraph(props) {
    const pieChartRef = useRef();
    const [storageData, setStorageData] = useState([0, 0, 0]);
    const [first, setF] = useState(true);
    useEffect(()=>{
        if(first){
            setTimeout(()=>{
                let a = Math.random();
                setStorageData([a, (1-a)*0.5, (1-a)*0.5]);
            
            }, 100);
            setF(false);
        }
    const myData = props.data;
    const pieChart = d3.select(pieChartRef.current);
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(120);
    const pieGenerator = d3.pie().sort(null);
    const instructions = pieGenerator(storageData);

    const colors = ["lightblue", "royalblue", "darkblue"];

    pieChart.selectAll(".slice")
    .data(instructions)
    .join("path")
    .classed("slice", true)
    .attr("stroke", "white")
    .attr("fill", (item, index)=>{
        return colors[index];
    })
    .style("transform", `translate(150px, 200px)`)
    .transition()
    .attrTween("d", function(instruction){
        let interpolator;
        if(this.prevInstruction == undefined)  interpolator = d3.interpolate(0, instruction);
        else interpolator = d3.interpolate(this.prevInstruction, instruction);
        this.prevInstruction = interpolator(1);
        return (frame)=>{
            return arcGenerator(interpolator(frame));
        };
    })

    }, [storageData]);

    

    return (
        <div>
            <svg style = {{width: "300px", height: "350px"}}ref = {pieChartRef}>
            </svg>
        </div>
    )
}

export default StorageGraph