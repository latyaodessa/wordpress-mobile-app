const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  // const config = await createExpoWebpackConfigAsync({ ...env, offline: false }, argv);
  config.resolve.alias['react-native'] = 'react-native-web';
  config.resolve.alias['react-native-webview'] = 'react-native-web-webview';

  const webViewRule = {
    test: /postMock.html$/,
    use: {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    },
  };

  config.module.rules = [
    ...config.module.rules,
    webViewRule,
  ];

  return config;
};
