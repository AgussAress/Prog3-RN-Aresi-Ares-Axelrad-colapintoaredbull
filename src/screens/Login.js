import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { auth } from "../firebase/config";
import { LinearGradient } from "expo-linear-gradient";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("anidada");
      }
    });
  }

  handleLogin = () => {
    const { email, password } = this.state;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("anidada");
      })
      .catch((error) => {
        this.handleError(error);
      });
  };

  handleError = (error) => {
    console.log("Error:", error);
    if (error.code === "auth/invalid-email") {
      this.setState({ error: "El formato del email ingresado no es válido." });
    } else if (error.code === "auth/internal-error") {
      this.setState({ error: "El email o la contraseña no coinciden. Por favor, intenta nuevamente." });
    } else {
      this.setState({ error: "Ocurrió un error. Por favor, intenta nuevamente." });
    }
  };

  render() {
    return (
      <LinearGradient colors={["#A7ACB2", "#FFFFFF"]} style={styles.container}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.form}>
          <Text style={styles.titulo}>Inicia Sesión</Text>

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
              <Text style={styles.errorTexto}>{this.state.error}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={styles.boton} onPress={this.handleLogin}>
            <Text style={styles.buttonTexto}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkBoton}
            onPress={() => this.props.navigation.navigate("register")}
          >
            <Text style={styles.linkBotonTexto}>¿No tienes una cuenta? Regístrate</Text>
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
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    width: width > 600 ? "40%" : "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
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
  errorTexto: {
    color: "#ff4d4d",
    fontSize: 14,
    textAlign: "center",
  },
});
