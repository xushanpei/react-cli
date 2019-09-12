import React, { Component } from "react";
import { Button, Input } from "antd";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";

class MapBox extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    mapboxgl.accessToken = "pk.eyJ1IjoieHVzaGFucGVpIiwiYSI6ImNqenl5M2t0aTA0dzczY3AzdXJoajB6emcifQ.Gpduip9bhda1q8BX2Xc2UQ";

    //设置地图区域
    let bounds = [
      [118.21, 28.11], // Southwest coordinates，西南坐标
      [122.4, 31.33] // Northeast coordinates，东北坐标
    ];

    const map = new mapboxgl.Map({
      style: "mapbox://styles/mapbox/navigation-guidance-day-v2",
      center: [118.78, 32.07], //地图中心经纬度
      zoom: 11.5, //缩放级别
      minZoom: 9,
      maxZoom: 24,
      pitch: 45,
      bearing: -17.6,
      container: "map",
      maxBounds: bounds
    });
    //设置语言
    const language = new MapboxLanguage({ defaultLanguage: "zh" });
    map.addControl(language);

    setTimeout(() => {
      map.addLayer({
        id: "room-extrusion",
        type: "fill-extrusion",
        source: "museumData",
        paint: {
          // See the Mapbox Style Spec for details on property functions
          // https://www.mapbox.com/mapbox-gl-style-spec/#types-function
          "fill-extrusion-color": {
            // Get the fill-extrusion-color from the source 'color' property.
            property: "color" /* 从source中获取对应属性的属性值 */,
            type: "identity" /* input as output */
          },
          "fill-extrusion-height": {
            // Get fill-extrusion-height from the source 'height' property.
            property: "height",
            type: "identity"
          },
          "fill-extrusion-base": {
            // Get fill-extrusion-base from the source 'base_height' property.
            property: "base_height",
            type: "identity"
          },
          // Make extrusions slightly opaque for see through indoor walls.
          "fill-extrusion-opacity": 0.5 /* 透明度  */
        }
      });
    }, 1000);
  }

  render() {
    return (
      <div>
        <div id="map" className="map"></div>
      </div>
    );
  }
}

export default MapBox;
