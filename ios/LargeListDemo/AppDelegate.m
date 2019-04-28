/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  NSURL *jsCodeLocation;
//
//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  NSURL *jsCodeLocation;
  
#if DEBUG
  NSString *JS_LOCATION = [[NSProcessInfo processInfo] environment][@"JS_LOCATION"];
  NSAssert(!!JS_LOCATION, @"必须要生成一个个人的 scheme（不能设置为 share，避免添加到版本库中），在 Arguments 的 Environment Variable 里增加 JS_LOCATION，值为本机的 IP 地址");
  //本机的 ip 地址
  jsCodeLocation = [NSURL URLWithString:[NSString stringWithFormat:@"http://%@:8081/index.bundle?platform=ios&dev=true", JS_LOCATION]];
#else
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"LargeListDemo"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [UIColor blackColor];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
