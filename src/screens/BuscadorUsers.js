import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class BuscadorUsers extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Buscador de usuarios</Text>
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
    fontSize: 18,
  },
});