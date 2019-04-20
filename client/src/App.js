import React, { Component } from 'react';
import { Provider } from 'react-redux';       //new stuff
import store from './store';                //new stuff
import {BrowserRouter as Router, Route} from 'react-router-dom'

import './App.scss'
import LandingBody from './components/pages/landingBody'
import Profile from './components/pages/profilePage'
import About from './components/pages/aboutContactUsPage'
import ApprovedCompanies from './components/pages/ApprovedCompanies'
import Footer from './components/layout/footer'
import SPCForm from './components/pages/SPCform'
import FForm from './components/pages/form'
import SSCForm from './components/pages/SSCForm'
import FlippingCard from './components/form/FlippingCard'
import Companies from './components/pages/Companies'
import Side from './components/layout/Side'
import NewNavBar from './components/layout/NewNavBar'
import SortSpecificUserCaseDate from './components/form/SortByDate'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar1 from './components/NavBar';
import adminPage from './components/pages/adminPage'
import Register1 from './components/Register';
import Login from './components/pages/Login';
import Home from './components/Home';
import SortSpecificUserCase from './components/pages/SortSpecificUserCase'
import DropdownTrial from './components/form/DropdownNationalities'
import DropdownCities from './components/form/DropdownCities'
import DropdownGovernorates from './components/form/DropdownGovernorates'
import UnassignedForm from './components/pages/unassignedForm'
import AssignToReviewer from './components/pages/assignToReviewer'
import GetCaseReviewer from './components/pages/GetCaseReviewer'
import AddCommentsLawyer from './components/pages/AddCommentsLawyer'
import EditProfile from './components/pages/EditProfile'
import EditSPCForm from './components/pages/EditSPCForm'
import EditSSCForm from './components/pages/UpdateSSCForm'
import ChangePassword from './components/pages/ChangePassword'
import GetFormByCompanyName from './components/form/GetFormByCompanyName'
import ShowProfileI from './components/pages/showProfileI'
import ShowProfileLR from './components/pages/showProfileLR'
import InProgressSSCCases from './components/pages/inProgressSSCCases';
import InProgressSPCCases from './components/pages/inProgressSPCCases';
import GetCaseLawyerSPC from './components/pages/getCaseLawyerSPC'
import GetCaseLawyerSSC from './components/pages/getCaseLawyerSSC'

import Try from './components/try';


class App extends Component {
  constructor(){
    super()
    localStorage.setItem('lang',localStorage.getItem('lang')||'en')
  }
  state=
  {
    lang:localStorage.getItem('lang'),
    formId:{}    
} 
  changelang = (lang) =>
    {
      localStorage.setItem('lang',lang)
      this.setState({lang:lang})
      console.log(lang)
    }

    setFormId = (formId)=>{
      this.setState({formId:formId})
      if(formId.type==="SSCForm")
        document.location.href="/editsscform"
      else
        document.location.href='/editspcform'
    }
  render() {
    var currentLocation = window.location.pathname;
    return (

<Provider store = { store }>
      <Router>
    
      
     
      <div>
     

        <Route exact path="/" render={props=>(
           <LandingBody {...props} lang={this.state.lang}/>
        )}/>
      <Route path='/login' render={(props) => <Login {...props}  lang={this.state.lang}/>}/>
      <Route path='/profile' render={(props) => <Profile {...props}  lang={this.state.lang}/>}/>
      <Route path='/profileI' render={(props) => <ShowProfileI {...props}  lang={this.state.lang}/>}/>
      <Route path='/profileLR' render={(props) => <ShowProfileLR {...props}  lang={this.state.lang}/>}/>
      <Route path='/changePassword' render={(props) => <ChangePassword {...props}  lang={this.state.lang}/>}/>
      <Route path='/about' render={(props) => <About {...props}  lang={this.state.lang}/>}/>
      <Route path='/approvedCompanies' render={(props) => <ApprovedCompanies {...props}  lang={this.state.lang}/>}/>
      <Route path='/SPC' render={(props) => <SPCForm {...props}  lang={this.state.lang}/>}/>
      <Route path='/form' render={(props) => <FForm {...props}  lang={this.state.lang}/>}/>
      <Route path='/SSC' render={(props) => <SSCForm {...props}  lang={this.state.lang}/>}/>
      <Route path='/journal' render={(props) => <Companies {...props}  lang={this.state.lang}/>}/>
      <Route path='/register' render={(props) => <Register1 {...props}  lang={this.state.lang}/>}/>
      <Route path='/registerAdmin' component={ adminPage}/>
      <Route path='/SortByID' component={ SortSpecificUserCase}/>
      <Route path='/dropDown' component={ DropdownTrial}/>
      <Route path='/dropDownCity' component={ DropdownCities}/> 
      <Route path='/dropDownGovernorate' component={ DropdownGovernorates}/> 
      <Route path='/unassignedForm'  render={(props) => <UnassignedForm {...props}  lang={this.state.lang}/>}/> 
      <Route path='/lawyerAcceptedForms'  render={(props) => <AssignToReviewer {...props}  lang={this.state.lang}/>}/> 
      <Route path='/GetReviewer' component={GetCaseReviewer}/>  
      <Route path='/editprofile'  render={(props) => <EditProfile {...props}  lang={this.state.lang}/>}  /> 
      <Route path='/editspcform' render={(props) => <EditSPCForm {...props}  formId={this.state.formId}/>}/> 
      <Route path='/editsscform' render={(props) => <EditSSCForm {...props}  formId={this.state.formId}/>}/>
      <Route path='/showsscform' render={(props) => <InProgressSSCCases {...props}  lang={this.state.lang} setFormId={this.setFormId}/>}/>
      <Route path='/showspcform' render={(props) => <InProgressSPCCases {...props}  lang={this.state.lang} setFormId={this.setFormId} />}/>
      <Route path='/companyName' render={(props) => <GetFormByCompanyName {...props}  lang={this.state.lang} />}/>
      <Route path='/getCaseLawyerSSC' render={(props) => <GetCaseLawyerSSC {...props}  lang={this.state.lang} />}/>
      <Route path='/getCaseLawyerSPC' render={(props) => <GetCaseLawyerSPC {...props}  lang={this.state.lang} />}/>

      <Route path='/try' render={(props) => <Try {...props}  lang={this.state.lang}/>}/>
      </div>
    
    {currentLocation==='/'?<Side changelang={this.changelang}  />:<NewNavBar changelang={this.changelang}/>}
    <Footer/>
      </Router>
      </Provider>
        )}
 
}

export default App;
