import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { auth } from "../firebase/config";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    console.log("Componente montado");
  }

  login() {
    const { email, password, usuario } = this.state;
    auth
      .signInWithEmailAndPassword(email, password, usuario)
      .then((userCredential) => {
        console.log("Inicio de sesión exitoso");
        console.log(userCredential.user);
        this.props.navigation.navigate("HomeMenu");
      })
      .catch((error) => {
        // Manejo de errores de autenticación
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          Alert.alert("Error", "Credenciales incorrectas");
        } else {
          Alert.alert("Error", error.message);
        }
      });
  }

  irARegister() {
    this.props.navigation.navigate("Register");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.login()}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.irARegister()}>
          <Text>Ir al registro</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  input: {
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});