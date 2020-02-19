import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';
import './display.css';

const ProfileStudent=(props)=>{
    console.log('Attempted Test Array in profile student ',props.attemptedTest);
    console.log('Unattempted Test Array in profile student',props.arrTest);
    return(
        <div className='form-group'>
            <h3>Unattempted Test</h3>
            <div className='form-group'>
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
                          <button className='btn btn-primary' onClick={()=>{props.toFindQuestion(ele)}}>Take Test</button>
                        </Card.Body>
                      </Card>
                      </div>)
                        })
                    }
                </div>
                <h3>Attempted Test</h3>
                <div className='rows'>
                    {
                        props.attemptedTest.map((ele,index)=>{
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
                          <button className='btn btn-primary' onClick={()=>{props.toFindQuestionToPreviewStudent(ele)}}>PREVIEW</button>
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
        arrTest:state.arrTest,
        attemptedTest:state.attemptedTest
    }
}

const fn=connect(mapStateToProps);
export default fn(ProfileStudent);