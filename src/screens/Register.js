import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../firebase/config';

export default class Register extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  handleRegister = () => {
    const { email, password } = this.state;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('anidada');
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  render() {
    return (
      <View>
        <Text>Registrate</Text>
        <TextInput
          placeholder="Email"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />
        {this.state.error ? <Text>{this.state.error}</Text> : null}
        <TouchableOpacity onPress={this.handleRegister}>
          <Text>Registrarse</Text>
        </TouchableOpacity>
      </View>
    );
  }
}