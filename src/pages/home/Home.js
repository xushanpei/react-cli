import React, { Component } from "react";
import { Button, Input } from "antd";
import { connect } from "react-redux";
import actions from "../../redux/homeRedux/action";
import test from "../../components/HOC/Test";
import TestHook from "../hook/hook";
const { TextArea } = Input;

@test
@connect(
  ({ homeReducer }) => ({ homeReducer }),
  {
    addrecord: actions.addrecord,
    test: actions.test
  }
)
class Home extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
  }
  add = () => {
    let data = this.props.homeReducer.data;
    this.props.addrecord(++data);
  };
  request = () => {
    this.props.test();
  };
  render() {
    return (
      <div>
        <Button onClick={this.add} type="primary">
          Home 页面 -- 点我
        </Button>
        <Button>获取homeReducer数据 : {this.props.homeReducer.data}</Button>
        <hr />
        <TextArea name="" id="" cols="100" rows="10" value={JSON.stringify(this.props.homeReducer.test)}></TextArea>
        <Button onClick={this.request}>点击触发请求</Button>
        <hr />
        <Button>HOC中的数据 : {this.props.hocTest}</Button>
        <Button onClick={this.props.testhoc}>触发Hoc方法</Button>
        <hr />
        <TestHook data={"hahh"}></TestHook>
      </div>
    );
  }
}
// const mapStateToProps = state => ({
//   ...state
// });

// const mapDispatchToProps = dispatch => ({
//   addRecord(index) {
//     dispatch(actions.addRecord(index));
//   }
// });
// mapStateToProps： 声明将state与props对应的映射关系
// mapDispatchToProps： 将需要对store修改操作声明在这个对象中
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home);

export default Home;
