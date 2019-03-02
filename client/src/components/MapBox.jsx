import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
// import api from "../api/api";

mapboxgl.accessToken =
	"pk.eyJ1IjoibmhpcnNjaGZlbGQiLCJhIjoiY2pzcHR1bXZ0MG9taDN5b2VteHVqNTRoYiJ9._5W0DOZMRMFN9ixppFaP1w";

export default class MapBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [], //TODO: move these to props and remove state
			userCoordinates: [],
		};
		this.mapRef = React.createRef();
		this.map = null;
		this.markers = [];
	}
	initMap() {
		this.map = new mapboxgl.Map({
			container: this.mapRef.current,
			style: "mapbox://styles/mapbox/streets-v10",
			center: [13, 52],
			zoom: 12,
		});
		this.map.addControl(new mapboxgl.NavigationControl());
	}
	componentDidMount() {
		this.initMap();
		if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log("geolocation active ", position)
				let lng = position.coords.longitude,
					lat = position.coords.latitude,
					marker = new mapboxgl.Marker({ color: "blue" });
				this.map.setCenter([lng, lat]);
				marker.setLngLat([lng, lat]).addTo(this.map);
			});
		}
	}

	render() {
		return <div ref={this.mapRef} className="map" />;
	}
}
