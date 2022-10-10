const path = require('path');

const rootDir = path.resolve(__dirname, '.');

module.exports = {
  entry: {
    main: './src',
  },
  optimization: {
    minimize: false
  },
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  externals: {
    preact: 'preact'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                ["preact-cli/babel"],
                ["preact"]
            ]
          }
        },
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: {
          loader: "svg-url-loader",
          options: {
            iesafe: true,
          },
        },
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
};
