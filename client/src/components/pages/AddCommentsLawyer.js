import  React, { Component } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import '../../App.css';
import GetAllUserForms from '../form/GetAllUserForms'
const mongoose = require('mongoose')



class AddCommentsLawyer extends Component{
    constructor(props)
    {
        super(props);
        this.state=
        {
            lawyerComments:
            {
                value : [],
            } ,
            
            input : 
            {
              value: '' ,
            }
        }
    }
     
    getInitialState () {
        return ({ input: '' }
        );
      }

      handleChange(e) {
       return (this.setState({ input: e.target.value })
       );
      }

      handleClick1 () {
        console.log(this.state.input);
      }
    

    //onClick={this.handleClick.bind(this, case.id)}


    //if the id belongs to a lawyer
    handleClick = (formId,event) =>
    {
      console.log(formId)
        var apiBaseUrl =('http://localhost:5000/routes/api/users/lawyerComments/'+mongoose.Types.ObjectId('5cb0c8d77268387578d1530d')+'/'+mongoose.Types.ObjectId(formId))
        var payload={
            "lawyerComments": this.state.lawyerComments.value
        }
        axios.put(apiBaseUrl, payload)
       .then(function (response) {
         console.log(response);
       })
       .catch(function (error) {
         console.log(error);
       });
    }

    changeHandler = event => {
        this.setState({lawyerComments :{ value: [event.target.value], valid: !!event.target.value } });
      };

    
    validateForm ()
    {
        return (
        this.state.lawyerComments.value.length >= 1
        )
    }

    render() {
        
        
        return (
            <div>

            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Add a Comment 
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <input type="text" placeholder='Enter Your Comment' style={{width: "775px" , height:"100px"}} onChange={ this.changeHandler} />
                <Button
                type="button"
                block
                variant="dark"
                value="Add Comment"
                style={{width: "300px"}}
                onClick={() => (this.handleClick(this.props.formId), alert('Comments added Succesfully'))}
                disabled={!this.validateForm()}
                >Comment</Button>
                </Modal.Body>
                <Modal.Footer>
                <Button variant='red' onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
           
    
        {/* <input type="text" placeholder='Enter Your Comment' onChange={ this.changeHandler} />
        <Button
          type="button"
          block
          variant="dark"
          value="Add Comment"
          onClick={() => (this.handleClick() , alert('Comments added Succesfully'))}
        >Add Comment</Button> */}
           </div>
          )
    }
}

 export default AddCommentsLawyer
