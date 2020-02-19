import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';
import './display.css';

const DisplayTest=(props)=>{
    return(
        <div className='form-group'>
            <h3>DisplayTest</h3>
            <div className='form-group'>
                {/* <h4>TestName</h4> */}
                <button className='btn btn-primary' onClick={()=>{props.displayProfileTeacher()}}>BACK</button>
                <div className='rows'>
                    {
                        props.arrTest.map((ele,index)=>{
                        return(<div key={index} className='row'>
                        <Card key={index} style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title>{ele.testname}</Card.Title>
                          <Card.Text>
                              Testname:{ele.testname}
                              <br></br>
                              Duration:{ele.testduration}
                              <br></br>
                              TestCode:{ele.testcode}
                          </Card.Text>
                          <button className='btn btn-primary' onClick={()=>{props.toFindQuestionTeacher(ele)}}>PREVIEW</button>
                        </Card.Body>
                      </Card>
                      </div>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        arrTest:state.arrTest
    }
}

const fn=connect(mapStateToProps);
export default fn(DisplayTest);
{/* <div className='card text-center'>
    <div className='card body text-center'></div>
</div> */}