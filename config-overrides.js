const { override, fixBabelImports, addDecoratorsLegacy, useBabelRc } = require("customize-cra");

module.exports = override(
  //启动装饰器
  addDecoratorsLegacy(),
  //使用 .babelrc
  useBabelRc(),

  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  })
);
