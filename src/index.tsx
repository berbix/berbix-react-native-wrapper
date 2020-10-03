import { NativeModules } from 'react-native';

type BerbixSdkType = {
  multiply(a: number, b: number): Promise<number>;
};

const { BerbixSdk } = NativeModules;

export default BerbixSdk as BerbixSdkType;
