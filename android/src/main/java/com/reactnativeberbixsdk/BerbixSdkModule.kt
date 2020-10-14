package com.reactnativeberbixsdk

import com.berbix.berbixverify.BerbixConfigurationBuilder
import com.berbix.berbixverify.BerbixEnvironment
import com.berbix.berbixverify.BerbixSDK
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
    val env: Int? = if (config.hasKey("environment")) config.getInt("environment") else 2
    val environment: BerbixEnvironment?

    environment = when (env) {
      1 -> BerbixEnvironment.SANDBOX
      2 -> BerbixEnvironment.STAGING
      3 -> BerbixEnvironment.PRODUCTION
      else -> {
        BerbixEnvironment.STAGING
      }
    }

    val sdk = BerbixSDK()
    val berbixConfig = BerbixConfigurationBuilder()
      .setClientToken(clientToken)
      .setEnvironment(environment)

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
