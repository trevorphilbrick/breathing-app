// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add custom configuration for the resolver
config.resolver = {
  sourceExts: ["js", "jsx", "json", "ts", "tsx", "cjs", "mjs"],
  assetExts: [...config.resolver.assetExts, "glb", "gltf", "png", "jpg"], // include existing asset extensions
};

module.exports = config;
