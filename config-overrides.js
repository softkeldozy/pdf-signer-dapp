// config-overrides.js
const { alias } = require("react-app-rewire-alias");
const { ProvidePlugin } = require("webpack");

module.exports = function override(config) {
  // Aliases
  alias({
    "@viem": "node_modules/viem",
    "@ethers": "node_modules/ethers",
  })(config);

  // Plugins
  config.plugins.push(
    new ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    })
  );

  return config;
};
