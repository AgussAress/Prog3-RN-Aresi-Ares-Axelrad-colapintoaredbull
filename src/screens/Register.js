import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

export default class Register extends Component {
  state = {
    email: '',
    password: '',
    username: '',
    error: ''
  };

  handleRegister = () => {
    const { email, password, username } = this.state;

    if (!username.trim()) {
      this.setState({ error: 'El nombre de usuario es obligatorio.' });
      return;
    }

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
      <View style={styles.container}>
        <Text style={styles.titulo}>Registrate</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />

        {this.state.error ? <Text style={styles.errorTexto}>{this.state.error}</Text> : null}

        <TouchableOpacity style={styles.boton} onPress={this.handleRegister}>
          <Text style={styles.buttonTexto}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkBoton} onPress={() => this.props.navigation.navigate('login')}>
          <Text style={styles.linkBotonTexto}>¿Ya tienes una cuenta? Volver al Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  boton: {
    width: '100%',
    height: 50,
    backgroundColor: '#3897f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 15,
  },
  linkBotonTexto: {
    color: '#3897f0',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  errorTexto: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});