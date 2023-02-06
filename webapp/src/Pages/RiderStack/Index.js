import React from 'react';
import ReactBingmaps from 'bingmaps-react';
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
				// directions={this.state.directions}
			></ReactBingmaps>
		</div>
	);
};

export default Rider;
