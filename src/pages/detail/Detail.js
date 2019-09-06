import React, { Component } from "react";
import { Button } from "antd";
import { renderRoutes, matchRoutes } from "react-router-config";
import { Switch, BrowserRouter } from "react-router-dom";

export default class Detail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button type="primary">这是 Detail 页面</Button>
        <BrowserRouter>{renderRoutes(this.props.route.routes, { data: "这是detail页面传过来的值", datas: "第二个值" })}</BrowserRouter>
      </div>
    );
  }
}
