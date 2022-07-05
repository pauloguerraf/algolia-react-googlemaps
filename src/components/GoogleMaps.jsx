import React, { Component, createRef } from "react";
import GoogleMapsContext from "./GoogleMapsContext";

class GoogleMaps extends Component {
  isUserInteraction = true;
  isPendingRefine = false;
  listeners = [];
  mapRef = createRef();

  state = {
    isMapReady: false,
  };

  componentDidMount() {
    const { google, mapOptions } = this.props;

    this.instance = new google.maps.Map(this.mapRef.current, {
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      clickableIcons: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP,
      },
      ...mapOptions,
    });

    this.listeners.push(
      google.maps.event.addListenerOnce(
        this.instance,
        "idle",
        this.setupListenersWhenMapIsReady
      )
    );
  }

  componentDidUpdate() {
    const {
      google,
      initialZoom,
      initialPosition,
      boundingBox,
      boundingBoxPadding,
      shouldUpdate,
    } = this.props;

    if (!shouldUpdate()) {
      return;
    }

    if (boundingBox) {
      this.lockUserInteraction(() => {
        const oldBounds = this.instance.getBounds();

        // south west and north east are swapped
        const newBounds = new google.maps.LatLngBounds(
          boundingBox.southWest,
          boundingBox.northEast
        );

        if (!newBounds.equals(oldBounds)) {
          this.instance.fitBounds(newBounds, boundingBoxPadding);
        }
      });
    } else {
      this.lockUserInteraction(() => {
        this.instance.setZoom(initialZoom);
        this.instance.setCenter(initialPosition);
      });
    }
  }

  componentWillUnmount() {
    this.listeners.forEach((listener) => {
      listener.remove();
    });

    this.listeners = [];
  }

  setupListenersWhenMapIsReady = () => {
    this.listeners = [];

    this.setState({
      isMapReady: true,
      value: {
        google: this.props.google,
        instance: this.instance,
      },
    });

    const onChange = () => {
      if (this.isUserInteraction) {
        this.props.onChange();
      }
    };

    this.listeners.push(this.instance.addListener("center_changed", onChange));
    this.listeners.push(this.instance.addListener("zoom_changed", onChange));
    this.listeners.push(this.instance.addListener("dragstart", onChange));

    this.listeners.push(
      this.instance.addListener("idle", () => {
        if (this.isUserInteraction) {
          this.props.onIdle({
            instance: this.instance,
          });
        }
      })
    );
  };

  lockUserInteraction(functionThatAltersTheMapPosition) {
    this.isUserInteraction = false;
    functionThatAltersTheMapPosition();
    this.isUserInteraction = true;
  }

  render() {
    const { children } = this.props;
    const { isMapReady } = this.state;

    return (
      <div>
        <div ref={this.mapRef} style={{ height: 720, width: "100%" }} />
        {isMapReady && (
          <GoogleMapsContext.Provider value={this.state.value}>
            {children}
          </GoogleMapsContext.Provider>
        )}
      </div>
    );
  }
}

export default GoogleMaps;
