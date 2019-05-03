import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import Table from 'react-bootstrap/Table';
import { Button, Container, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import 'mdbreact/dist/css/mdb.css';
import AddCommentsLawyer from './AddCommentsLawyer';
import Cardd from '../form/Card';
import GetAllUserForms from '../form/GetAllUserForms';
import { Dropdown, Card } from 'react-bootstrap';
import { MDBProgress } from 'mdbreact';
import { blue200 } from 'material-ui/styles/colors';
import trans from '../translations/getCaseLawyerTranslation'
const mongoose = require('mongoose');
var $ = require('jquery')(window);


// tabRow(){
//   return this.state.companies.map(function(company,i){
//       return <GetAllUserForms company={company} key={i} />;
//   });
// }

class Companies extends Component {
	state = {
		companies: [],
		modalShow: false
	};
	redirectEdit(formId, formType) {
		console.log(formType);
		localStorage.setItem('formId', formId);
		localStorage.setItem('formType', formType);
		document.location.href = '/EditLawyerCompany';
	}
	componentDidMount() {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		axios
			.get('/routes/api/userDynamicForms/getLawyerInProgressCases', {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				if (Array.isArray(res.data.data)) {
					this.setState({ companies: res.data.data });
				}
				console.log(this.state.companies);
			})
			.catch((err) => {
				alert('' + err);
			});
	}

	sort = () => {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.get('/routes/api/userDynamicForms/SpecificFormSortedByFormId', {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				this.setState({ companies: res.data.data });
				alert('Cases have been sorted');
				document.location.href = '/getCaseLawyer';
			})
			.catch((err) => {
				console.log(err);
			});
	};
	sortByCreationDate = () => {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.get('/routes/api/userDynamicForms/t', {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				this.setState({ companies: res.data.data });
				alert('Cases have been sorted');
				document.location.href = '/getCaseLawyer';
			})
			.catch((err) => {
				console.log(err);
			});
	};

	accept = (formId) => {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.put('/routes/api/userDynamicForms/accept/' + mongoose.Types.ObjectId(formId), {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				alert('The form was accepted succesfully');
				document.location.href = '/getCaseLawyer';
			})
			.catch((err)=>{
				alert(err.response.data.msg|| err.response.data);
				console.log(err.response);
			})
	};

	calculateFees = (formId) => {
		console.log('hi');
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios.put('/routes/api/userDynamicForms/calculatingFees/' + mongoose.Types.ObjectId(formId), {
			headers: { Authorization: localStorage.getItem('jwtToken') }
		})
		.then((res) => {
			alert('The fees was calculated succesfully');
			document.location.href = '/getCaseLawyer';
		})
		.catch((err)=>{
			alert(err.response.data.msg|| err.response.data);
			console.log(err.response);
		})
	};

	getAttributes = () => {
		let modalClose = () => this.setState({ modalShow: false });
		return this.state.companies.map((Form, index) => {
			var KEYS = [];
			// console.log(Form)
			for (var key in Form) {
				KEYS.push(key);
			}
			return (
				<Card>
					<Card.Body>
						<div>
							{KEYS.map((key, index) => {
								if (
									key !== '_proto' &&
									key !== '_id' &&
									key !== 'formType' &&
									key !== 'investorId' &&
									key !== 'lawyerId' &&
									key !== 'reviewerId' &&
									key !== '__v'
								) {
									var constraints = Form[key];
									if (Array.isArray(constraints)) {
										if (!constraints['0']) return;
										var keys = [];
										for (var att in constraints['0']) {
											keys.push(att);
										}

										if (key === 'lawyerComments') {
											return (
												<div>
													{' '}
													<h3>
														<i class="fas fa-genderless" />{trans.commentsL}
													</h3>
													{keys.map((att, index) => {
														return (
															<h5 style={{ paddingLeft: '5%' , fontSize:"15px"}}>
																
																{constraints[att]}
															</h5>
														);
													})}
												</div>
											);
										} else if (key === 'reviewerComments') {
											return (
												<div>
													{' '}
													<h3>
														<i class="fas fa-circle" style={{fontSize:"15px"}}/>{trans.commentsR}
													</h3>
													{keys.map((att, index) => {
														return (
															<h5 style={{ paddingLeft: '5%' }}>
																
																{constraints[att]}
															</h5>
														);
													})}
												</div>
											);
										} else {
											return (
												<div>
													{' '}
													<h3>
														<i class="fas fa-circle" />
														{key}
													</h3>
													{keys.map((att, index) => {
														return (
															<h5 style={{ paddingLeft: '5%' }}>
																<i class="fas fa-circle" sstyle={{ fontSize: '0.5em' }}/> {att} :
																{constraints['0'][att]}
															</h5>
														);
													})}
												</div>
											);
										}
									}

									return (
										<div>
											<div key={key}>
												<h3>
													<i class="fas fa-circle" style={{ fontSize: '0.5em' }} /> {key} :{' '}
													{constraints}{' '}
												</h3>
											</div>
										</div>
									);
								}
							})}
							{/* <MDBProgress  material value={35} color="dark" height="35px">
               <h3> In progress Lawyer </h3>
                </MDBProgress> */}

							<div variant="omar" style={{ textAlign: 'right' ,color:blue200 }}>
								<ButtonGroup variant="omar" size="sm" className="mt-3" style={{color:blue200}}>
									<Button variant="omar" style={{ width: '120px', height: '65px',backgroundColor:"#a3dbf1" }}
											onClick={() => this.accept(Form._id)}
									>
										<h6>
											<i
												class="fas fa-handshake"
												style={{ fontSize: '1em'}}
											/>
											<br /> 
											{trans.accept}
										</h6>
									</Button>
									<Button
										variant="omar" style={{ width: '120px', height: '65px',backgroundColor:"#a3dbf1" }}
										onClick={() => this.calculateFees(Form._id)}
									>
										<h9>
											<i 
												class="fas fa-money-bill-alt" 
												style={{ fontSize: '1em' }}
											/> 
											<br />
											{trans.calculate}
										</h9>
									</Button>
									{Form.status === 'Reviewer rejected' ? (
										<div>
											
											<Button
												type="button"
												variant="omar"
												style={{ width: '120px', height: '65px',backgroundColor:"#a3dbf1" }}
												onClick={() => this.redirectEdit(Form._id, Form.formType)}
												class="btn btn-info"
											>
												<h3 style={{ fontSize: '15px' }}>
													<i class="fas fa-edit" />
													<br/>
													{trans.edit}<br />
												</h3>
											</Button>
											</div>
									) : null}
									<ButtonToolbar>
										<Button
											variant="omar" style={{ width: '120px', height: '65px',backgroundColor:"#a3dbf1" }}
											onClick={() => this.setState({ modalShow: true })}
										>
											<h6>
												<i class="fas fa-comment" 
												style={{ fontSize: '1em' }} />
												<br />
												{trans.comments}
											</h6>
										</Button>
										<AddCommentsLawyer
											show={this.state.modalShow}
											onHide={modalClose}
											formId={Form._id}
										/>
									</ButtonToolbar>
									</ButtonGroup>
									<br/>
									{Form.status === 'Reviewer rejected' ? (
										<div>
											
											{/* <Button
												type="button"
												variant="dark"
												onClick={() => this.redirectEdit(Form._id, Form.formType)}
												class="btn btn-info"
											>
												<h3 style={{ color: '#64b9e0', fontSize: '15px' }}>
													{trans.edit}<br />
													<i class="fas fa-edit" />
												</h3>
											</Button>
											<br /> */}
											<MDBProgress material value={60} color="dark" height="63px">
												<h3 style={{ color: '#64b9e0', fontSize: '30px' }}>
													{trans.reviewerR} <br /> 60%
												</h3>
											</MDBProgress>
										</div>
									) : null}
									
								
								<div>
									{/* {Form.status === 'Reviewer rejected' ? (
										<div>
											<MDBProgress material value={60} color="dark" height="63px">
												<h3 style={{ color: '#64b9e0', fontSize: '30px' }}>
													{trans.reviewerR} <br /> 60%
												</h3>
											</MDBProgress>
											<br />
											<Button
												type="button"
												variant="dark"
												onClick={() => this.redirectEdit(Form._id, Form.formType)}
												class="btn btn-info"
											>
												<h3 style={{ color: '#64b9e0', fontSize: '15px' }}>
													{trans.edit}<br />
													<i class="fas fa-edit" />
												</h3>
											</Button>
										</div>
									) : null} */}
									{Form.status === 'In progress Lawyer' ? (
										<MDBProgress material value={50} color="dark" height="63px">
											<h3 style={{ color: '#64b9e0', fontSize: '30px' }}>
												{trans.lawyerA} <br />50%{' '}
											</h3>
										</MDBProgress>
									) : null}
								</div>
							</div>
						</div>
					</Card.Body>
				</Card>
			);
		});
	};

	render() {
		trans.setLanguage(this.props.lang);
		return (
			<div>
				<div>
					<div
						style={{
							backgroundColor: '#a3dbf1',
							paddingTop: '70px',
							textAlign: 'center',
							fontSize: '50px',
							color: 'dark',
							flexDirection: 'row',
							justifyContent: 'flex-end',
							height:"205px"
						}}
					>
						{trans.title}
						<Dropdown>
							<Dropdown.Toggle
								//className="btn blue-gradient btn-block btn-rounded z-depth-1a"
								variant="omar"
								id="dropdown-basic"
								style={{ width: '150px' ,left:'0',padding: '0.5px'}}
							>
								{trans.sortB}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item onClick={() => this.sort()} style={{ textAlign: 'left' ,color:blue200}}>
									{trans.id}
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item
									onClick={() => this.sortByCreationDate()}
									style={{ textAlign: 'center',color:blue200}}
								>
									{trans.date}
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>
				{this.getAttributes()}
			</div>
		);
	}
}
export default Companies;
