import React from "react";
import { compose, withProps, withStateHandlers } from 'recompose'
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps";

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAKaM2rADsPmZOD6HMxCqmzJYkOPOAbhWY",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `650px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withStateHandlers(() => ({
    points: null,
  }), {
    onToggleOpen: ({ points }) => (point) => ({
      points: point,
    }),
    clearState: ({ points }) => () => ({
      points: null,
    })
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -37.813629, lng: 144.963058 }}
  >
    {props.isMarkerShown &&
      props.location.map(point => (
        <Marker
          key={point.id}
          position={{ lat: point.coordinate.x, lng: point.coordinate.y }} 
          onClick={() => props.onToggleOpen(point)}
        > 
         {props.points && <InfoWindow position={{lat: props.points.coordinate.x , lng:props.points.coordinate.y}} onCloseClick={props.clearState}>
           <p>name: {props.points.name}, vehicle id: {props.points.vehicleid}</p>
         </InfoWindow>} 
        </Marker>
      ))}

    
  </GoogleMap>
));

export default Map;
