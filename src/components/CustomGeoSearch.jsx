import { useRef, useState } from "react";
import { useConnector } from "react-instantsearch-hooks-web";
import connectGeoSearch from "instantsearch.js/es/connectors/geo-search/connectGeoSearch";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Marker from "./Marker";
import GoogleMaps from "./GoogleMaps";
import Provider from "./Provider";
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export function useGeoSearch(props) {
  return useConnector(connectGeoSearch, props);
}

export function CustomGeoSearch(props) {
  const {
    items,
    position,
    currentRefinement,
    refine,
    sendEvent,
    clearMapRefinement,
    isRefinedWithMap,
    toggleRefineOnMapMove,
    isRefineOnMapMove,
    setMapMoveSinceLastRefine,
    hasMapMoveSinceLastRefine,
  } = useGeoSearch(props);

  const { zoom } = props;

  const render = (status) => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    if (status === Status.SUCCESS)
      return (
        <Provider
          google={window.google}
          hits={items}
          isRefineOnMapMove={isRefineOnMapMove}
          hasMapMoveSinceLastRefine={hasMapMoveSinceLastRefine}
          isRefineEnable={isRefineOnMapMove}
          refine={refine}
          toggleRefineOnMapMove={toggleRefineOnMapMove}
          setMapMoveSinceLastRefine={setMapMoveSinceLastRefine}
        >
          {({
            boundingBox,
            boundingBoxPadding,
            onChange,
            onIdle,
            shouldUpdate,
          }) => (
            <GoogleMaps
              testID="GoogleMaps"
              google={window.google}
              initialZoom={4}
              hits={items}
              initialPosition={position || { lat: 0, lng: 0 }}
              boundingBox={boundingBox}
              boundingBoxPadding={boundingBoxPadding}
              onChange={onChange}
              onIdle={onIdle}
              shouldUpdate={shouldUpdate}
              mapOptions={{
                center: {
                  lat: 38.55,
                  lng: -95.655,
                },
                restriction: {
                  latLngBounds: {
                    north: 53.650178,
                    south: 19.485761,
                    west: -131.348594,
                    east: -61.036094,
                  },
                  strictBounds: false,
                },
                zoom: zoom,
              }}
            >
              {items.map((item) => (
                <Marker key={item.objectID} hit={item} />
              ))}
            </GoogleMaps>
          )}
        </Provider>
      );
  };

  return (
    <>
      <Wrapper apiKey={apiKey} render={render}></Wrapper>
    </>
  );
}

export default CustomGeoSearch;
