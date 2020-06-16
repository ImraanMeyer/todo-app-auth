import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/Helpers';
import Todo from './Todo';

const Todos = ({ history }) => {
	// Signup State
	const [ values, setValues ] = useState({
		todo: '',
		todos: [],
		loading: true,
	});

	const { todo, todos, loading } = values;

	const token = getCookie('token');

	useEffect(() => {
		loadTodos();
	}, []);

	const loadTodos = () => {
		axios({
			method: 'GET',
			url: `/api/todos`,
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((response) => {
				// console.log('PRIVATE PROFILE UPDATE', response)
				const todos = response.data.todos;
				setValues({ ...values, todos, todo: '', loading: false });
			})
			.catch((error) => {
				// console.log('LOAD TODOS ERROR', error.response.data.error);
				if (error.response.status === 401) signout(() => history.push('/'));
			});
	};

	// Get user input from form
	const handleChange = (e) => setValues({ ...values, todo: e.target.value });

	const addTodo = (e) => {
		e.preventDefault();
		axios({
			method: 'POST',
			url: `/api/todos/new`,
			data: { todo },
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((response) => {
				setValues({ ...values, todo: ' ' });
				toast.success(response.data.message);
			})
			.then(loadTodos)
			.catch((error) => {
				toast.error(error.response.data.error);
			});
	};

	const deleteTodo = (id) => {
		axios({
			method: 'DELETE',
			url: `/api/todos/${id}`,
			data: { todo },
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((response) => {
				toast.success(response.data.message);
			})
			.then(loadTodos)
			.catch((error) => {
				toast.error(error.response.data.error);
			});
	};

	const todoForm = () => (
		<form onSubmit={addTodo}>
			<div className="form-group">
				<label className="text-muted">Insert a Todo!</label>
				<input onChange={handleChange} value={todo} type="text" required className="form-control" />
			</div>
		</form>
	);

	return (
		<div className="col-md-6 offset-md-3">
			<ToastContainer />
			<h1 className="p-5 text-center">Todo Page</h1>
			{todoForm()}

			{loading == true ? (
				<h1 className="pt-5 text-center ">Loading...</h1>
			) : todos.length == 0 ? (
				<React.Fragment>
					<h3 className="pt-5 text-center">No Todos!</h3>
					<p className="lead text-center">Add a todo by completing the form</p>
				</React.Fragment>
			) : (
				<ul className="list-group list-group-flush">
					{todos.map((todoObject) => (
						<Todo
							todoObject={todoObject}
							key={todoObject._id}
							deleteTodo={deleteTodo}
						/>
					))}
				</ul>
			)}
		</div>
	);
};

export default Todos;
