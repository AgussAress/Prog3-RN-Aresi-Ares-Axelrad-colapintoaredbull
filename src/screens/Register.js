import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { auth, db } from "../firebase/config";

export default class Register extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    error: "",
  };

  handleRegister = () => {
    const { email, password, username } = this.state;

    if (!username.trim()) {
      this.setState({ error: "El nombre de usuario es obligatorio." });
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        db.collection("users")
          .add({
            owner: user.email,
            username: username,
            createdAt: new Date(),
          })
          .then(() => {
            this.props.navigation.navigate("anidada");
          })
          .catch((err) => {
            this.setState({ error: "Error al guardar los datos del usuario." });
          });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Registrate</Text>

        <View style={styles.form}>
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

          <TouchableOpacity style={styles.linkBoton} onPress={() => this.props.navigation.navigate("login")}>
            <Text style={styles.linkBotonTexto}>¿Ya tienes una cuenta? Volver al Login</Text>
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
