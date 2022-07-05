import React from "react";

const GoogleMapsContext = React.createContext({
  // We mount the context only once the map is created. Thus, we can assume
  // that the value provided through the context is never `undefined`. We can't
  // create an instance at that point, hence the cast.
  google: {},
  instance: {},
});

export default GoogleMapsContext;
