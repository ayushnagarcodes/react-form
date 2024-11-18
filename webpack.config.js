import path from "path";

const __dirname = import.meta.dirname;

const config = {
  entry: {
    index: path.resolve(__dirname, "src/index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: {
      name: "@avarock/react-hooks",
      type: "umd",
      umdNamedDefine: true,
    },
    globalObject: "this",
    clean: true,
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};

export default config;
