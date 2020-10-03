package com.reactnativeberbixsdk

import android.content.Intent
import android.os.Bundle
import android.util.Log
import com.berbix.berbixverify.BerbixConfigurationBuilder
import com.berbix.berbixverify.BerbixConstants
import com.berbix.berbixverify.BerbixSDK
import com.berbix.berbixverify.activities.BerbixActivity
import com.facebook.react.bridge.*

class BerbixSdkModule(val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "BerbixSdk"
  }

  // Example method
  // See https://facebook.github.io/react-native/docs/native-modules-android
  @ReactMethod
  fun startSDK(promise: Promise) {
    val token = "your_token_here" // Fetch client token from the backend

    val sdk = BerbixSDK()
    val config = BerbixConfigurationBuilder().
      setClientToken(token).
      setDebug(true).
      build()

    val activity = reactContext.currentActivity
    val eventListener = BerbixActivityEventListener(promise)
    reactContext.addActivityEventListener(eventListener)

//    val i = Intent(reactContext.currentActivity, BerbixActivity::class.java).apply {
//      putExtra("config", config)
//    }

//    reactContext.startActivityForResult(i, BerbixConstants.REQUEST_CODE_BERBIX_FLOW, Bundle())


    if (activity == null) {
      return promise.reject(Error("no activity found"))
    } else {
      sdk.startFlow(activity, config)
    }

  }


}
