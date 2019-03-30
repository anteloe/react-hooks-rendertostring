// @ts-nocheck

const webpack = require("webpack");
const path = require("path");
const React = require("react");
const { renderToString } = require("react-dom/server");

/**
 * @type {webpack.Configuration}
 */
const nodeRenderConfig = {
  mode: "development",
  target: "node",
  stats: "errors-only",
  entry: {
    NoSSR: "./withHooks/NoSSR.tsx"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname),
    library: "NoSSR",
    libraryTarget: "commonjs",
    libraryExport: ["NoSSR"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          },
          "ts-loader"
        ]
      }
    ]
  }
};

const build = webpackConfig =>
  new Promise((resolve, reject) =>
    webpack(webpackConfig).run((error, stats) =>
      error ? reject(error) : resolve(stats)
    )
  );

async function buildSSR() {
  await build(nodeRenderConfig);

  const { NoSSR } = require("./NoSSR.js");
  const NoSSRElement = React.createElement(
    NoSSR,
    null,
    React.createElement("h1", null, "This should not be rendered now")
  );
  const html = renderToString(NoSSRElement);
  console.log({ html });
}

buildSSR();
