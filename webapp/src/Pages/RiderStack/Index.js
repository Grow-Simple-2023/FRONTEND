import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';
// import ReactBingmaps from 'bingmaps-react';
import classes from './Index.module.css';

const Rider = () => {
	return (
		<div className={classes.index}>
			<ReactBingmaps
				className="customClass"
				id="eleven"
				center={[13.0827, 80.2707]}
				bingmapKey={
					'AtD6KKbxZbMGumtiusZaHBClfullYMvlqCbIacNNkQQu-ONLx-95xel_a6y45wTH'
				}
				directions={{
					requestOptions: { routeMode: 'driving', maxRoutes: 2 },
					wayPoints: [
						{
							address: 'Allahabad, Uttar Pradesh',
							location: [25.4358, 81.8463],
						},
						{
							address: 'Bengaluru, Karnataka',
							location: [12.9716, 77.5946],
						},
						{
							address: 'Dharwad, Karnataka',
							location: [15.531758, 74.936173],
						},
					],
				}}
				// directions={this.state.directions}
			></ReactBingmaps>
		</div>
	);
};

export default Rider;
