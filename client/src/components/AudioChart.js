import React from 'react'
import {ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend} from 'recharts' 

const AudioChart = ( props ) => {


    return(
        <ResponsiveContainer width={'99%'} height={500}>
        <RadarChart outerRadius={180} width={730} height={730} data={props.data}>
        <PolarGrid />
        <PolarAngleAxis dataKey={props.cat} />
        <Radar name='hi' dataKey={props.val} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
        </ResponsiveContainer>
    )
}
export default AudioChart;