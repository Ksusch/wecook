import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

// import api from "../api/api";

mapboxgl.accessToken =
	'pk.eyJ1IjoibmhpcnNjaGZlbGQiLCJhIjoiY2pzcHR1bXZ0MG9taDN5b2VteHVqNTRoYiJ9._5W0DOZMRMFN9ixppFaP1w';

export default class MapBox extends Component {
	constructor(props) {
		super(props);
		this.mapRef = React.createRef();
		this.map = null;
	}
	componentDidMount() {
		this.initMap();
		this.setCenter();
		this.addMarkers();
	}
	initMap() {
		this.map = new mapboxgl.Map({
			container: this.mapRef.current,
			style: 'mapbox://styles/mapbox/streets-v10',
			center: [13, 52],
			zoom: 12,
		});
		this.map.addControl(new mapboxgl.NavigationControl());
	}
	setCenter() {
		let marker = new mapboxgl.Marker({ color: 'red' });
		if (!this.props.center && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				let lng = position.coords.longitude,
					lat = position.coords.latitude;
				this.map.setCenter([lng, lat]);
				marker.setLngLat([lng, lat]).addTo(this.map);
			});
		} else if (this.props.center) {
			this.map.setCenter(this.props.center);
			marker.setLngLat(this.props.center).addTo(this.map);
		}
	}
	addMarkers() {
		if (this.props.locations) {
			this.props.locations.forEach(location => {
				new mapboxgl.Marker({ color: 'green' })
					.setLngLat(location)
					.addTo(this.map);
			});
		}
	}

	render() {
		return (
			<div
				ref={this.mapRef}
				syle={{
					height: [this.props.height],
					width: [this.props.width],
				}}
				className="map"
			/>
		);
	}
}
