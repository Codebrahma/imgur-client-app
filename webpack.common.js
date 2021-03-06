const HtmlWebPackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

const devMode = process.env.NODE_ENV !== "production";
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].[hash].js",
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: /flexboxgrid/
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, "src")],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /flexboxgrid/
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ],
        exclude: /flexboxgrid/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    //new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    }),
    new Dotenv({ systemvars: true })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  devServer: {
    historyApiFallback: true
  }
};
