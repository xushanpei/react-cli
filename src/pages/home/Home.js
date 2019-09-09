import React, { Component } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import actions from "../../redux/homeRedux/action";

@connect(
  ({ homeReducer }) => ({ homeReducer }),
  {
    addRecord: actions.addRecord,
    test: actions.test
  }
)
class Home extends Component {
  constructor(props) {
    super(props);
  }
  add = () => {
    let data = this.props.homeReducer.data;
    this.props.addRecord(++data);
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
        <Button onClick={this.request}>点击触发请求</Button>
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
