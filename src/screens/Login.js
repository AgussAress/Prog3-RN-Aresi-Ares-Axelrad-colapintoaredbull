import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Login</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
