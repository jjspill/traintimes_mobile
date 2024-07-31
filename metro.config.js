const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Extend the default Metro configuration to include additional project roots
 * and to adjust module resolution to handle monorepo setups or linked packages.
 */
const defaultConfig = getDefaultConfig(__dirname);

// Extend the default watchFolders to include the monorepo's root and other possible locations
// where code might reside. Adjust these paths based on your specific project structure.
const extendedConfig = {
  watchFolders: [
    // Assuming the monorepo root is two levels up from the current project
    path.resolve(__dirname, '../..'),
    // Additional specific paths can be added here
  ],

  resolver: {
    // If you have custom aliases or linked packages outside of node_modules,
    // you might need to specify extraNodeModules to inform Metro where to find them.
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => path.join(__dirname, `node_modules/${name}`),
      },
    ),

    // Ensuring that all file extensions Metro needs to handle are included
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'], // Add more extensions as needed

    // Optionally, you can specify a custom resolver function here if your file resolution
    // strategy deviates from the norm or if you use non-standard file locations.
  },

  transformer: {
    // This can be used to transform assets or modify how babel transpiles your code
    // babelTransformerPath: require.resolve('react-native-svg-transformer'),

    // If you use images or other non-JS assets, ensure Metro can handle them
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    // Configure the asset extension patterns to include images, videos, etc.
    assetExts: ['png', 'jpg', 'jpeg', 'svg', 'gif', 'mp4', 'ttf'],
  },
};

// Merge the extended config with the default config
module.exports = mergeConfig(defaultConfig, extendedConfig);
