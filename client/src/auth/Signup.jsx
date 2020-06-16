import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { isAuth, authenticate } from './Helpers';

import 'react-toastify/dist/ReactToastify.min.css';
import Google from './Google';
import Facebook from './Facebook';

const Signup = ({ history }) => {
	// Signup State
	const [ values, setValues ] = useState({
		name: '',
		email: '',
		password: '',
		buttonText: 'Submit',
		thisComponent: 'Signup'
	});

	const { name, email, password, buttonText, thisComponent } = values;

	const handleChange = (name) => (e) => {
		setValues({ ...values, [name]: e.target.value });
	};

	const informParent = (response) => {
		authenticate(response, () => {
			toast.success(`Hey ${response.data.user.name}, Welcome back!`);
			isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
		});
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, buttonText: 'Submitting' });

		axios
			.post(`/api/signup`, { name, email, password })
			.then((response) => {
				// console.log('SIGNUP SUCCESS', response);
				setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
				toast.success(response.data.message);
			})
			.catch((error) => {
				// console.log('SIGNUP ERROR', error.response.data);
				setValues({ ...values, buttonText: 'Submit' });
				toast.error(error.response.data.error);
			});
	};

	const signupForm = () => (
		<form>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input onChange={handleChange('name')} value={name} type="text" className="form-control" />
			</div>

			<div className="form-group">
				<label className="text-muted">Email</label>
				<input onChange={handleChange('email')} value={email} type="email" className="form-control" />
			</div>

			<div className="form-group">
				<label className="text-muted">Password</label>
				<input onChange={handleChange('password')} value={password} type="password" className="form-control" />
			</div>

			<div>
				<button className="btn btn-primary" onClick={clickSubmit}>
					{buttonText}
				</button>
			</div>
		</form>
	);

	return (
		<div className="col-md-6 offset-md-3">
			<ToastContainer />
			{isAuth() ? <Redirect to="/" /> : null}
			<h1 className="p-5 text-center">Signup</h1>
			<div className="p-2 bd-highlight" style={{ justifyContent: 'space-between' }}>
				<Google informParent={informParent} thisComponent={thisComponent} />
				<Facebook informParent={informParent} thisComponent={thisComponent} />
			</div>
			{signupForm()}
		</div>
	);
};

export default Signup;
