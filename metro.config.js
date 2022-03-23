const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Remove all console logs in production...
config.transformer.minifierConfig.compress.drop_console = true;

config.transformer.babelTransformerPath = require.resolve(
    "react-native-svg-transformer"
);

config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => ext !== "svg"
);

config.resolver.sourceExts.push("svg");

module.exports = config;