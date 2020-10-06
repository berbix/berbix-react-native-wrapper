#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BerbixSdk, NSObject)

RCT_EXTERN_METHOD(startFlow:(NSDictionary *)config
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(createSession:(NSDictionary *)config
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(displayFlow:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject
                  )

@end
