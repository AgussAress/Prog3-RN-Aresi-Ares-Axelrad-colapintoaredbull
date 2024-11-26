import React, { Component } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { auth, db } from "../firebase/config";
import { LinearGradient } from "expo-linear-gradient";

export default class Register extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    error: "",
  };

  componentDidMount() {
    if (auth.currentUser) {
      this.props.navigation.navigate("login");
    }
  }

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
          .catch(() => {
            this.setState({ error: "Error al guardar los datos del usuario." });
          });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  isFormValid = () => {
    const { email, password, username } = this.state;
    return email.trim() && password.trim() && username.trim();
  };

  render() {
    const isButtonDisabled = !this.isFormValid();

    return (
      <LinearGradient colors={["#A7ACB2", "#FFFFFF"]} style={styles.container}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.form}>
          <Text style={styles.title}>Crea tu cuenta</Text>

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

          {this.state.error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{this.state.error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.button, isButtonDisabled && styles.disabledButton]}
            onPress={this.handleRegister}
            disabled={isButtonDisabled}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => this.props.navigation.navigate("login")}
          >
            <Text style={styles.linkButtonText}>¿Ya tienes una cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  form: {
    width: width > 600 ? "40%" : "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#e87474",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#e87474",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  linkButton: {
    marginTop: 15,
    alignItems: "center",
  },
  linkButtonText: {
    color: "#e87474",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  errorBox: {
    backgroundColor: "#ffe4e4",
    borderWidth: 1,
    borderColor: "#ff4d4d",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "#ff4d4d",
    fontSize: 14,
    textAlign: "center",
  },
  form: {
    width: "90%", 
    maxWidth: 400, 
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: width > 600 ? 30 : 20, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#e87474",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: width > 600 ? 18 : 14, 
  },
  boton: {
    width: "100%",
    height: 50,
    backgroundColor: "#e87474",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

