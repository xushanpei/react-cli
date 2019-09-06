import React, { Component } from "react";
import { Button } from "antd";

export default class System extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button type="primary">这是 System 页面{this.props.data}</Button>
      </div>
    );
  }
}
