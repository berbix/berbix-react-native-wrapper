## Table of contents

- [Table of contents](#table-of-contents)
- [Overview](#overview)
- [Getting started](#getting-started)
  - [1. Obtaining a client token](#1-obtaining-a-client-token)
  - [2. Adding the React Native Berbix SDK to your project](#2-adding-the-berbix-react-native-sdk-to-your-project)
    - [2.1 Installation](#21-installation)
    - [2.2 iOS](#22-ios)
    - [2.3 Android](#23-android)
- [Usage](#usage)
  - [1. Creating the SDK configuration](#1-creating-the-sdk-configuration)
  - [2. Parameter details](#2-configuration-details)
  - [3. Success Response](#3-success-response)
  - [4. Failure Response](#4-failure-response)
- [Example app](#example-app)
- [Theme setup](#theme-setup)
- [More Information](#more-information)
  - [Support](#support)
- [License](#license)

## Overview

The Berbix React Native SDK is a React Native wrapper around the Berbix native mobile SDKs for Android and iOS. It enables customers of Berbix to quickly get up and running with best-in-class identity verification in a React Native setting. If you're interested in using Berbix for identity verification and you are not already a customer, you can learn more at [berbix.com](https://berbix.com).

- Supports iOS 11+
- Supports Android API level 21+

## Getting started

### 1. Obtaining a client token

In order to start integration, you will need to generate a short-lived **client token**. The Berbix Verify API needs to be integrated in your backend. See [Create a Transaction](https://docs.berbix.com/docs/integration-guide#creating-a-transaction) documentation.

### 2. Adding the Berbix React Native SDK to your project

This SDK cannot be used with Expo; If your project already uses Expo, you will need to [follow the eject process](https://docs.expo.io/versions/latest/workflow/customizing/).

#### 2.1 Installation

```shell
$ npm install berbix-react-native
```

#### 2.2 iOS

Change `ios/Podfile` to use version 11 and to include Berbix iOS Cocoapod spec

```
platform :ios, '11.0'
use_frameworks!

target 'YourProject' do
  ...
  source 'https://github.com/CocoaPods/Specs.git'
  source 'https://github.com/berbix/berbix-ios-spec.git'
  ...
end

```

Add description for camera permissions to `ios/YourProjectName/Info.plist`:

```xml
<plist version="1.0">
<dict>
  <!-- Add these two elements: -->
	<key>NSCameraUsageDescription</key>
	<string>Required for document capture</string>
  <!-- ... -->
</dict>
</plist>
```

Install the pods:

```bash
cd ios
pod install
cd ..
```

#### 2.3 Android

Add the Berbix Maven repository to your Gradle repositories in your project's build.gradle file.

```gradle
allprojects {
    repositories {
        // Existing repositories, like google() and jcenter()
        maven {
            url "https://storage.googleapis.com/berbix-mobile-releases/repo"
        }
    }
}
```

Ensure that you have enabled camera and internet access in your app manifest.

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
```

## Usage

You can launch the Berbix verify flow with a call to `Berbix.startFlow`. Here's a very simple example on how that might look like:

```javascript
import * as React from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import Berbix from 'berbix-react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    marginTop: 40,
  },
});

const config = {
  clientToken: 'client_token',
};

export default function App() {
  const [error, setError] = React.useState(null);
  const [sessionCreated, setSessionCreated] = React.useState(false);

  const startFlow = async () => {
    setError(null);

    try {
      await Berbix.startFlow(config);
    } catch (err) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Berbix rn sdk</Text>
      <Text
        style={styles.instructions}
      >{`Press "Start Flow" to start Berbix flow automatically`}</Text>
      <Button title="Start Flow" onPress={startFlow} />
    </View>
  );
}
```

On iOS, you also have the option to create the session (`Berbix.createSession`) and starting the verify flow whenever you like (`Berbix.displayFlow`). Here's a simple example on how to do that;

```javascript
import * as React from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import Berbix from 'berbix-react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    marginTop: 40,
  },
});

const config = {
  clientToken: 'client_token',
};

export default () => {
  const [error, setError] = React.useState(null);
  const [sessionCreated, setSessionCreated] = React.useState(false);

  const createSession = async () => {
    setError(null);

    try {
      await Berbix.createSession(config);
      setSessionCreated(true);
    } catch (err) {}
  };

  const displayFlow = async () => {
    setError(null);

    try {
      await Berbix.displayFlow();
      setSessionCreated(true);
    } catch (err) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Berbix rn sdk</Text>
      <Text style={styles.instructions}>
        {`Press "Create session" to start a handled Berbix flow`}
      </Text>
      <Button title="Create Session" onPress={createSession} />
      <Text>{sessionCreated ? 'Session created' : 'No session'}</Text>
      <Button title="Display Flow" onPress={displayFlow} />
    </View>
  );
};
```

### 1. Creating the SDK configuration

Once you have an added the SDK as a dependency and you have a SDK token, you can configure the SDK:

Example configuration:

```javascript
config = {
  clientToken: 'client_token_example',
};
```

### 2. Configuration details

| Prop              | Description                                                                        | Type              | Default                      |
| ----------------- | ---------------------------------------------------------------------------------- | ----------------- | ---------------------------- |
| **`clientToken`** | Used to initialise the Berbix Verify user flow                                     | String            | **Required**                 |
| **`baseUrl`**     | BaseUrl description                                                                | String            | null                         |

### 3. Success Response

Upon completion, no data is returned from the SDK.

### 4. Failure Response

The SDK will reject the promise any time the Berbix SDK exits without a success, such as invalid configuration, or user dismissed the verification flow.

Example

```javascript
{
  code: "berbix_error",
  domain: "client token is invalid",
  message: "client token is invalid"
}
```

## Example app

Clone the repository

```bash
git clone https://github.com/berbix/berbix-react-native-wrapper.git
```

Setup the example app

```bash
cd berbix-react-native-wrapper/
yarn bootstrap
```

You may want to force using a local `berbix-react-native-wrapper` instead of the published version. 
To do this, run the following before running the app:
```
yarn example preinstall
```

To revert back to the published version:
```
yarn example postinstall
```

Run the ios app

```bash
yarn example ios
```

Run the android app. If this fails, you might need to first open the project in Android studio before re-running the command.

```bash
yarn example android
```

Beware that the verify flow will fail if a valid **clientToken** is not supplied in _/example/src/App.tsx_

## More Information

Copyright 2021 Berbix. All rights reserved.

## License

MIT license
