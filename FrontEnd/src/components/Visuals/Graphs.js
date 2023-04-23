import React from 'react';

import classes from "./Graphs.module.css"
import * as d3 from 'd3';

export default function Graphs(props){
    const dimensions = {height: "250", width: "500"};
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
   
  
    const xScale = d3.scaleBand().domain(data.map((item)=>item.month)).rangeRound([0, +dimensions.width]).padding(0.2);
    const yScale = d3.scaleLinear().domain([0, 80]).range([+dimensions.height, 0]);
    
    
    const svg = d3.select(".graphSvg");

        svg.selectAll('bars')
        .data(data)
        .enter()
        .append('rect')
        .classed('bars', true)
        .attr('width', xScale.bandwidth())
        .attr('height', (item)=>dimensions.height - yScale(item.study + item.exams))
        .attr('x', (item)=>xScale(item.month))
        .attr('y', data=>yScale(data.study + data.exams));

    return(
        <div className = {classes.container}>
            <div className = {classes.graphEnclosure}>
                <div className={classes.graphTitle}>
                    Hours Spents
                </div>
                <div className={classes.graphGraph}>
                    <svg style = {{fill: "orange", width: dimensions.width, height: dimensions.height}} className='graphSvg'></svg>
                </div>
            </div>
        </div>
    )
}