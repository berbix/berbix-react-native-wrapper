import Foundation
import Berbix
import React

public func buildBerbixConfig(config:NSDictionary) -> BerbixConfiguration {
    let clientToken: String = config["clientToken"] as! String
    let baseUrl: String? = config["baseUrl"] as? String
    
    var config = BerbixConfigurationBuilder()
        .withClientToken(clientToken)
    
    if (baseUrl != nil) {
        config = config.withBaseURL(baseUrl!)
    }
    
    return config.build();
}


@objc(BerbixSdk)
class BerbixSdk: NSObject {
    
    var sessionHandle: BerbixSessionHandle? = nil;
    var berbixSDK: BerbixSDK? = nil;
    var flowDelegate: FlowDelegate? = nil;
    
    @objc(startFlow:withResolver:withRejecter:)
    func startFlow(config: NSDictionary, resolve:@escaping RCTPromiseResolveBlock, reject:@escaping RCTPromiseRejectBlock) -> Void {
        let berbixSDK = BerbixSDK()
        let berbixConfig = buildBerbixConfig(config: config)
        
        DispatchQueue.main.async {
            let rootViewController: UIViewController =  (UIApplication.shared.windows.first?.rootViewController)!
            let delegate = FlowDelegate(resolve: resolve, reject: reject)
            berbixSDK.startFlow(rootViewController, delegate: delegate, config: berbixConfig)
        }
    }
    
    @objc(createSession:withResolver:withRejecter:)
    func createSession(config: NSDictionary, resolve:@escaping RCTPromiseResolveBlock, reject:@escaping RCTPromiseRejectBlock) -> Void {
        sessionHandle = nil;
        
        self.berbixSDK = BerbixSDK()
        let berbixConfig = buildBerbixConfig(config: config)
        
        DispatchQueue.main.async {
            self.flowDelegate = FlowDelegate(resolve: resolve, reject: reject)
            
            self.sessionHandle = self.berbixSDK?.createSession(delegate: self.flowDelegate!, config: berbixConfig) {
                resolve(true)
            }
        }
    }
    
    @objc(displayFlow:withRejecter:)
    func displayFlow(resolve:@escaping RCTPromiseResolveBlock, reject:@escaping RCTPromiseRejectBlock) -> Void {
        if (sessionHandle == nil) {
            let error = "You need to create a session before displaying the flow"
            reject("berbix_flow", "123", NSError(domain: error, code: 123, userInfo: ["error": error]))
            return
        }
        
        self.flowDelegate?.update(resolve: resolve, reject: reject)
        
        DispatchQueue.main.async {
            let rootViewController: UIViewController =  (UIApplication.shared.windows.first?.rootViewController)!
            
            self.berbixSDK!.display(rootViewController, handle: self.sessionHandle!)
        }
        
    }
    
    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
