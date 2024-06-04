const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.js$/,
    enforce: 'pre',
    use: ['source-map-loader'],
  }),
  (config) => {
    // disable source map warnings from specific packages
    config.ignoreWarnings = [
      (warning) =>
        warning.message.includes('source map') &&
        warning.message.includes('node_modules/diff2html'),
    ];
    return config;
  }
);
