import { Component } from "react";
import { registerEvents, createFilterProps } from "./utils";
import withGoogleMaps from "./withGoogleMaps.jsx";

const eventTypes = {
  onClick: "click",
  onDoubleClick: "dblclick",
  onMouseDown: "mousedown",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
};

const excludes = ["children"].concat(Object.keys(eventTypes));
const filterProps = createFilterProps(excludes);

export class Marker extends Component {
  componentDidMount() {
    const { google, googleMapsInstance, hit, ...props } = this.props;

    this.instance = new google.maps.Marker({
      ...filterProps(props),
      map: googleMapsInstance,
      position: hit._geoloc,
    });

    this.removeEventsListeners = registerEvents(
      eventTypes,
      this.props,
      this.instance
    );
  }

  componentDidUpdate() {
    this.removeEventsListeners();

    this.removeEventsListeners = registerEvents(
      eventTypes,
      this.props,
      this.instance
    );
  }

  componentWillUnmount() {
    this.instance.setMap(null);
  }

  render() {
    return null;
  }
}

export default withGoogleMaps(Marker);
