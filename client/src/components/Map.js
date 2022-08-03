/* global kakao */
import React, { useEffect } from "react";
import cn from "classnames";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const { kakao } = window;

const Map = ({x, y}) => {
  useEffect(() => {
    let mapContainer = document.getElementById("map");

    let mapOption = {
      center: new kakao.maps.LatLng(Number(y), Number(x)),
      level: 3,
    };
    var map = new kakao.maps.Map(mapContainer, mapOption);
    var markerPosition  = new kakao.maps.LatLng(Number(y), Number(x)); 
    var marker = new kakao.maps.Marker({
      position: markerPosition
  });
  marker.setMap(map);
  }, []);

  return (
    <div
      className={cn("MapContainer")}
      id="map"
      style={{ width: "100%", height: "100%", overflow: "none" }}
    ></div>
  );
};

export default Map;
