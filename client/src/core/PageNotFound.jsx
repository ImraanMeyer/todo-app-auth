import React from 'react';
import { withRouter } from 'react-router-dom';
import Layout from './Layout';

const pageNotFound = () => (
	<div
		className="text-center d-flex"
		style={{ height: '90vh', justifyContent: 'center', alignItems: 'center' }}
	>
		<h1>Oof! This page does not exist. 😐</h1>
	</div>
);

export default withRouter(pageNotFound);
