import React, { Component } from 'react';

import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';


class GoogleMap extends Component {
    render() {
        return (
            <LeafletMap
        center={[this.props.x, this.props.y]}
        zoom={15}
        maxZoom={25}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[this.props.x, this.props.y]}>
          <Popup>
            Klinika: {this.props.naziv}
          </Popup>
        </Marker>
      </LeafletMap>
        );
    }
}

export default GoogleMap;