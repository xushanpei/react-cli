import React, { Component } from "react";
import { Button, Input } from "antd";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./Minimap";

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
      style: "mapbox://styles/mapbox/light-v10",
      center: [118.78, 32.07], //地图中心经纬度
      zoom: 15.5, //缩放级别
      minZoom: 0,
      maxZoom: 24,
      pitch: 45,
      bearing: -17.6,
      container: "map",
      // should be a function; will be bound to Minimap
      zoomAdjust: null,

      // if parent map zoom >= 18 and minimap zoom >= 14, set minimap zoom to 16
      zoomLevels: [[18, 14, 16], [16, 12, 14], [14, 10, 12], [12, 8, 10], [10, 6, 8]]
      // maxBounds: bounds
    });

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
      var layers = map.getStyle().layers;

      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
          labelLayerId = layers[i].id;
          break;
        }
      }
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

      map.addLayer({
        id: "point",
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
                  coordinates: [118.79, 32.06]
                }
              }
            ]
          }
        },
        layout: {
          "icon-image": "pulsing-dot"
        }
      });
      map.addLayer(
        {
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            "fill-extrusion-height": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "height"]],
            "fill-extrusion-base": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "min_height"]],
            "fill-extrusion-opacity": 0.6
          }
        },
        labelLayerId
      );
    });

    map.on("click", "points", function(e) {
      console.log(e);
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description =
        '<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year\'s <a href="http://dandiesandquaintrelles.com/2012/04/the-seersucker-social-is-set-for-june-9th-save-the-date-and-start-planning-your-look/" target="_blank" title="Opens in a new window">Seersucker Social</a> bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>';

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      })
    );
    map.addControl(new mapboxgl.Minimap(), "bottom-right");
    //设置语言
    const language = new MapboxLanguage({ defaultLanguage: "zh" });
    map.addControl(language);
  }

  render() {
    return (
      <div>
        <div id="map" className="map" style={{ height: "900px" }}></div>
      </div>
    );
  }
}

export default MapBox;
