import React from 'react';
import { redirect } from 'react-router-dom';
import Form from '../../components/Form';
import { apiendpoint } from '../../constants/constans';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const userInfo = (user) => {
		console.log(user);
	};

	const handleLogIn = async (user) => {
		await fetch(`${apiendpoint}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// Authorization: `Bearer ${jwt}`
			},
			body: JSON.stringify({
				phone_no: user.userName,
				password: user.password,
			}),
		})
			.then((res) => {
				console.log(res.status);
				if (res.ok) return res.json();
				else throw new Error('Unauthorized');
			})
			.then((json) => {
				console.log(JSON.stringify(json, null, 2));
				console.log(user.userName);
				const saveData = async () => {
					localStorage.setItem('@jwtauth', json.token.access_token);
					localStorage.setItem('userid', String(user.userName));
				};
				saveData();
				console.log('role is ' + json.role);
				if (json.role === 'ADMIN') {
					navigate('/overview');
				} else if (json.role === 'RIDER') {
					navigate('/rider');
					// alert("Rider");
				}
			})
			.catch(console.log);
	};
	return (
		<div>
			<Form userInfo={userInfo} handleLogIn={handleLogIn} />
		</div>
	);
};

export default Login;
