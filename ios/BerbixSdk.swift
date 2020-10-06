import Foundation
import Berbix

@objc(BerbixSdk)
class BerbixSdk: UIViewController, BerbixFlowDelegate {

    @objc(startSDK:withRejecter:)
    func startSDK(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        let berbixSDK = BerbixSDK()
        let config = BerbixConfigurationBuilder()
            .withClientToken("client_token_for_session")
            .build()

        DispatchQueue.main.async {
            let rootViewController: UIViewController =  (UIApplication.shared.windows.first?.rootViewController)!
            let delegate = FlowDelegate(resolve: resolve, reject: reject)
            berbixSDK.startFlow(rootViewController, delegate: delegate, config: config)
        }


    }

    func completed() {
            // Send request to server to fetch verification status
        }

    func failed(error: BerbixError) {
        print(error)
        // Something went wrong in the execution of the flow
    }

    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
