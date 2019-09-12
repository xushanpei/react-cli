import React, { useState, useEffect, useRef } from "react";
import { Button, Input } from "antd";
import { connect } from "react-redux";
import actions from "../../redux/homeRedux/action";

/**
 *
 * hook中没有 this
 */
function TestHook(props) {
  //声明一个 count 的 state 变量
  const [count, setCount] = useState(0);
  const [refValue, setRefValue] = useState(null);
  //useRef
  const ref = useRef();

  // 第二个参数为空，只会第一次执行
  useEffect(() => {
    console.log("第二个参数为空");
    if (count === 10) {
      document.title = `You clicked ${count} times`;
    }
  }, []);

  // 第二个参数为 [count] , 在count 更新时执行
  useEffect(() => {
    console.log("第二个参数为count");
    if (count === 10) {
      document.title = `You clicked ${count} times`;
    }
  }, [count]);

  console.log("这是props", props);

  // 定义一个方法 获取 ref
  const getRef = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    ref.current.focus();
    console.log(ref.current.state.value);
    setRefValue(ref.current.state.value);
  };

  return (
    <div>
      这是一个hook测试组件
      <hr />
      <Button onClick={() => setCount(count + 1)}>点击测试hook</Button>
      <Button>{count}</Button>
      <hr />
      <Button>Hook中获取 store中的数据</Button> <Button>{props.homeReducer.data}</Button>
      <hr />
      <Input ref={ref} style={{ width: "200px" }}></Input> <Button onClick={getRef}>获取ref</Button> <Button>{refValue}</Button>
    </div>
  );
}

/**
 *
 * 需要注意的是 hook 中不能使用 @connect ,所以只能按照传统的 connect 用法 来访问 redux (原因是不能使用 @decorators)
 */
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  addrecord(index) {
    dispatch(actions.addrecord(index));
  }
});
// mapStateToProps： 声明将state与props对应的映射关系
// mapDispatchToProps： 将需要对store修改操作声明在这个对象中
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestHook);

// export default TestHook;
