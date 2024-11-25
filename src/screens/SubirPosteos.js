import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, Dimensions } from "react-native";
import { db } from "../firebase/config";
import { auth } from "../firebase/config";
import { LinearGradient } from "expo-linear-gradient";

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: "",
    };
  }

  CreatePost() {
    const { postText } = this.state;

    if (postText.trim() === "") {
      Alert.alert("Error", "El texto del posteo no puede estar vacío.");
      return;
    }

    const post = {
      text: postText,
      createdAt: new Date(),
      owner: auth.currentUser.email,
      likes: [],
      avatar: "https://via.placeholder.com/50"
    };

    db.collection("posts")
      .add(post)
      .then(() => {
        Alert.alert("Éxito", "Posteo creado con éxito.");
        this.setState({ postText: "" });
      })
      .catch((error) => {
        console.error("Error al crear el posteo:", error);
        Alert.alert("Error", "No se pudo crear el posteo. Inténtalo de nuevo.");
      });
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
          <Text style={styles.title}>Crear Nuevo Posteo</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu posteo aquí..."
            multiline
            numberOfLines={4}
            value={this.state.postText}
            onChangeText={(text) => this.setState({ postText: text })}
          />
          <TouchableOpacity style={styles.button} onPress={() => this.CreatePost()}>
            <Text style={styles.buttonText}>Publicar</Text>
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
  form: {
    width: width > 600 ? "40%" : "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#e87474",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  button: {
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
