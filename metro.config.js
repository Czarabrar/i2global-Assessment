const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  const config = {
    resolver: {
      assetExts: [...defaultConfig.resolver.assetExts, 'lottie', 'ttf'],
    },
  };

  return mergeConfig(defaultConfig, config);
})();
