import React from "react";

const GeoSearchContext = React.createContext({
  // The actual default value comes from the prop of the component
  // wrapping the `Provider`.
  isRefineOnMapMove: true,
  hasMapMoveSinceLastRefine: false,
  toggleRefineOnMapMove: () => {},
  setMapMoveSinceLastRefine: () => {},
  refineWithInstance: () => {},
});

export default GeoSearchContext;
