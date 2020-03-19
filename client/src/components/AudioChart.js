import React from 'react'
import {ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend} from 'recharts' 

const AudioChart = ( props ) => {


    console.log(props.data)

    return(
        <ResponsiveContainer width={'99%'} height={300}>
        <RadarChart outerRadius={90} width={730} height={250} data={props.data}>
        <PolarGrid />
        <PolarAngleAxis dataKey={props.cat} />
        <Radar name='hi' dataKey={props.val} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
        </ResponsiveContainer>
    )
}
export default AudioChart;