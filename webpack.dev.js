const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  // devtool: "source-map",
  devtool: "eval-source-map",
  // devtool: "cheap-module-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
});
