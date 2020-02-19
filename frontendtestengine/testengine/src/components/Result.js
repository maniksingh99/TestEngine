import React from 'react';
import {Bar,Line,Pie,scales} from 'react-chartjs-2';

export const Result=(props)=>{
    return(
        <div className='container'>
            <h1>The Total Score Is {props.totalScore}</h1>
            <div className='chart'>
                <Bar
                data={props.chartData}
                options={props.option}
                />
            </div>
        </div>
    )
}