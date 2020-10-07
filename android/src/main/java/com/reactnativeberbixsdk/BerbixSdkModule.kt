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

  @ReactMethod
  fun startFlow(config: ReadableMap, promise: Promise) {
    if (!config.hasKey("clientToken")) {
      return promise.reject(Error("No client token provided"))
    }

    val clientToken = config.getString("clientToken") as String
    val baseUrl: String? = if (config.hasKey("baseUrl")) config.getString("baseUrl") else null
    val debug: Boolean = if (config.hasKey("debug")) config.getBoolean("debug") else false

    val sdk = BerbixSDK()
    val berbixConfig = BerbixConfigurationBuilder()
      .setClientToken(clientToken)
      .setDebug(debug)

    if (baseUrl != null) {
      berbixConfig.setBaseURL(baseUrl)
    }

    val activity = reactContext.currentActivity
    val eventListener = BerbixActivityEventListener(promise)
    reactContext.addActivityEventListener(eventListener)

    if (activity == null) {
      return promise.reject(Error("no activity found"))
    } else {
      sdk.startFlow(activity, berbixConfig.build())
    }

  }


}
