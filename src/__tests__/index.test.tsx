// @ts-nocheck

import BerbixSdk, { BerbixConfiguration, BerbixEnvironment } from '../index';

// add mock
jest.mock(
  '../../node_modules/react-native/Libraries/BatchedBridge/NativeModules',
  () => {
    return {
      BerbixSdk: {
        startFlow: jest.fn().mockReturnValue(Promise.resolve()),
        createSession: jest.fn().mockReturnValue(Promise.resolve()),
        displayFlow: jest.fn().mockReturnValue(Promise.resolve()),
      },
    };
  }
);

const RESOLVED = 'resolved';
const REJECTED = 'rejected';

const startFlow = (config: BerbixConfiguration) => {
  return BerbixSdk.startFlow(config)
    .then(() => {
      return RESOLVED;
    })
    .catch(() => {
      return REJECTED;
    });
};

const createSession = (config: BerbixConfiguration) => {
  return BerbixSdk.createSession(config)
    .then(() => {
      return RESOLVED;
    })
    .catch(() => {
      return REJECTED;
    });
};

const validConfig = {
  clientToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjU3MjEwODc4OTc3NjM4NDAsImNpZCI6NTIyODYzOTMyOTE4OTg4OCwiY3R0IjoxLCJhdWQiOiJ2ZXJpZnkuYmVyYml4LmNvbSIsImV4cCI6MTYwMjY4MjgyMiwiaWF0IjoxNjAyNjc5MjIyLCJzdWIiOiJjYyJ9.8ZYbTkQvnjj6uk0e9YCsBeErRNB4bAM9wI0XEA6-d28',
};

/* Start flow tests */

it('should reject when starting the flow without a config', () => {
  return startFlow(null).then((result) => expect(result).toBe(REJECTED));
});

it('should reject when starting the flow without setting up the clientToken in config', () => {
  return startFlow({ environment: BerbixEnvironment.staging }).then((result) =>
    expect(result).toBe(REJECTED)
  );
});

it('should reject when starting the flow with an invalid JWT *clientToken*', () => {
  return startFlow({ clientToken: 'invalid_jwt' }).then((result) =>
    expect(result).toBe(REJECTED)
  );
});

it('should resolve when starting the flow with a config that contains only a valid JWT *clientToken*', () => {
  return startFlow({
    clientToken: validConfig.clientToken,
  }).then((result) => expect(result).toBe(RESOLVED));
});

it('should reject when starting the flow with an invalid *environment*', () => {
  return startFlow({
    ...validConfig,
    environment: 'invalid env',
  }).then((result) => expect(result).toBe(REJECTED));
});

it('should reject when starting the flow with a config containing *baseUrl* that is not of type string', () => {
  return startFlow({ baseUrl: true }).then((result) =>
    expect(result).toBe(REJECTED)
  );
});

it('should reject when starting the flow with a config containing *debug* that is not of type boolean', () => {
  return startFlow({ debug: 'true' }).then((result) =>
    expect(result).toBe(REJECTED)
  );
});

it('should reject when starting the flow with a config containing *email* that is not of type string', () => {
  return startFlow({ email: true }).then((result) =>
    expect(result).toBe(REJECTED)
  );
});

it('should reject when starting the flow with a config containing *phone* that is not of type string', () => {
  return startFlow({ phone: true }).then((result) =>
    expect(result).toBe(REJECTED)
  );
});

it('should reject when starting the flow with a config containing *templateKey* that is not of type string', () => {
  return startFlow({ templateKey: true }).then((result) =>
    expect(result).toBe(REJECTED)
  );
});

/* Create session tests */

it('should reject when creating a session without a config', () => {
  return createSession(null).then((result) => expect(result).toBe(REJECTED));
});

it('should reject when creating a session without setting up the *clientToken* in config', () => {
  return createSession({
    environment: BerbixEnvironment.staging,
  }).then((result) => expect(result).toBe(REJECTED));
});

it('should reject when creating a session with an invalid JWT *clientToken*', () => {
  return createSession({ clientToken: 'invalid_jwt' }).then((result) =>
    expect(result).toBe(REJECTED)
  );
});

it('should reject when creating a session with an invalid *environment*', () => {
  return createSession({
    ...validConfig,
    environment: 'invalid env',
  }).then((result) => expect(result).toBe(REJECTED));
});

it('should reject when creating a session with a config containing *baseUrl* that is not of type string', () => {
  return createSession({ baseUrl: true }).then((result) =>
    expect(result).toBe(REJECTED)
  );
});

it('should reject when creating a session with a config containing *debug* that is not of type boolean', () => {
  return createSession({ debug: 'true' }).then((result) =>
    expect(result).toBe(REJECTED)
  );
});

it('should reject when creating a session with a config containing *email* that is not of type string', () => {
  return createSession({ email: true }).then((result) =>
    expect(result).toBe(REJECTED)
  );
});

it('should reject when creating a session with a config containing *phone* that is not of type string', () => {
  return createSession({ phone: true }).then((result) =>
    expect(result).toBe(REJECTED)
  );
});

it('should reject when creating a session with a config containing *templateKey* that is not of type string', () => {
  return createSession({ templateKey: true }).then((result) =>
    expect(result).toBe(REJECTED)
  );
});

it('should resolve when creating a session with a config that contains only a valid JWT clientToken', () => {
  return createSession({
    clientToken: validConfig.clientToken,
  }).then((result) => expect(result).toBe(RESOLVED));
});
