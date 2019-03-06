import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibmhpcnNjaGZlbGQiLCJhIjoiY2pzcHR1bXZ0MG9taDN5b2VteHVqNTRoYiJ9._5W0DOZMRMFN9ixppFaP1w';

export default class MapBox extends Component {
	constructor(props) {
		super(props);
		this.mapRef = React.createRef();
		this.map = null;
	}
	componentDidUpdate(prevProps) {
		if(prevProps.locations != this.props.locations && (this.props.locations.length > 0 || this.props.center)) {
			this.initMap();
			this.setCenter();
			this.addMarkers();
		}
	}
	initMap() {
		this.map = new mapboxgl.Map({
			container: this.mapRef.current,
			style: 'mapbox://styles/mapbox/streets-v10',
			center: this.props.locations[0],
			zoom: 12,
		});
		this.map.addControl(new mapboxgl.NavigationControl());
		
	}
	setCenter() {
		this.map.setCenter(this.props.locations[0]);
		new mapboxgl.Marker({ color: 'blue' }).setLngLat(this.props.locations[0]).addTo(this.map);
	}
	addMarkers() {
		if (this.props.locations.length > 0) {
			this.props.locations.forEach((location, i) => {
				if (i != 0) {
					let marker = new mapboxgl.Marker({ color: 'green' });
					marker.setLngLat(location).addTo(this.map);
				}
			});
		}
	}

	render() {
		return (
			<div
				ref={this.mapRef}
				className="map-box-search"
			/>
		);
	}
}
