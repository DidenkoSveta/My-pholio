const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const pages = ["index", "task-tracker"];

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: {
      main: "./src/js/index.js",
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "assets/js/[name].js",
      clean: true,
    },

    devtool: isProduction ? false : "source-map",

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },

        {
          test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[name][ext]",
          },
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction ? "assets/css/style.min.css" : "assets/css/style.css",
      }),

      ...pages.map((page) => {
        return new HtmlWebpackPlugin({
          template: `./src/${page}.html`,
          filename: `${page}.html`,
          inject: "body",
          minify: false,
        });
      }),
    ],

    optimization: {
      minimize: isProduction,
      minimizer: ["...", new CssMinimizerPlugin()],
    },

    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      port: 3000,
      open: true,
      hot: true,
      liveReload: true,
      watchFiles: ["src/**/*"],
      devMiddleware: {
        writeToDisk: true,
      },
    },
  };
};
