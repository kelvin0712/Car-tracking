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
  historyRecords: HistoryRecord[]
}> {
  // index of location which has the current InfoWindow
  state = {} as { focusedIndex?: number }

  handleToggle = (index?: number) => {
    let focusedIndex = index
    if (index === this.state.focusedIndex) {
      focusedIndex = undefined
    }

    this.setState({ focusedIndex })
  }

  renderDetails = () => {
    if (this.state.focusedIndex === undefined) return null

    const record = this.props.historyRecords[this.state.focusedIndex]

    return <InfoWindow
      position={{ lat: record.coordinate.x, lng: record.coordinate.y }}
      onCloseClick={() => this.handleToggle()} // set to undefined
    >
      <p>Name: <strong>{record.firstName}</strong>, Vehicle Id: <strong>{record.vehicleRegId}</strong></p>
    </InfoWindow>
  }

  render() {
    return <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: -37.813629, lng: 144.963058 }}
    >
      {this.props.historyRecords.map((point, index) =>
        <Marker
          key={point.id}
          position={{ lat: point.coordinate.x, lng: point.coordinate.y }}
          onClick={() => this.handleToggle(index)}
        >
          {this.state.focusedIndex === index ? this.renderDetails() : null}
        </Marker>
      )}
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
