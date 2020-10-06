import Foundation
import Berbix

public func buildBerbixConfig(config:NSDictionary) -> BerbixConfiguration {
    let clientToken:String = config["clientToken"] as! String
    let baseUrl:String? = config["baseUrl"] as? String
    let environment: BerbixEnvironment = config["environment"] as? BerbixEnvironment ?? BerbixEnvironment.staging
    
    var config = BerbixConfigurationBuilder()
        .withClientToken(clientToken)
        .withEnvironment(environment)
    
    if (baseUrl != nil) {
        config = config.withBaseURL(baseUrl!)
    }
    
    return config.build();
}


@objc(BerbixSdk)
class BerbixSdk: UIViewController {
    
    var sessionHandle: BerbixSessionHandle? = nil;
    
    @objc(startFlow:withResolver:withRejecter:)
    func startFlow(config: NSDictionary, resolve:@escaping RCTPromiseResolveBlock, reject:@escaping RCTPromiseRejectBlock) -> Void {
        let berbixSDK = BerbixSDK()
        let config = buildBerbixConfig(config: config)
        
        DispatchQueue.main.async {
            let rootViewController: UIViewController =  (UIApplication.shared.windows.first?.rootViewController)!
            let delegate = FlowDelegate(resolve: resolve, reject: reject)
            berbixSDK.startFlow(rootViewController, delegate: delegate, config: config)
        }
    }
    
    @objc(createSession:withResolver:withRejecter:)
    func createSession(config: NSDictionary, resolve:@escaping RCTPromiseResolveBlock, reject:@escaping RCTPromiseRejectBlock) -> Void {
        let berbixSDK = BerbixSDK()
        let config = buildBerbixConfig(config: config)
        
        DispatchQueue.main.async { [self] in
            let delegate = FlowDelegate(resolve: resolve, reject: reject)
            
            sessionHandle = berbixSDK.createSession(delegate: delegate, config: config) {
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
        
        let berbixSDK = BerbixSDK()
        
        DispatchQueue.main.async { [self] in
            let rootViewController: UIViewController =  (UIApplication.shared.windows.first?.rootViewController)!
            berbixSDK.display(rootViewController, handle: sessionHandle!)
        }
    }
    
    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
