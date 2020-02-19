import React from 'react';
import {connect} from 'react-redux';
import {Bar,Line,Pie,scales} from 'react-chartjs-2';

export const PreviewTest=(props)=>{
    return(
        <div className='form-group'>
            <h3>Preview PreviewTest</h3>
            <div className='form-group'>
                <button className='btn btn-primary' onClick={()=>{props.clearQuestion()}}>BACK</button>
            </div>
            <div className='form-group'>
            <table className='table'>
                <thead className='thead-light'>
                    <tr>
                        <th>S.No</th>
                        <th>Question</th>
                        <th>Right Option</th>
                        <th>Score</th>
                        <th>Your Answer</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {props.arrQuestion.map((ele,index)=>{
                        return(<tr key={index}>
                            <td>{index+1}</td>
                            <td>{ele.desc}</td>
                            <td>{ele.rightanswer}</td>
                            <td>{ele.score}</td>
                            <td>{ele.answer}</td>
                            <td>
                                <ol>
                                    {ele.options.map((eleOption,index)=>{
                                        return(<li key={index}>{eleOption}</li>)
                                    })}
                                </ol>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            </div>
            <div className='chart'>
                <Bar data={props.chartData}
                options={props.option}/>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    console.log('Central State Object ',state.arrQuestion)
    return{
        arrQuestion:state.arrQuestion,
       // options:state.options
    }
}

const fn=connect(mapStateToProps);
export default fn(PreviewTest);