const path = require('path');

module.exports = {
  entry: path.resolve("./main.js"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
        // 指定哪些路径下的文件需要经过 loader 处理
        // include: [
        //     path.resolve(__dirname, './src')
        // ],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                {
                  pragma: "TonyReact.createElement"
                },
              ],
            ],
          },
        },
      },
    ],
  },
};