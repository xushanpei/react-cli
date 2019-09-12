import React, { Component } from "react";

const test = WrappedComponent => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hocTest: "这是一个测试数据HOC测试"
      };
    }
    testhoc = () => {
      alert("hoc中的方法");
    };

    render() {
      return <WrappedComponent {...this.state} {...this.props} testhoc={this.testhoc}></WrappedComponent>;
    }
  };
};

export default test;
