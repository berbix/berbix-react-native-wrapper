import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import BerbixSdk from 'react-native-berbix';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  error: {
    color: 'red',
  },
});

export default function App() {
  const [error, setError] = React.useState(null);

  const startSdk = async () => {
    try {
      await BerbixSdk.startSDK();
    } catch (err) {
      setError(err.domain || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Berbix rn sdk</Text>
      <Text style={styles.instructions}>Press Launch to get started</Text>
      <Button title="Launch" onPress={startSdk} />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
