import React, { Component } from "react";
import { Spin, Alert } from "antd";
import { renderRoutes, matchRoutes } from "react-router-config";
import { Switch, BrowserRouter } from "react-router-dom";

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Spin tip="Loading...">
          <Alert message="Alert message title" description="Further details about the context of this alert." type="info" />
        </Spin>
      </div>
    );
  }
}
