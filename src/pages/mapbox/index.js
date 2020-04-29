import React, { Component } from "react";
import { Button, Input } from "antd";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./Minimap";
import "../../assets/mapbox-gl-geocoder.css";
import "../../assets/mapbox-gl.css";
import gzm from "./gzm.png"

class MapBox extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    mapboxgl.accessToken = "pk.eyJ1IjoieHVzaGFucGVpIiwiYSI6ImNqenl5M2t0aTA0dzczY3AzdXJoajB6emcifQ.Gpduip9bhda1q8BX2Xc2UQ";

    //设置地图区域
    // let bounds = [
    //   // [-80.425, 46.437],
    //   [-71.516, 46.437],
    //   // [-71.516, 37.936],
    //   [-80.425, 37.936]
    // ];

    var mapStyle = {
      "version": 8,
      "name": "Dark",
      "sources": {
        "mapbox": {
          "type": "vector",
          "url": "mapbox://mapbox.mapbox-streets-v8"
        },
        "overlay": {
          "type": "image",
          "url": gzm,
          "coordinates": [
            [-80.425, 46.437],
            [-71.516, 46.437],
            [-71.516, 37.936],
            [-80.425, 37.936]
          ]
        }
      },
      "sprite": "mapbox://sprites/mapbox/dark-v10",
      "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
      "layers": [
        {
          "id": "背景",
          "type": "background",
          "paint": {
            "background-color": "rgba(204,204,201,1)"
          },
          "layout": {
            "visibility": "visible"
          },
          "metadata": {
            "mapbox:group": "92ca48f13df25"
          }
        },
        {
          "id": "overlay",
          "source": "overlay",
          "type": "raster",
          "paint": { "raster-opacity": 1 }
        }
      ]
    };


    const map = new mapboxgl.Map({
      container: 'map',
      maxZoom: 15,
      minZoom: 6,
      zoom: 6,
      center: [-75.789, 41.874],
      style: mapStyle,

      // if parent map zoom >= 18 and minimap zoom >= 14, set minimap zoom to 16
      // zoomLevels: [[18, 14, 16], [16, 12, 14], [14, 10, 12], [12, 8, 10], [10, 6, 8]]
      // maxBounds: bounds
    });
    var size = 200;

    var pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

      onAdd: function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },

      render: function () {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;

        var radius = size / 2 * 0.3;
        var outerRadius = size / 2 * 0.7 * t + radius;
        var context = this.context;

        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
        context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
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

    map.on('load', function () {

      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

      map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [-75.789, 41.874]
              }
            }]
          }
        },
        "layout": {
          "icon-image": "pulsing-dot"
        }
      });

      map.addLayer({
        "id": "points1",
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [-75.789, 41.674]
              }
            }]
          }
        },
        "layout": {
          "icon-image": "pulsing-dot"
        }
      });
    });
    //禁用底图旋转
    map.dragRotate.disable();
    // disable map rotation using touch rotation gesture
    map.touchZoomRotate.disableRotation();

    // map.addControl(
    //   new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl
    //   })
    // );
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
