import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { auth } from "../firebase/config";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleLogin = () => {
    const { email, password } = this.state;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("anidada");
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Inicia Sesión</Text>

        <View style={styles.form}>
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

          <TouchableOpacity style={styles.boton} onPress={this.handleLogin}>
            <Text style={styles.buttonTexto}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkBoton} onPress={() => this.props.navigation.navigate("register")}>
            <Text style={styles.linkBotonTexto}>¿No tienes una cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  form: {
    width: width > 600 ? "40%" : "90%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  boton: {
    width: "100%",
    height: 50,
    backgroundColor: "#3897f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkBoton: {
    marginTop: 15,
    alignItems: "center",
  },
  linkBotonTexto: {
    color: "#3897f0",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  errorTexto: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
