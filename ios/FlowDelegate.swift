//
//  FlowDelegate.swift
//  react-native-berbix-sdk
//
//  Created by Mihai Chifor on 03/10/2020.
//

import Foundation
import Berbix

class FlowDelegate: NSObject, BerbixFlowDelegate {
    var resolve: RCTPromiseResolveBlock
    var reject: RCTPromiseRejectBlock
    
    init(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        self.resolve = resolve
        self.reject = reject
        
        super.init()
    }
    
    func completed() {
        self.resolve(true);
    }
        
    func failed(error: BerbixError) {
        switch error {
        case .apiError(let err as NSError):
            return self.reject("berbix_error", "api_error", err)
        case .cameraAccessError:
            return self.reject("berbix_error", "camera_access_error", error)
        case .invalidState(let err):
            return self.reject("berbix_error", "invalid_state_error", NSError(domain: "berbix_error", code: 3, userInfo: ["NSLocalizedUserDescription": err ]))
        case .userExitError:
            return self.reject("berbix_error", "user_exit_error", error)

        default: return self.reject("berbix_error", "unknown_error", error)
        }
    }
}
