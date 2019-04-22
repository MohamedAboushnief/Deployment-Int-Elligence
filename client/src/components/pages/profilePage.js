import 'bootstrap/dist/css/bootstrap.css'
import React, { Component } from 'react';
import Footer from '../layout/footer';
import ReactDOM from 'react-dom';
import axios from "axios";
import {Badge,ListGroup} from 'react-bootstrap'
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import { Button } from 'mdbreact';
import { red100 } from 'material-ui/styles/colors';
import { blue100 } from 'material-ui/styles/colors';
import { blue200 } from 'material-ui/styles/colors';

class Profile extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            gender: '',
            nationality:'',
            identificationType:'',
            identificationNumber:'',
            birthdate:'',
            address:'',
            email:'',
            financialBalance:'',
            telephone:'',
            fax:''
       };

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
      axios.get('http://localhost:5000/routes/api/users/CertainAttributes',{headers: { "Authorization": localStorage.getItem('jwtToken') }})
          .then(response => {
            this.setState({ 
                name: response.data.Username, 
                gender: response.data.Gender,
                nationality: response.data.Nationality,
                identificationType: response.data.IdentificationType,
                identificationNumber: response.data.IdentificationNumber,
                birthdate: response.data.Birthdate.substring(0,9),
                address: response.data.Address,
                email:response.data.Email,
                financialBalance:response.data.FinancialBalance,
                telephone: response.data.Telephone,
                fax: response.data.Fax
            });
            
          })
      
    }

    render()
    {  
        var Investor = (
        <div>
            
                <br/> 
                <br/>
                <br/>
            <div class="container emp-profile">
            <form method="post">
                    <div class="row">
                <div class="col-md-6">
                <div class="container" >
                <div class="jumbotron" style={{width:"300px",height:"130px",paddingTop:"10px"}}>
                    <h3> <i className="far fa-user" style={{color:blue200}}/> {this.state.name}</h3>
                    <h4> <i className="fas fa-at" style={{color:blue200}}/> {this.state.email}</h4>
    
                </div>
                </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>                
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="tab-content profile-tab" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="row" >
                                        <div class="col-md-6">
                                        <label><i class="fas fa-venus-mars" style={{color:blue200}}/> Gender</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.gender}</p>
                                        </div>
                                    </div>
                                    <div class="row" >
                                        <div class="col-md-6">
                                        <label><i class="fas fa-birthday-cake" style={{color:blue200}}/> Birthdate</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.birthdate}</p>
                                        </div>
                                    </div>
                                    <div class="row" >
                                        <div class="col-md-6">
                                            <label><i className="fas fa-globe" style={{color:blue200}}/> Nationality</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{this.state.nationality}</p>
                                        </div>
                                    </div>
                                    <div class="row" >
                                        <div class="col-md-6">
                                        <label><i className="fas fa-id-badge" style={{color:blue200}}/> Identification Type</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.identificationType}</p>
                                        </div>
                                    </div>
                                    <div class="row" >
                                        <div class="col-md-6">
                                        <label><i class="fas fa-sort-numeric-down" style={{color:blue200}}/> Identification Number</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.identificationNumber}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-map-marked-alt" style={{color:blue200}}/> Address</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.address}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-phone" style={{color:blue200}}/> Telephone</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.telephone}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-fax" style={{color:blue200}}/> Fax</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.fax}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-money-bill" style={{color:blue200}}/> Financial Balance</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.financialBalance}</p>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>           
    </div>
            
</div>

        
        );
        var Lawyer = (
            <div>
                <br/> 
                <br/>
                <br/>
          
            <div class="container emp-profile">
        <form method="post">
            <div class="row">
                <div class="col-md-6">
                <div class="container" >
                <div class="jumbotron" style={{width:"300px",height:"130px",paddingTop:"10px"}}>
                    <h3> <i className="far fa-user" style={{color:blue200}}/> {this.state.name}</h3>
                    <h4> <i className="fas fa-at" style={{color:blue200}}/> {this.state.email}</h4>
    
                </div>
                </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>                
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="tab-content profile-tab" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-venus-mars" style={{color:blue200}}/> Gender</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.gender}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-birthday-cake" style={{color:blue200}}/> Birthdate</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.birthdate}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label><i className="fas fa-globe" style={{color:blue200}}/> Nationality</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{this.state.nationality}</p>
                                        </div>
                                    </div>
                                    <div class="row" >
                                        <div class="col-md-6">
                                        <label><i className="fas fa-id-badge" style={{color:blue200}}/> Identification Type</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.identificationType}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-sort-numeric-down" style={{color:blue200}}/> Identification Number</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.identificationNumber}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-map-marked-alt" style={{color:blue200}}/> Address</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.address}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-phone" style={{color:blue200}}/> Telephone</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.telephone}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-fax" style={{color:blue200}}/> Fax</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.fax}</p>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>           
    </div>
            
</div>

                
                );

        var Reviewer = (
            <div>
            
                <br/> 
                <br/> 
                <br/>
                
            <div class="container emp-profile">
            <form method="post">
            <div class="row">
                <div class="col-md-6">
                <div class="container" >
                <div class="jumbotron" style={{width:"300px",height:"130px",paddingTop:"10px"}}>
                    <h3> <i className="far fa-user" style={{color:blue200}}/> {this.state.name}</h3>
                    <h4> <i className="fas fa-at" style={{color:blue200}}/> {this.state.email}</h4>
    
                </div>
                </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>                
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="tab-content profile-tab" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-venus-mars" style={{color:blue200}}/> Gender</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.gender}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-birthday-cake" style={{color:blue200}}/> Birthdate</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.birthdate}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label><i className="fas fa-globe" style={{color:blue200}}/> Nationality</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{this.state.nationality}</p>
                                        </div>
                                    </div>
                                    <div class="row" >
                                        <div class="col-md-6">
                                        <label><i className="fas fa-id-badge" style={{color:blue200}}/> Identification Type</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.identificationType}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-sort-numeric-down" style={{color:blue200}}/> Identification Number</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.identificationNumber}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-map-marked-alt" style={{color:blue200}}/> Address</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.address}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-phone" style={{color:blue200}}/> Telephone</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.telephone}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-fax" style={{color:blue200}}/> Fax</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.fax}</p>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>           
    </div>
            
</div>

            
        );

        var admin = (
            <div>
                <br/> 
                <br/> 
                <br/>
            <div class="container emp-profile">
            <form method="post">
            <div class="row">
                <div class="col-md-6">
                <div class="container" >
                <div class="jumbotron" style={{width:"300px",height:"130px",paddingTop:"10px"}}>
                    <h3> <i className="far fa-user" style={{color:blue200}}/> {this.state.name}</h3>
                    <h4> <i className="fas fa-at" style={{color:blue200}}/> {this.state.email}</h4>
    
                </div>
                </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>                
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="tab-content profile-tab" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-venus-mars" style={{color:blue200}}/> Gender</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.gender}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-birthday-cake" style={{color:blue200}}/> Birthdate</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.birthdate}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label><i className="fas fa-globe" style={{color:blue200}}/> Nationality</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{this.state.nationality}</p>
                                        </div>
                                    </div>
                                    <div class="row" >
                                        <div class="col-md-6">
                                        <label><i className="fas fa-id-badge" style={{color:blue200}}/> Identification Type</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.identificationType}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-sort-numeric-down" style={{color:blue200}}/> Identification Number</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.identificationNumber}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-map-marked-alt" style={{color:blue200}}/> Address</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.address}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-phone" style={{color:blue200}}/> Telephone</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.telephone}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label><i class="fas fa-fax" style={{color:blue200}}/> Fax</label>
                                        </div>
                                        <div class="col-md-6">
                                        <p>{this.state.fax}</p>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>           
    </div>
            
</div>
        );
    

        return(
            <div style={{ paddingLeft:'60px',justifyItems:"center"}}>
            {localStorage.getItem('type')==='Investor'? Investor:null}
           {localStorage.getItem('type')==='Lawyer'? Lawyer:null}
           {localStorage.getItem('type')==='Admin'? admin:null}
           {localStorage.getItem('type')==='Reviewer'? Reviewer:null}
          </div>
        );
    }
}

ReactDOM.render(<Profile />, document.getElementById('root'));
export default Profile

