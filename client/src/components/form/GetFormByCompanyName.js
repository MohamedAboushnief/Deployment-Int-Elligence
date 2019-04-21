import 'bootstrap/dist/css/bootstrap.css'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Dropdown} from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import style from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Table } from 'semantic-ui-react';
import { MDBRow, MDBCol, MDBInput, MDBBtn,MDBIcon } from "mdbreact";


//import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';

var mongoose = require('mongoose')
               
class MyCompany extends Component {

    state = {
      companyName:'',
        companies:[],
        viewedComp:[]
      }

      //do you mean get all forms?

      
      componentDidMount(){
        axios.get('http://localhost:5000/routes/api/forms/')        
        .then(res => {
              this.setState({companies: res.data.data})
          })}
    
    tabRow(){
      return this.state.companies.map(function(company,i){
          return <Dropdown.Item key={i} ><h6>{company}</h6></Dropdown.Item>;
      });
    }
    

    changeHandler = event => {
      this.setState({ [event.target.name]: { value: event.target.value}});
    };

    handleClick(event){

               
     
      
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
      var apiBaseUrl = "http://localhost:5000/routes/api/admins/getByCompanyName/";
      axios.get(apiBaseUrl + this.state.companyName.value,{headers: { "Authorization": localStorage.getItem('jwtToken') }})        
      .then(res => {
            this.setState({viewedComp: res.data.data})
        })
        
    }

    render()
    {
        return (

          <div style={{paddingLeft:"60px"}}>
             
          <MDBCol>
          <MDBRow style={{paddingLeft:"41%"}}>
           
            <MDBInput
            icon="search" 
            label="Search For A Company"               
            value={this.state.companyName.value}
            name="companyName"
            onChange={this.changeHandler}
            type="text"
            id="materialFormRegisterNameEx" 
            required
            >
            </MDBInput>
            </MDBRow>
            </MDBCol>

          <div style={{paddingLeft:"45%"}}>
            <MuiThemeProvider >
            <RaisedButton label="Search" primary={true} style={style}
            onClick={(event) => (this.handleClick(event))} />
            </MuiThemeProvider>
            </div>
            <div>

                {this.state.viewedComp.map(el => {
                  return <div key={el.id}>
                  <MuiThemeProvider>
                    
              <Table fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Company Name</Table.HeaderCell>
                  <Table.HeaderCell>Company Name In English </Table.HeaderCell>
                  <Table.HeaderCell>Company Governorate</Table.HeaderCell>
                  <Table.HeaderCell>Company City</Table.HeaderCell>
                  <Table.HeaderCell>Company Address</Table.HeaderCell>
                  <Table.HeaderCell>Company Telephone</Table.HeaderCell>
                  <Table.HeaderCell>Company Fax</Table.HeaderCell>
                  <Table.HeaderCell>Currency</Table.HeaderCell>
                  <Table.HeaderCell>Equity Capital</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Creation Date</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell><span>{el.companyName}</span></Table.Cell>
                  <Table.Cell><span>{el.companyNameInEnglish}</span></Table.Cell>
                  <Table.Cell><span>{el.companyGovernorate}</span></Table.Cell> 
                  <Table.Cell><span>{el.companyCity}</span></Table.Cell> 
                  <Table.Cell><span>{el.companyAddress}</span></Table.Cell>
                  <Table.Cell><span>{el.companTelephone}</span></Table.Cell>
                  <Table.Cell><span>{el.companyFax}</span></Table.Cell>
                  <Table.Cell><span>{el.currency}</span></Table.Cell>
                  <Table.Cell><span>{el.equityCapital}</span></Table.Cell>    
                  <Table.Cell><span>{el.type}</span></Table.Cell>
                  <Table.Cell><span>{el.creationDate}</span></Table.Cell> 
                   
                </Table.Row>
              </Table.Body>
            </Table>
            </MuiThemeProvider>     
   
                    </div>
                })}
            
        </div>

        </div>

        )


    }
    
}

ReactDOM.render(<MyCompany />, document.getElementById('root'));
    export default MyCompany