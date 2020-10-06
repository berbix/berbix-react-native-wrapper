import { NativeModules } from 'react-native';

export enum BerbixEnvironment {
  development,
  sandbox,
  staging,
  production,
}

type BerbixConfiguration = {
  clientToken: string;
  baseUrl?: string;
  environment?: BerbixEnvironment;
};

type BerbixSdkType = {
  startFlow(config: BerbixConfiguration): Promise<void>;
  createSession(config: BerbixConfiguration): Promise<void>;
  displayFlow(): Promise<void>;
};

const { BerbixSdk } = NativeModules;

export default BerbixSdk as BerbixSdkType;
