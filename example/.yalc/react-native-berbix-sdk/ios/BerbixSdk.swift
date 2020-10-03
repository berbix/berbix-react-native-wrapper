import Foundation
import Berbix

@objc(BerbixSdk)
class BerbixSdk: UIViewController, BerbixFlowDelegate {

    @objc(startSDK:withRejecter:)
    func startSDK(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let berbixSDK = BerbixSDK()
        let config = BerbixConfigurationBuilder()
            .withClientToken("client_token_for_session")
            .build()
        berbixSDK.startFlow(self, delegate: self, config: config)
    }
    
    func completed() {
            // Send request to server to fetch verification status
        }
        
    func failed(error: BerbixError) {
        // Something went wrong in the execution of the flow
    }
}
