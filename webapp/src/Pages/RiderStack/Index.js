import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';
// import ReactBingmaps from 'bingmaps-react';
import classes from './Index.module.css';

const Rider = () => {
	// console.log(window.GeolocationPosition);
	const [latitude, setLatitude] = React.useState(0);
	const [longitude, setLongitude] = React.useState(0);
	navigator.geolocation.getCurrentPosition(function (position) {
		console.log('Latitude is :', position.coords.latitude);
		console.log('Longitude is :', position.coords.longitude);
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
	});

	const [data, setData] = React.useState([]);
	const [curInd, setCurInd] = React.useState(0);
	React.useEffect(() => {
		console.log('alsdkfjalsdjfladksjflkasdjflkasf');
		var axios = require('axios');
		var config = {
			method: 'get',
			url: `http://10.250.61.56:8040/rider/route/8103129529`,
			headers: {
				Authorization: `Bearer ${window.localStorage.getItem('@jwtauth')}`,
			},
		};

		axios(config)
			.then((response) => {
				console.log(response.data.route.items_in_order);
				setData(response.data.route.items_in_order);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	React.useEffect(() => {
		console.log(data);
	}, [data]);
	return (
		<div className={classes.index}>
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
							location: [latitude, longitude],
						},
						{
							address: `${data[curInd].address}`,
							location: [
								data[curInd].location.latitude,
								data[curInd].location.longitude,
							],
						},
					],
				}}
			></ReactBingmaps>
		</div>
	);
};

export default Rider;
