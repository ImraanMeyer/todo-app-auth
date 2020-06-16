import React from 'react';
import './todo.css'
// import trashIcon from '../assets/trash-alt-regular.svg';

const Todo = ({ todoObject, deleteTodo }) => {
	const { _id, todo } = todoObject;

	return (
		<div className="list-group-item">
			<div className="todo-content">
				<h4>{todo}</h4>
				<div className="d-flex icons">
					<button className="action-buttons btn btn-danger" onClick={deleteTodo.bind(_id,_id)}>
						Delete 
					</button>
				</div>
			</div>
		</div>
	);
};

export default Todo;

// <img style={{color: 'black'}} src={trashIcon} alt="far fa-trash-alt font awesome icon" />
