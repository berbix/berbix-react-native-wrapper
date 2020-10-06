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
    
    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
