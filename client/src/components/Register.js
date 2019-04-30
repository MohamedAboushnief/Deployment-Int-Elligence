import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepIcon from '@material-ui/core/StepIcon';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';
import axios from 'axios';
import { Hidden } from '@material-ui/core';
import trans from './translations/registerTranslation';

const styles = (theme) => ({
	root: {
		width: '90%'
	},
	button: {
		marginTop: theme.spacing.unit,
		marginRight: theme.spacing.unit
	},
	actionsContainer: {
		marginBottom: theme.spacing.unit * 2
	},
	resetContainer: {
		padding: theme.spacing.unit * 3
	}
});

function getSteps() {
	return [ <h3>{trans.step1}</h3>, <h3>{trans.step2}</h3>, <h3>{trans.step3}</h3> ];
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return <h3>{trans.info}</h3>;
		case 1:
			return <h3>{trans.personal}</h3>;
		case 2:
			return;
		default:
			return 'Unknown step';
	}
}

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userType: 'Investor',
			name: '',
			gender: 'Male',
			nationality: 'Egyptian',
			identificationType: 'National ID',
			identificationNumber: '',
			birthdate: '',
			address: '',
			email: '',
			password: '',
			telephone: '',
			fax: '',
			investorType: 'Person',
			nationalities: [],
			errors: {},
			password_confirm: '',
			activeStep: 0
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	changeHandler = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(this.state.investorType);
	}

	handleSubmit(e) {
		e.preventDefault();
		var payload = {
			userType: this.state.userType,
			name: this.state.name,
			gender: this.state.gender,
			nationality: this.state.nationality,
			identificationType: this.state.identificationType,
			identificationNumber: this.state.identificationNumber,
			birthdate: this.state.birthdate,
			address: this.state.address,
			email: this.state.email,
			password: this.state.password,
			telephone: this.state.telephone,
			fax: this.state.fax,
			investorType: this.state.investorType
		};
		this.props.registerUser(payload, this.props.history);
		
		// alert("You have registered successfully. Congratulations :)! ")
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	componentDidMount() {
		axios.get('/routes/api/nationalities').then((res) => {
			this.setState({ nationalities: res.data.data });
		});
	}

	validateForm() {
		return (
			this.state.email.length >= 3 &&
			this.state.email.length <= 50 &&
			this.state.gender.length >= 4 &&
			this.state.gender.length <= 6 &&
			this.state.identificationNumber.length >= 8 &&
			this.state.identificationNumber.length <= 50 &&
			this.state.address.length >= 5 &&
			this.state.address.length <= 50 &&
			this.state.telephone.length >= 4 &&
			this.state.telephone.length <= 15 &&
			this.state.fax.length >= 5 &&
			this.state.fax.length <= 20 &&
			this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
			this.state.password.length >= 8 &&
			this.state.password_confirm.length <= 20 &&
			this.state.password === this.state.password_confirm
		);
	}

	validateForm2() {
		return (
			this.state.gender.length >= 4 &&
			this.state.gender.length <= 6 &&
			this.state.identificationNumber.length >= 8 &&
			this.state.identificationNumber.length <= 50 &&
			this.state.address.length >= 5 &&
			this.state.address.length <= 50 &&
			this.state.telephone.length >= 4 &&
			this.state.telephone.length <= 15 &&
			this.state.fax.length >= 5 &&
			this.state.fax.length <= 20 &&
			this.state.activeStep === 1
		);
	}

	validateForm1() {
		return (
			this.state.email.length >= 3 &&
			this.state.email.length <= 50 &&
			this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
			this.state.password.length >= 8 &&
			this.state.password_confirm.length <= 20 &&
			this.state.password === this.state.password_confirm
		);
	}

	handleNext = () => {
		this.setState((state) => ({
			activeStep: state.activeStep + 1
		}));
	};

	handleBack = () => {
		this.setState((state) => ({
			activeStep: state.activeStep - 1
		}));
	};

	handleReset = () => {
		this.setState({
			activeStep: 0
		});
	};

	render() {
		trans.setLanguage(this.props.lang);
		const { classes } = this.props;
		const steps = getSteps();
		const { activeStep } = this.state;
		const { errors } = this.state;

		var basic = (
			<div>
				<form>
					<div className="form-group">
						<MDBInput
							label={trans.name}
							type="text"
							className={classnames('form-control form-control-lg', {
								'is-invalid': errors.Name
							})}
							name="name"
							onChange={this.changeHandler}
							value={this.state.name}
							required
						/>
						{errors.name && <div className="invalid-feedback">{errors.name}</div>}
					</div>
					<br />

					<div className="form-group">
						<MDBInput
							label={trans.email}
							type="email"
							className={classnames('form-control form-control-lg', {
								'is-invalid': errors.Email
							})}
							name="email"
							onChange={this.changeHandler}
							value={this.state.email}
							required
						/>
						{errors.email && <div className="invalid-feedback">{errors.email}</div>}
					</div>
					<br />

					<div className="form-group">
						<MDBInput
							label={trans.password}
							type="password"
							className={classnames('form-control form-control-lg', { 'is-invalid': errors.Password })}
							name="password"
							onChange={this.changeHandler}
							value={this.state.password}
							required
						/>

						{errors.password && <div className="invalid-feedback">{errors.password}</div>}
					</div>
					<br />

					<div className="form-group">
						<MDBInput
							label={trans.confirmPassword}
							type="password"
							className={classnames('form-control form-control-lg', {
								'is-invalid': errors.confirm_password
							})}
							name="password_confirm"
							onChange={this.changeHandler}
							value={this.state.password_confirm}
							required
						/>
						{errors.password_confirm && <div className="invalid-feedback">{errors.password_confirm}</div>}
					</div>
				</form>
			</div>
		);

		var personal = (
			<div>
				<form>
					<MDBRow>
						<MDBCol>
							<div className="form-group">
								<label htmlFor="gender">{trans.gender}</label>
								<select
									className="form-control"
									id="exampleFormControlSelect1"
									name="gender"
									onChange={this.changeHandler}
									value={this.state.gender}
								>
									<option>Male</option>
									<option>Female</option>
								</select>
							</div>
						</MDBCol>
					</MDBRow>

					<div className="form-group">
						<label htmlFor="Nationality">{trans.nationality}</label>
						<select
							className="form-control"
							id="exampleFormControlSelect1"
							name="nationality"
							onChange={this.changeHandler}
							value={this.state.nationality}
						>
							{this.state.nationalities.map((nat) => <option value={nat.name}>{nat.name}</option>)};
						</select>
					</div>

					<MDBRow>
						<MDBCol>
							<div className="form-group">
								<label htmlFor="identificationType">{trans.identificationType}</label>
								<select
									className="form-control"
									id="exampleFormControlSelect1"
									name="identificationType"
									onChange={this.changeHandler}
									value={this.state.identificationType}
								>
									<option>National ID</option>
									<option>Passport</option>
								</select>
							</div>
						</MDBCol>
					</MDBRow>

					<div className="form-group">
						<MDBInput
							label={trans.identificationNumber}
							type="text"
							className={classnames('form-control form-control-lg', { 'is-invalid': errors.fax })}
							name="identificationNumber"
							onChange={this.changeHandler}
							value={this.state.identificationNumber}
							required
						/>
						{errors.identificationNumber && (
							<div className="invalid-feedback">{errors.identificationNumber}</div>
						)}
					</div>

					<div className="form-group">
						<MDBInput
							label={trans.birthdate}
							type="text"
							className={classnames('form-control form-control-lg', { 'is-invalid': errors.birthdate })}
							name="birthdate"
							onChange={this.changeHandler}
							value={this.state.birthdate}
							required
						/>
						{errors.birthdate && <div className="invalid-feedback">{errors.birthdate}</div>}
					</div>

					<div className="form-group">
						<MDBInput
							label={trans.address}
							type="text"
							className={classnames('form-control form-control-lg', { 'is-invalid': errors.address })}
							name="address"
							onChange={this.changeHandler}
							value={this.state.address}
							required
						/>
						{errors.address && <div className="invalid-feedback">{errors.address}</div>}
					</div>

					<div className="form-group">
						<MDBInput
							label={trans.telephone}
							type="text"
							className={classnames('form-control form-control-lg', { 'is-invalid': errors.telephone })}
							name="telephone"
							onChange={this.changeHandler}
							value={this.state.telephone}
						/>
						{errors.telephone && <div className="invalid-feedback">{errors.telephone}</div>}
					</div>

					<div className="form-group">
						<MDBInput
							label={trans.fax}
							type="text"
							className={classnames('form-control form-control-lg', { 'is-invalid': errors.fax })}
							name="fax"
							onChange={this.changeHandler}
							value={this.state.Fax}
						/>
						{errors.fax && <div className="invalid-feedback">{errors.fax}</div>}
					</div>

					<MDBRow>
						<MDBCol>
							<div className="form-group">
								<label htmlFor="investorType">{trans.investorType}</label>
								<select
									className="form-control"
									id="exampleFormControlSelect1"
									name="investorType"
									onChange={this.changeHandler}
									value={this.state.investorType}
								>
									<option>Person</option>
								</select>
							</div>
						</MDBCol>
					</MDBRow>
				</form>
			</div>
		);

		var Submit = (
			<div>
				<form>
					<div className="form-group">
						<Button
							type="submit"
							disabled={!this.validateForm()}
							onClick={(e) => this.handleSubmit(e)}
							className="btn-block btn-rounded z-depth-1a"
							variant="omar"
							style={{ width: '100px',backgroundColor:"#a3dbf1" }} 
							
						>
							{trans.submit}
						</Button>
					</div>
				</form>

				{/* <button
									onClick={(e) => this.handleSubmit(e)}
									type="submit"
								
								>
									{trans.loginbutton}
								</button> */}
			</div>
		);

		return (
			<div style={{ paddingRight: '200px' }}>
			<br/>
			<br/>
			<br/>
				<div className={classes.root}>
					<Stepper activeStep={activeStep} orientation="vertical">
						{steps.map((label, index) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
								<StepContent>
									<Typography>{getStepContent(index)}</Typography>
									<div className={classes.actionsContainer}>
										{this.state.activeStep === 0 ? basic : null}
										{this.state.activeStep === 1 ? personal : null}
										{this.state.activeStep === 2 ? Submit : null}

										<div>
											<Button
												disabled={activeStep === 0}
												onClick={this.handleBack}
												className="btn-block btn-rounded z-depth-1a"
												variant="omar"
												style={{ width: '100px',backgroundColor:"#a3dbf1" }}  
											>
												Back
											</Button>
											<br/>
											<br/>
											<Button
												className="btn-block btn-rounded z-depth-1a"
												variant="omar"
												style={{ width: '100px',backgroundColor:"#a3dbf1" }}  
												onClick={this.handleNext}
												disabled={
													this.state.activeStep === 0 ? (
														!this.validateForm1()
													) : this.state.activeStep === 1 ? (
														!this.validateForm2()
													) : null
												}
											>
												{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
											</Button>
										</div>
									</div>
								</StepContent>

								<StepContent />
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length && (
						<Paper square elevation={0} className={classes.resetContainer}>
							<Typography>{trans.finish}</Typography>
						</Paper>
					)}
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	classes: PropTypes.object
};

Register.propTypes = {
	registerUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	errors: state.errors
});

export default withStyles(styles)(connect(mapStateToProps, { registerUser })(withRouter(Register)));
