import React from "react";
import { Button } from "antd";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./router/index";

function App() {
  console.log(renderRoutes(routes));
  return (
    <div className="App">
      <Button type="primary">测试按需加载++路由测试</Button>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </div>
  );
}

export default App;
