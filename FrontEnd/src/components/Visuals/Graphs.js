import React, {useRef, useState, useEffect} from 'react';

import classes from "./Graphs.module.css"
import * as d3 from 'd3';

import svgss from "./svgFiles"


const triangleMovement = (theta, cx, cy, rx, l)=>{
    const a = [Math.round(cx - rx*(Math.cos((Math.PI/2 - theta)))),Math.round( cy + rx*(Math.sin(Math.PI/2 - theta)))];
    const b = [Math.round(-l*(Math.cos(theta))), Math.round(l*(Math.sin(theta)))];
    const c = [Math.round(cx + rx*(Math.cos((Math.PI/2 - theta)))), Math.round(cy - rx*(Math.sin(Math.PI/2 + theta)))];
    return [a, b, c];
}

const calcAngle = (a)=>{
    const fullRange = Math.PI;
    return a*fullRange;
}

export default function Graphs(props){
    const svgRef = useRef();
    const speedoMeterRef = useRef();
    const [dimensions, setDimensions] = useState({
        height: Math.round(props.fh*0.25),
        width: Math.round(props.fw*0.3)
    });
    

    // console.log(dimensions);
    const data = [
        {
            month: "Jan", study: 32, exams: 36
        },
        {
            month: "Feb", study: 12, exams: 13
        },
        {
            month: "Mar", study: 5, exams: 70
        },
        {
            month: "Apr", study: 12, exams: 34
        },
        {
            month: "May", study: 5, exams: 10
        }
    ]
    const [speedometerData, setSpeedometerData] = useState([0.4, 0.6]);

    useEffect(()=>{
        const svg = d3.select(svgRef.current);
        // const timeout = setTimeout(()=>{
        //     let a = Math.random();
        //     setSpeedometerData(()=>{
        //         return [a, 1-a];
        //     })
        // }, 5000);

        
        ///////////////////////////////////////////////////////////Speedometer
        
        
        /////////////////////////////////Gauge
        
        const speedometer =  d3.select(speedoMeterRef.current);
        const arcGenerator = d3.arc().innerRadius(110).outerRadius(130);
        const pieGenerator = d3.pie().startAngle(-0.7*Math.PI).endAngle(0.7*Math.PI).sort(null);
        const instructions = pieGenerator(speedometerData)
        const otherColors = ["#3BAFA8", "#F8EFE2"];
        speedometer.selectAll(".slice")
        .data(instructions)
        .join('path')
        .classed("slice", true)
        .attr("stroke", "darkgreen")
        .attr("fill", (item, index)=>{
            return otherColors[index];
        })
        .style("transform", `translate(${(Math.round(dimensions.width-200)/2)}px ,${Math.round((dimensions.height+50)/2)}px )`)
        .transition()
        .attrTween("d", function(instruction){
            let interpolator;
            if(this.prevInstruction == undefined)  interpolator = d3.interpolate(0, instruction);
            else interpolator = d3.interpolate(this.prevInstruction, instruction);
            this.prevInstruction = interpolator(1);
            return (frame)=>{
                return arcGenerator(interpolator(frame));
            };
        });
        
        /////////////////////////////////Needle
        
        ////////////////////NeedleCircle

        const myCircle = speedometer.select(".pointerCircle")
        .append("circle")
        .style("transform", `translate(${(Math.round(dimensions.width-200)/2)}px, ${Math.round(dimensions.height - 50)}px
        )`)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 18)
        .attr('stroke', "orange")
        .attr('fill', 'darkorange')

        const innerCircle = speedometer.select(".pointerCircle")
        .append("circle")
        .style("transform", `translate(${(Math.round(dimensions.width-200)/2)}px, ${Math.round(dimensions.height - 50)}px
        )`)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 10)
        .attr('stroke', "white")
        .attr('fill', 'white')
        
        ///////////////////NeedleNeedle?
        const needleRadius = 16;
        const needlelen = 90;


        const theta = calcAngle(speedometerData[0]);
        let myArr = triangleMovement(theta, 0, 0, needleRadius, needlelen);
        speedometer.select("pointerTriangle").selectAll("path").remove();
        const theTriangle = speedometer.select(".pointerTriangle")
                                        .append("path")
                                        .style("transform", `translate(${(Math.round(dimensions.width-200)/2)}px, ${Math.round(dimensions.height - 50)}px
                                        )`)
                                        .transition()
                                        .attr('d', `M 0 0 L ${myArr[0][0]} ${myArr[0][1]} L ${myArr[1][0]} ${-myArr[1][1]} L ${myArr[2][0]} ${myArr[2][1]} L 0 0`)
                                        .style("fill", "url(#Gradient1)")
                                        .text("Points");


        ///////////////////////////////////////////////////////////////Bar Chart  
        const myKeys = Object.keys(data[0]).filter((item)=>item !== 'month');
        const stackGenerator = d3.stack().keys(myKeys);
        const layers = stackGenerator(data);
        const colors = ["#FF9053", "#F8EFE2"];
        const xScale = d3.scaleBand().domain(data.map((item)=>item.month)).rangeRound([0, +dimensions?.width]).padding(0.2);
        const yScale = d3.scaleLinear().domain([0, 80]).range([+dimensions.height, 0]);

        const xAxis = d3.axisBottom(xScale);
        svg.select(".x-axis")
        .attr("transform", `translate(0, ${dimensions.height + 5})`)
        .call(xAxis)
        .style("font-size", "1em");

        const yAxisGrid = d3.axisLeft(yScale).tickSize(-600).tickFormat('').ticks(10);

  

        svg.select(".actualChart").selectAll('.layer')
            .data(layers)
            .join('g')
            .attr("class", "layer")
            .attr("fill", (item, index)=>colors[index])
            .selectAll('rect')
            .data(layer => layer)
            .join('rect')
            .attr('width', xScale.bandwidth() - 10)
            .attr('height', (item)=>+dimensions?.height - yScale(item[1] - item[0]))
            .attr('x', (item)=>xScale(item.data.month))
            .attr('y', data=>yScale(data[1]))
            .attr('rx', 5);
        
        // return ()=>{
        //     clearTimeout(timeout);
        // }
    }, [dimensions, speedometerData]);
    
    const handlesResize = (event)=>{
        const cw = window.innerWidth;
        const ch = window.innerHeight;
        setDimensions((prevD)=>{
            prevD.height = Math.round(0.25*ch);
            prevD.width = Math.round(0.3*cw);
            return {...prevD};
        })
    }
    window.addEventListener("resize", handlesResize);



    return(
        <div className = {classes.container}>
            <div className = {classes.graphEnclosure}>
                <div className={classes.graphTitle}>
                    Hours Spent
                </div>
                <div className={classes.graphGraph}>
                    <div className = {classes.legend1}>{svgss[9]} Study {svgss[10]} Exams</div>
                    <svg ref = {svgRef} style = {{fill: "orange", width: dimensions.width , height: dimensions.height + 50}} className='graphSvg'>
                        <g className='x-axis'/>
                        <g className='y axis-grid'/>
                        <g className='actualChart'></g>
                    </svg>
                </div>
            </div>  
            <div className = {classes.speedoMeter}>
                <div className = {classes.graphTitle}>
                    Performance
                </div>
                <div style = {{padding: "0"}}className = {classes.graphGraph}>
                    <div className = {classes.legend2}>{svgss[8]} Point Progress</div>
                    <svg className = "speedoSvg" style = {{width: dimensions.width - 200, height: dimensions.height}}ref = {speedoMeterRef}>
                        <defs>
                            <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
                                <stop style={{stopColor: "#FF9053"}} offset="0%" />
                                <stop style={{stopColor: "#FF9053"}} offset="60%" />
                                <stop style={{stopColor: "white"}} offset="90%" />
                            </linearGradient>
                        </defs>
                        <g className = "pointerTriangle" />
                        <g className = "pointerCircle" />
                    </svg>
                    <h2>Points</h2>      
                </div>
            </div>
        </div>
    )
}


