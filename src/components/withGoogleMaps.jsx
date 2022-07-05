import React from "react";
import GoogleMapsContext from "./GoogleMapsContext";

const withGoogleMaps = (Wrapped) => {
  const WithGoogleMaps = (props) => (
    <GoogleMapsContext.Consumer>
      {({ google, instance }) => (
        <Wrapped {...props} google={google} googleMapsInstance={instance} />
      )}
    </GoogleMapsContext.Consumer>
  );

  return WithGoogleMaps;
};

export default withGoogleMaps;
