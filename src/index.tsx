import { NativeModules } from 'react-native';

const { BerbixSdk } = NativeModules;

export type BerbixConfiguration = {
  clientToken: string;
  baseUrl?: string;

  /* Android only */
  debug?: boolean;
  email?: string;
  phone?: string;
  templateKey?: string;
};

type BerbixSdkType = {
  startFlow(config: BerbixConfiguration): Promise<void>;
  createSession(config: BerbixConfiguration): Promise<void>;
  displayFlow(): Promise<void>;
};

const checkConfigValidity = (config: BerbixConfiguration): Error | null => {
  if (!config) {
    return new Error('config not provided');
  }

  if (!config.clientToken) {
    return new Error('clientToken not provided');
  }

  if (
    !config.clientToken.match(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    )
  ) {
    return new Error('clientToken is not a valid JWT token');
  }

  if (config.baseUrl && typeof config.baseUrl !== 'string') {
    return new Error('baseUrl must be string');
  }

  if (config.debug && typeof config.debug !== 'boolean') {
    return new Error('debug must be boolean');
  }

  if (config.email && typeof config.email !== 'string') {
    return new Error('email must be string');
  }

  if (config.phone && typeof config.phone !== 'string') {
    return new Error('phone must be string');
  }

  if (config.templateKey && typeof config.templateKey !== 'string') {
    return new Error('templateKey must be string');
  }

  return null;
};

const Berbix: BerbixSdkType = {
  startFlow(config: BerbixConfiguration): Promise<void> {
    const configError = checkConfigValidity(config);

    if (configError) {
      return Promise.reject(configError);
    }

    return BerbixSdk.startFlow(config);
  },

  createSession(config: BerbixConfiguration): Promise<void> {
    const configError = checkConfigValidity(config);

    if (configError) {
      return Promise.reject(configError);
    }

    return BerbixSdk.createSession(config);
  },

  displayFlow(): Promise<void> {
    return BerbixSdk.displayFlow();
  },
};

export default Berbix;
