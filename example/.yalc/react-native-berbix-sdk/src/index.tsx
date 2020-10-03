import { NativeModules } from 'react-native';

type BerbixSdkType = {
  startSDK(): Promise<number>;
};

const { BerbixSdk } = NativeModules;

export default BerbixSdk as BerbixSdkType;
