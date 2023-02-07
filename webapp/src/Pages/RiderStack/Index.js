import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import classes from './Index.module.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};
const Rider = () => {
	// console.log(window.GeolocationPosition);

	const [deliverylocation, setDeliverylocation] = React.useState({
		latitude: new URL(window.location.href).searchParams.get('latitude'),
		longitude: new URL(window.location.href).searchParams.get('longitude'),
	});
	console.log(deliverylocation);

	const [latitude, setLatitude] = React.useState(0);
	const [longitude, setLongitude] = React.useState(0);
	navigator.geolocation.getCurrentPosition(function (position) {
		console.log('Latitude is :', position.coords.latitude);
		console.log('Longitude is :', position.coords.longitude);
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
	});
	React.useEffect(() => {
		const interval = setInterval(() => {
			// sendrequest();
			var axios = require('axios');
			var config = {
				method: 'post',
				url: `http://10.250.61.56:8040/rider/send-self-location`,
				headers: {
					Credentials: `Bearer ${new URL(window.location.href).searchParams.get(
						'auth'
					)}`,
				},
				data: {
					latitude: latitude,
					longitude: longitude,
					timestamp: new Date().getTime(),
				},
			};
			console.log(config);
			axios(config)
				.then((response) => {
					console.log(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
			// axios call to send location
			navigator.geolocation.getCurrentPosition(function (position) {
				console.log('Latitude is :', position.coords.latitude);
				console.log('Longitude is :', position.coords.longitude);
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
			});
		}, 2000);
		return () => clearInterval(interval);
	}, [latitude, longitude]);

	// React.useEffect(() => {
	// 	console.log('alsdkfjalsdjfladksjflkasdjflkasf');
	// 	var axios = require('axios');
	// 	var config = {
	// 		method: 'get',
	// 		url: `http://10.250.61.56:8040/rider/route/8103129529`,
	// 		headers: {
	// 			Credentials: `Bearer ${window.localStorage.getItem('@jwtauth')}`,
	// 		},
	// 	};

	// 	axios(config)
	// 		.then((response) => {
	// 			console.log(response.data.route.items_in_order);
	// 			setData(response.data.route.items_in_order);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);
	// React.useEffect(() => {
	// 	console.log(data);
	// }, [data]);
	return (
		<div style={{ height: '100vh', maxHeight: '100vh' }}>
			{/* <Modal
				hideBackdrop
				open={open}
				onClose={handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box sx={{ ...style, width: 200 }}>
					<h2 id="child-modal-title">Text in a child modal</h2>

					<Button onClick={handleClose}>Close Child Modal</Button>
				</Box>
			</Modal> */}
			<div style={{ height: '100vh' }}>
				<ReactBingmaps
					className="customClass"
					id="eleven"
					center={[latitude, longitude]}
					zoom={10}
					bingmapKey={
						'AtD6KKbxZbMGumtiusZaHBClfullYMvlqCbIacNNkQQu-ONLx-95xel_a6y45wTH'
					}
					directions={{
						requestOptions: { routeMode: 'driving', maxRoutes: 2 },

						wayPoints: [
							{
								// address: 'Dharwad, Karnataka, India',
								location: [latitude, longitude],
							},
							{
								// address: 'Mumbai, Maharashtra, India',
								location: [
									deliverylocation.latitude,
									deliverylocation.longitude,
								],
							},
						],
					}}
				></ReactBingmaps>
			</div>
			{/* <div style={{ background: 'transparent	', zIndex: 10000000000 }}>
				<Button onClick={handleOpen}>Open Child Modal</Button>
			</div> */}
		</div>
	);
};

export default Rider;
