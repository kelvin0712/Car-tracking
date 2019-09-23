import React from "react";

import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps";
import { HistoryRecord } from "../../api";

class Map extends React.Component<{
  markerForId?: number,
  historyRecords: HistoryRecord[]
}> {
  // index of location which has the current InfoWindow
  state = {} as { focusedId?: number }

  /**
   * Toggle focusedId value in the local state 
   */
  handleToggle = (id: number) => {
    let focusedId: number | undefined = id
    if (id === this.state.focusedId) {
      focusedId = undefined
    }

    this.setState({ focusedId })
  }

  /**
   * Render an information window of a driver when the marker is clicked 
   */
  renderDetails = (id: number) => {
    const record = this.props.historyRecords.find(_ => id === _.id)
    if (!record) return null

    return <InfoWindow
      position={{ lat: record.coordinate.x, lng: record.coordinate.y }}
      onCloseClick={() => this.handleToggle(id)} // set to undefined
    >
      <p>Name: <strong>{record.firstName}</strong>, Vehicle Id: <strong>{record.vehicleRegId}</strong></p>
    </InfoWindow>
  }

  render() {
    return <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: -37.813629, lng: 144.963058 }}
    >
      {this.props.historyRecords.map(record => {
        const { id } = record

        return <Marker
          key={id}
          position={{ lat: record.coordinate.x, lng: record.coordinate.y }}
          onClick={() => this.handleToggle(id)}
        >
          {(this.state.focusedId === id) || (this.props.markerForId === id)
            ? this.renderDetails(id)
            : null}
        </Marker>
      })}
    </GoogleMap>
  }
}

export default Object.assign(
  withScriptjs(withGoogleMap(Map)), {
  defaultProps: {
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAKaM2rADsPmZOD6HMxCqmzJYkOPOAbhWY",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }
})

