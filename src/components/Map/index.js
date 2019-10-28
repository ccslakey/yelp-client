import React from 'react';
import {
    Map,
    InfoWindow,
    Marker,
	GoogleApiWrapper,
	SearchBox
} from 'google-maps-react';
import _ from 'lodash';

class MapContainer extends React.Component {
	searchBoxRef = null
	mapRef = null
	state = {
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {},
		bounds: null,
		position: {
			lat: 38.659380,
			lon: -121.389150
		},
		markers: [],
	};

	onMapMounted = ref => {
		this.mapRef = ref;
	}

	onBoundsChanged = () => {
		this.setState({
			bounds: this.mapRef.getBounds(),
			center: this.mapRef.getCenter(),
		})
	}

	onSearchBoxMounted = ref => {
		this.searchBoxRef = ref;
	}
	onPlacesChanged = () => {
		const places = this.searchBoxRef.getPlaces();
		const bounds = new this.props.google.maps.LatLngBounds();

		places.forEach(place => {
			if (place.geometry.viewport) {
			bounds.union(place.geometry.viewport)
			} else {
			bounds.extend(place.geometry.location)
			}
		});
		const nextMarkers = places.map(place => ({
			position: place.geometry.location,
		}));
		const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

		this.setState({
			center: nextCenter,
			markers: nextMarkers,
		});
	}

	componentDidMount = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(pos => {
				let position = {
					lat: pos.coords.latitude,
					lon: pos.coords.longitude
				};
				this.setState({position})
			})
		}
	}

	onMarkerClick = (props, marker, e) =>
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		});
	
	onMapClicked = (props) => {
		if (this.state.showingInfoWindow) {
			this.onInfoWindowClose()
		}
	};

	onInfoWindowClose = () => {
		this.setState({
			showingInfoWindow: false,
			activeMarker: null
		})
	}

    render() {

		const style = {
			width: '100%',
			height: '100%'
		}

        return (
			<Map initialCenter={this.state.position}
				 centerAroundCurrentLocation
				 google={this.props.google} 
				 style={style} 
				 ref={this.onMapMounted}
				 onBoundsChanged={this.onBoundsChanged}
				 zoom={14} 
				 onClick={this.onMapClicked}>
                {/* <Marker onClick={this.onMarkerClick}
						name={'Current location'} /> */}
						

                <InfoWindow onClose={this.onInfoWindowClose} visible={this.state.showingInfoWindow}>
                    <div>
                    	<h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDcOuOUyiWpk6iR-J2hPCpcKEjgpE3McP8")
})(MapContainer)