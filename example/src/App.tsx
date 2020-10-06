import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import BerbixSdk, { BerbixEnvironment } from 'react-native-berbix';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
    marginTop: 50,
  },
  error: {
    color: 'red',
  },
});

const config = {
  clientToken: 'test',
  environment: BerbixEnvironment.staging,
};

export default function App() {
  const [error, setError] = React.useState(null);
  const [sessionCreated, setSessionCreated] = React.useState(false);

  const startFlow = async () => {
    setError(null);

    try {
      await BerbixSdk.startFlow(config);
    } catch (err) {
      setError(err.domain || err.message);
    }
  };

  const createSession = async () => {
    setError(null);

    try {
      await BerbixSdk.createSession(config);
      setSessionCreated(true);
    } catch (err) {
      console.log(err.userInfo);
      setError(err.domain || err.message);
    }
  };

  const displayFlow = async () => {
    setError(null);

    try {
      await BerbixSdk.displayFlow();
      setSessionCreated(true);
    } catch (err) {
      console.log(err.userInfo);
      setError(err.domain || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Berbix rn sdk</Text>
      <Text
        style={styles.instructions}
      >{`Press "Start Flow" to start Berbix flow automatically after configuration is done`}</Text>
      <Button title="Start Flow" onPress={startFlow} />

      <Text
        style={styles.instructions}
      >{`Press "Create session" to start a handled Berbix flow`}</Text>
      <Button title="Create Session" onPress={createSession} />
      <Text>{sessionCreated ? 'Session created' : 'No session'}</Text>

      <Button title="Display Flow" onPress={displayFlow} />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
