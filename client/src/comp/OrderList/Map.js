import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import RoomIcon from "@material-ui/icons/Room";
const MapData = () => (
  <div>
    <RoomIcon style={{ transform: "scale(1.5)", color: "#ca3e47" }} />
  </div>
);

class Map extends Component {
  state = {
    center: {
      lat: this.props.lat,
      lng: this.props.lng
    },
    zoom: 12
  };
  componentDidMount() {
    setInterval(() => {
      this.updateCenter();
    }, 500);
  }
  updateCenter = () => {
    this.setState({
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      }
    });
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "30vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBrd8VRjt7GpeDLrJsCqpItJN94ZIxY_PA" }}
          center={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <MapData lat={this.props.lat} lng={this.props.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
