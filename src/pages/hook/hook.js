import React, { useState, useEffect } from "react";
import { Button } from "antd";

function TestHook(props) {
  //声明一个 count 的 state 变量
  const [count, setCount] = useState(0);

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
  return (
    <div>
      这是一个hook测试组件
      <hr />
      <Button onClick={() => setCount(count + 1)}>点击测试hook</Button>
      <Button>{count}</Button>
    </div>
  );
}

export default TestHook;
