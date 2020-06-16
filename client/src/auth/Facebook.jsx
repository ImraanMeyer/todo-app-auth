import React from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Facebook = ({ informParent = (f) => f, thisComponent }) => {
	const responseFacebook = (response) => {
		// request to backend
		axios({
			method: 'POST',
			url: `/api/facebook-loggin`,
			data: { userID: response.userID, accessToken:response.accessToken }
		})
			.then((response) => {
				// console.log('FACEBOOK SIGNING SUCCESS', response);
				// inform parent component
				informParent(response);
			})
			.catch((error) => {
				console.log('FACEBOOK SIGNING ERROR', error.response);
			});
	};

	return (
		<div className="pb-3">
			<FacebookLogin
				appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
				autoLoad={false}
				callback={responseFacebook}
				render={(renderProps) => (
					<button
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
						className="btn btn-light btn-outline-primary btn-lg btn-block"
					>
                        <i className="fab fa-facebook pr-2" />
                        {
                            thisComponent === 'Signin' && ('Login with Facebook')
                        }
                        {
                            thisComponent === 'Signup' && ('Facebook Signup')
                        }
					</button>
				)}
			/>
		</div>
	);
};

export default Facebook;
