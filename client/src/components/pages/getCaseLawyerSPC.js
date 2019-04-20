import  React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import Table from 'react-bootstrap/Table';
import {Button, Container} from 'react-bootstrap';
import "mdbreact/dist/css/mdb.css";
import Card from '../form/Card'
import GetAllUserForms from '../form/GetAllUserForms';
import {Dropdown} from 'react-bootstrap';
var $ = require("jquery")(window);




 // tabRow(){
      //   return this.state.companies.map(function(company,i){
      //       return <GetAllUserForms company={company} key={i} />;
      //   });
      // }

class Companies extends Component {
    state = {
      companies:[]
    }
    componentDidMount(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
      axios.get('http://localhost:5000/routes/api/users/getUserFormsSPC/',{headers: { "Authorization": localStorage.getItem('jwtToken') }})
      .then(res => {
        if(Array.isArray(res.data.data)){
          this.setState({companies: res.data.data})
      }})}

      
      sort = () => {
        axios.defaults.headers.common['Authorization'] =  localStorage.getItem('jwtToken');
        axios.get('http://localhost:5000/routes/api/users/SpecificFormSortedByFormId',{headers: { "Authorization": localStorage.getItem('jwtToken') }}).then (res=> {
               this.setState({companies:res.data.data})
               alert('Cases have been sorted')
            }).catch(err=>{console.log(err)});
          }
          sortByCreationDate = () => {
            axios.defaults.headers.common['Authorization'] =  localStorage.getItem('jwtToken');
            axios.get('http://localhost:5000/routes/api/users/SpecificformsSortedByformDate',{headers: { "Authorization": localStorage.getItem('jwtToken') }}).then (res=> {
                   this.setState({companies:res.data.data})
                   alert('Cases have been sorted')
                }).catch(err=>{console.log(err)});
              }

      
              tabRow = () => {
               return this.state.companies.map((company,i)=>{
                   return <Card company={company} key={i}/>  
                })
               }
      
      render(){
        return (
             
         <div>
           
           <div >
          <div style={{backgroundColor:"#96aab3" ,marginTop:"90px", textAlign:"center", fontSize:"50px" , color:"white" ,paddingLeft:'60px',flexDirection: 'row', justifyContent: 'flex-end'}} >Specific Lawyer Cases<br/>
          <Dropdown>
            <Dropdown.Toggle className="btn blue-gradient btn-block btn-rounded z-depth-1a" variant="omar" id="dropdown-basic"style={{width:"150px"}}>
              Sort the Cases
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>this.sort()} style={{textAlign:'left'}}>By ID</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={()=>this.sortByCreationDate()} style={{textAlign:'center'}}>By Creation Date</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
            </div>
         </div>
         {this.tabRow()}
         </div>
        )
          





      // render(){
      //   return (
             
      //     <div style={{paddingLeft:"60px"}}>
      //     <Button variant="nada" block disabled><h1>specific lawyer cases</h1></Button>
        
      //     <Container >
      //     <div  style={{textAlign:'right'}}>
      //     <div class="btn-group-vertical" >
      //     <Button type="button" variant="#2e5a7c" onClick={()=>this.sort()} class="btn btn-primary">Sort the cases by ID</Button>
      //      <Button type="button" variant="#2e5a7c" onClick={()=>this.sortByCreationDate()}  class="btn btn-primary">Sort the cases by CreationDate</Button>
      //      </div>
      //       </div>
      //      </Container>
      //     {/* <Button variant="dark" onClick={()=>this.sort()}>Sort the cases by ID </Button> 
      //     <Button variant="dark" onClick={()=>this.sortByCreationDate()}>Sort the cases by CreationDate </Button>  */}
          
      //     </div>

         // )
        // }
    }
      }
 export default Companies

           