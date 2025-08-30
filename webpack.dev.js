const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  // devtool: "source-map",
  // devtool: "cheap-module-source-map",
  devServer: {
    watchFiles: ["./src/main.html"],
  },
});
