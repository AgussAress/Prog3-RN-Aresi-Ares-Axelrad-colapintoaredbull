import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View>
        <Text>Este es el Login</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('register')}>
          <Text>No tenés una cuenta? Registrate</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
