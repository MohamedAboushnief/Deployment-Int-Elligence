import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import 'mdbreact/dist/css/mdb.css';
import Mongoose from 'mongoose';
import { MDBProgress } from 'mdbreact';
import { Button } from 'react-bootstrap';
import trans from '../translations/inProgressInvestorTranslation';
class InProgressInvestorCases extends Component {
	state = {
		certainFormType: [],
		isFlipped: true
	};
	componentDidMount() {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		axios
			.get('/routes/api/userDynamicForms/getInvestorInProgressCases/', {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				console.log(res);
				if (Array.isArray(res.data.data)) {
					this.setState({ certainFormType: res.data.data });
				}
			})
			.catch((err) => console.log(err));
	}
	EditForm = (formId) => {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.put('/routes/api/userDynamicForms/investorEditForm/' + Mongoose.Types.ObjectId(formId), {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				this.setState({ certainFormType: res.data.data, isFlipped: false });
				document.getElementById('Flip').flipOnClick = false;
			})
			.catch((err) => {
				console.log(err);
			});
	};
	DeleteForm = (formId) => {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.delete('/routes/api/userDynamicForms/investorDeleteForm/' + Mongoose.Types.ObjectId(formId), {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				//document.getElementById('Flip').flipOnClick = false;
				alert('This case has been deleted successfully!');
				document.location.href = '/investorInProgressform';
			})
			.catch((err) => {
				console.log(err);
			});
	};
	redirectEdit(formId, formType) {
		console.log(formType);
		localStorage.setItem('formId', formId);
		localStorage.setItem('formType', formType);
		document.location.href = '/editinvcompany';
	}
	getAttributes = () => {
		return this.state.certainFormType.map((Form, index) => {
			var KEYS = [];
			for (var key in Form) {
				KEYS.push(key);
			}
			return (
				<Flippy
					id="Flip"
					flipOnHover={false}
					flipOnClick={this.state.isFlipped}
					flipDirection="horizontal"
					ref={(r) => (this.flippy = r)}
					style={{ width: '100%', height: '900px' }}
				>
					<FrontSide
						style={{
							borderStyle: 'solid',
							borderWidth: '5px',
							backgroundSize: '464px 400px'
						}}
					>
						<div style={{ textAlign: 'center', fontSize: '50px' }}>
							<h1
								style={{
									textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white',
									fontSize: '80px'
								}}
							>
								{Form.companyName}
							</h1>
							<i
								class="fas fa-angle-double-left"
								title="click to view details"
								style={{ paddingRight: '650px', paddingBottom: '100px' }}
							/>
							<i
								class="fas fa-angle-double-right"
								title="click to view details"
								style={{ paddingLeft: '650px', paddingBottom: '100px' }}
							/>
							<br />
							<br />
							<div>
								{Form.status === 'Unassigned' ? (
									<MDBProgress material value={25} color="dark" height="63px">
										<h3 style={{ color: '#64b9e0', fontSize: '30px' }}>
											{trans.unassigned} <br /> 25%
										</h3>
									</MDBProgress>
								) : null}
								{Form.status === 'In progress Lawyer' ? (
									<MDBProgress material value={35} color="dark" height="63px">
										<h3 style={{ color: '#64b9e0', fontSize: '30px' }}>
											{trans.lawyerP} <br /> 35%
										</h3>
									</MDBProgress>
								) : null}
								{Form.status === 'Lawyer rejected' ? (
									<MDBProgress material value={55} color="dark" height="63px">
										<h3 style={{ color: '#64b9e0', fontSize: '30px' }}>
											{trans.lawyerR} <br /> 55%
										</h3>
									</MDBProgress>
								) : null}
								{Form.status === 'Lawyer accepted' ? (
									<MDBProgress material value={75} color="dark" height="63px">
										<h3 style={{ color: '#64b9e0', fontSize: '30px' }}>
											{trans.lawyerA} <br /> 75%
										</h3>
									</MDBProgress>
								) : null}
								{Form.status === 'In progress Reviewer' ? (
									<MDBProgress material value={95} color="dark" height="63px">
										<h3 style={{ color: '#64b9e0', fontSize: '30px' }}>
											{trans.reviewerP} <br /> 95%
										</h3>
									</MDBProgress>
								) : null}
								{Form.status === 'Approved' ? (
									<MDBProgress material value={65} color="dark" height="63px">
										<h3 style={{ color: '#64b9e0', fontSize: '30px' }}>{trans.approved}</h3>
									</MDBProgress>
								) : null}
								{Form.status === 'Unassigned' ? (
									<div>
										<Button
											type="button"
											variant="dark"
											onClick={() => this.redirectEdit(Form._id, Form.formType)}
											class="btn btn-info"
										>
											<h3 style={{ color: '#64b9e0', fontSize: '15px' }}>
												{trans.edit}
												<br />
												<i class="fas fa-edit" />
											</h3>
										</Button>
										<Button
											variant="dark"
											type="button"
											onClick={() => this.DeleteForm(Form._id)}
											class="btn btn-info"
										>
											<h3 style={{ color: '#64b9e0', fontSize: '15px' }}>
												{trans.delete}
												<br />
												<i class="fas fa-trash" />
											</h3>
										</Button>
									</div>
								) : null}
								{Form.status === 'Lawyer rejected' ? (
									<div>
										<Button
											type="button"
											variant="dark"
											onClick={() => this.redirectEdit(Form._id, Form.formType)}
											class="btn btn-info"
										>
											<h3 style={{ color: '#64b9e0', fontSize: '15px' }}>
												{trans.edit}
												<br />
												<i class="fas fa-edit" />
											</h3>
										</Button>
									</div>
								) : null}
							</div>
						</div>
					</FrontSide>
					<BackSide
						style={{
							backgroundColor: '#f7f7f7',
							borderStyle: 'solid',
							borderWidth: '5px',
							paddingLeft: '60px'
						}}
					>
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
														<i class="fas fa-genderless" />Lawyer Comments
													</h3>
													{keys.map((att, index) => {
														return (
															<h5 style={{ paddingLeft: '5%' }}>
																{/* <i class="fas fa-circle" /> */}
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
														<i class="fas fa-circle" />
													</h3>
													{keys.map((att, index) => {
														return (
															<h5 style={{ paddingLeft: '5%' }}>
																{/* <i class="fas fa-circle" /> */}
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
																<i class="fas fa-circle" /> {att} :
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
							{/* {KEYS.map((key, index) => {
								if (key !== '_id' && key !== 'formType' && key !== 'investorId' && key !== 'lawyerId') {
									var constraints = Form[key];
									console.log(key, ':', constraints);
									for (var i in constraints) {
										if (key === 'lawyerComments') {
											return (
												<div>
													{' '}
													<h3>
														<i class="fas fa-circle"style={{ fontSize: '13px' }} />{trans.commentsL}
													</h3>
													{KEYS.map((att, index) => {
														return (
															<h5 style={{ paddingLeft: '5%' }}>
																<i class="fas fa-circle" style={{ fontSize: '13px' }}/>
																{constraints['0'][att]}
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
														<i class="fas fa-circle"style={{ fontSize: '13px' }} />{trans.commentsR}
													</h3>
													{KEYS.map((att, index) => {
														return (
															<h5 style={{ paddingLeft: '5%' }}>
																<i class="fas fa-circle" style={{ fontSize: '13px' }} />
																{constraints['0'][att]}
															</h5>
														);
													})}
												</div>
											);
										} else 
										if (Array.isArray(constraints)) return constraints.map((att, index) => {});
										return (
											<h5>
												<i class="fas fa-circle" style={{ fontSize: '13px' }} /> {key} :{' '}
												<span style={{ textAlign: 'center' }} />{' '}
												<span style={{ color: '#9ad1e7' }}>{constraints}</span>{' '}
											</h5>
										);
									}
								}
							})} */}
						</div>
					</BackSide>
				</Flippy>
			);
		});
	};
	render() {
		trans.setLanguage(this.props.lang);
		return (
			<div>
				<div
					style={{
						backgroundColor: '#a3dbf1',
						paddingBottom: '20px',
						paddingTop: '20px',
						textAlign: 'center',
						fontSize: '60px',
						color: 'dark',
						flexDirection: 'row',
						justifyContent: 'flex-end'
					}}
				>
					<h2 style={{ marginTop: '30px', paddingTop: '50px', fontSize: '50px' }}>{trans.title}</h2>
				</div>
				<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'right', justifyContent: 'right' }}>
					{this.getAttributes()}
				</div>
			</div>
		);
	}
}
export default InProgressInvestorCases;
