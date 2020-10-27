package com.reactnativeberbixsdk

import com.berbix.berbixverify.BerbixConfigurationBuilder
import com.berbix.berbixverify.BerbixEnvironment
import com.berbix.berbixverify.BerbixSDK
import com.facebook.react.bridge.*
import java.util.*

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
    val env: String? = if (config.hasKey("environment")) config.getString("environment") else "production"
    val debug: Boolean = if (config.hasKey("debug")) config.getBoolean("debug") else false

    val environment: BerbixEnvironment?
    environment = when (env) {
      "sandbox" -> BerbixEnvironment.SANDBOX
      "staging" -> BerbixEnvironment.STAGING
      "production" -> BerbixEnvironment.PRODUCTION
      else -> {
        BerbixEnvironment.PRODUCTION
      }
    }

    val sdk = BerbixSDK()
    val berbixConfig = BerbixConfigurationBuilder()
      .setClientToken(clientToken)
      .setEnvironment(environment)
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
