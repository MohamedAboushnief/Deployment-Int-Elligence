import  React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import {Button, Container} from 'react-bootstrap';
import "mdbreact/dist/css/mdb.css";
import CardReviewer from  '../form/CardReviewer'
import GetAllReviewerForms from '../form/GetAllReviewerForms';
import {Dropdown} from 'react-bootstrap';
var $ = require("jquery")(window);

class Companies extends Component {
    state = {
      companies:[]
    }
    componentDidMount(){


    
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
      axios.get('http://localhost:5000/routes/api/users/getUserFormsSPC',{headers: { "Authorization": localStorage.getItem('jwtToken') }})
      .then(res => {
        if(Array.isArray(res.data.data)){
          this.setState({companies: res.data.data})
      }})}

      sort = () => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        axios.get('http://localhost:5000/routes/api/users/SpecificFormSortedByFormId',{headers: { "Authorization": localStorage.getItem('jwtToken') }}).then (res=> {
               this.setState({forms:res.data.data})
               alert('Cases have been sorted')
            }).catch(err=>{console.log(err)});
           
     }   
      tabRow = () => {
        return this.state.companies.map((company,i)=>{
            return <CardReviewer company={company} key={i}/>  
         })
        }
      render(){
        return (
            
          <div>
          <div >
          <div style={{backgroundColor:"#96aab3" ,marginTop:"90px",textAlign:"center", fontSize:"50px" , color:"white" ,paddingLeft:'60px',flexDirection: 'row', justifyContent: 'flex-end'}} >Specific Reviewer Cases<br/>
          <Dropdown>
            <Dropdown.Toggle className="btn blue-gradient btn-block btn-rounded z-depth-1a" variant="omar" id="dropdown-basic"style={{width:"150px"}}>
              Sort the Cases
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>this.sort()} style={{textAlign:'left'}}>By ID</Dropdown.Item>
              <Dropdown.Item onClick={()=>this.sortByCreationDate()} style={{textAlign:'center'}}>By Creation Date</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
            </div>
            </div>

              {this.tabRow()}
          </div>
         
        )
          
      }
    }
export default Companies