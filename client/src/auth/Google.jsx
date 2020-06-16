import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

const Google = ({ informParent = f => f, thisComponent}) => {
	const responseGoogle = (response) => {
		// request to backend
		// // console.log(response.tokenId);

		axios({
			method: 'POST',
			url: `/api/google-loggin`,
			data: { idToken: response.tokenId }
        })
        .then(response => {
            // // console.log('GOOGLE SIGNING SUCCESS', response)
            // inform parent component
            informParent(response);
        })
        .catch(error => {
            // // console.log('GOOGLE SIGNING ERROR', error.response)
            //
        })
	};

	return (
		<div className="pb-3">
			<GoogleLogin
				clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				render={(renderProps) => (
					<button
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
						className="btn btn-light btn-outline-dark btn-lg btn-block"
					>
                        <i className="fab fa-google pr-2" />
                        {
                            thisComponent === 'Signin' && ('Login with Google')
                        }
                        {
                            thisComponent === 'Signup' && ('Google Signup')
                        }
					</button>
				)}
				cookiePolicy={'single_host_origin'}
			/>
		</div>
	);
};

export default Google;
