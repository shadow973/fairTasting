// plugins/ios/with-facebook.js
const { WarningAggregator, withAppDelegate } = require('@expo/config-plugins');

const linkingBlock =
  '- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {';

function modifyAppDelegate(appDelegate) {
  if (appDelegate.includes(linkingBlock)) {
    const integratedBlock =
      linkingBlock +
      `
      NSString *fbScheme = [NSString stringWithFormat:@"fb%@", NSBundle.mainBundle.infoDictionary[@"FacebookAppID"]];
      if ([[url scheme] isEqualToString:fbScheme]) {
          return [super application:application openURL:url options:options];
      }
    `;
    appDelegate = appDelegate.replace(linkingBlock, integratedBlock);
  }

  return appDelegate;
}

exports.withFacebook = (config) => {
  return withAppDelegate(config, (config) => {
    if (config.modResults.language === 'objc') {
      config.modResults.contents = modifyAppDelegate(
        config.modResults.contents
      );
    } else {
      WarningAggregator.addWarningIOS(
        'withFacebook',
        'Swift AppDelegate files are not supported yet.'
      );
    }
    return config;
  });
};