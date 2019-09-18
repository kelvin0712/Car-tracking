import React from 'react';
import {compose, withProps} from "recompose";
import {GoogleMap, withGoogleMap, withScriptjs, Marker} from 'react-google-maps';


const Map = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAKaM2rADsPmZOD6HMxCqmzJYkOPOAbhWY",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `800px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -37.813629, lng: 144.963058 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: -37.813629, lng: 144.963058 }} />}
    </GoogleMap>
  )

export default Map;


