package com.reactnativeberbixsdk

import android.app.Activity
import android.content.Intent
import android.util.Log
import com.berbix.berbixverify.BerbixConstants
import com.berbix.berbixverify.BerbixResultStatus
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise

class BerbixActivityEventListener(val promise: Promise): BaseActivityEventListener() {

  override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {

    super.onActivityResult(activity, requestCode, resultCode, data)

    if (requestCode == BerbixConstants.REQUEST_CODE_BERBIX_FLOW) {
      when (BerbixResultStatus.getStatus(resultCode)) {
        BerbixResultStatus.SUCCESS -> {
          Log.e("berbix-result", "success!")
          promise.resolve("success")
        }
        BerbixResultStatus.ERROR -> {
          Log.e("berbix-result", "error thrown")
          promise.reject(Error("error"))
        }
        BerbixResultStatus.NO_CAMERA_PERMISSIONS -> {
          Log.e("berbix-result", "no camera permissions")
          promise.reject(Error("no camera permissions"))
        }
        BerbixResultStatus.USER_EXIT -> {
          Log.e("berbix-result", "user exited")
          promise.reject(Error("user exited"))
        }
        BerbixResultStatus.UNABLE_TO_LAUNCH_CAMERA -> {
          Log.e("berbix-result", "could not launch the camera")
          promise.reject(Error("could not launch the camera"))
        }
        BerbixResultStatus.UNKNOWN_ERROR -> {
          Log.e("berbix-result", "unknown error")
          promise.reject(Error("unknown error"))
        }
        BerbixResultStatus.UNEXPECTED_RESULT_STATUS -> {
          Log.e("berbix-result", "unexpected result status")
          promise.reject(Error("unexpected result status"))
        }
      }
    }
  }
}
