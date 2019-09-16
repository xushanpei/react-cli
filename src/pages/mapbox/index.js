import React, { Component } from "react";
import { Button, Input } from "antd";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";

class MapBox extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    mapboxgl.accessToken = "pk.eyJ1IjoieHVzaGFucGVpIiwiYSI6ImNrMGdmc2k0MjA2bHczbW83bWk4d3o1NXAifQ.V7asl3c2e-eKGqjERiwneQ";

    //设置地图区域
    let bounds = [
      [118.21, 28.11], // Southwest coordinates，西南坐标
      [122.4, 31.33] // Northeast coordinates，东北坐标
    ];

    const map = new mapboxgl.Map({
      style: "mapbox://styles/mapbox/navigation-preview-night-v2",
      center: [118.78, 32.07], //地图中心经纬度
      zoom: 11.5, //缩放级别
      minZoom: 9,
      maxZoom: 24,
      pitch: 45,
      bearing: -17.6,
      container: "map"
      // maxBounds: bounds
    });
    //设置语言
    const language = new MapboxLanguage({ defaultLanguage: "zh" });
    map.addControl(language);

    var size = 200;

    var pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

      onAdd: function() {
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext("2d");
      },

      render: function() {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;

        var radius = (size / 2) * 0.3;
        var outerRadius = (size / 2) * 0.7 * t + radius;
        var context = this.context;

        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")";
        context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 100, 100, 1)";
        context.strokeStyle = "white";
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // update this image's data with data from the canvas
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        // keep the map repainting
        map.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
      }
    };

    map.on("load", function() {
      map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

      map.addLayer({
        id: "points",
        type: "symbol",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [118.78, 32.07]
                }
              }
            ]
          }
        },
        layout: {
          "icon-image": "pulsing-dot"
        }
      });
    });
  }

  render() {
    return (
      <div>
        <div id="map" className="map" style={{ height: "2000px" }}></div>
      </div>
    );
  }
}

export default MapBox;
