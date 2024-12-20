import React, { Component } from "react";
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { db } from "../firebase/config";
import { LinearGradient } from "expo-linear-gradient";

export default class BuscadorUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      resultados: [],
      publicaciones: [],
      usuarioSeleccionado: null,
    };
  }

  buscarUsuarios = (texto) => {
    this.setState({ query: texto, resultados: [], publicaciones: [], usuarioSeleccionado: null });

    if (texto.trim() === "") {
      return;
    }

    db.collection("users")
      .where("username", ">=", texto)
      .where("username", "<=", texto + "\uf8ff")
      .get()
      .then((snapshot) => {
        const resultados = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Usuarios encontrados:", resultados);
        this.setState({ resultados });
      })
      .catch((error) => console.log(error));
  };

  verPublicacionesUsuario = (usuario) => {
    this.setState({ usuarioSeleccionado: usuario, publicaciones: [] });

    console.log("Usuario seleccionado:", usuario);

    db.collection("posts")
      .where("owner", "==", usuario.email)
      .get()
      .then((snapshot) => {
        const publicaciones = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Publicaciones encontradas:", publicaciones);
        this.setState({ publicaciones });
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { resultados } = this.state;

    return (
      <LinearGradient
        colors={["#A7ACB2", "#FFFFFF"]}
        style={styles.container}
      >
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TextInput
          style={styles.input}
          placeholder="Buscar usuarios..."
          value={this.state.query}
          onChangeText={(texto) => this.buscarUsuarios(texto)}
        />
        {resultados.length > 0 ? (
          <FlatList
            data={resultados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => this.verPublicacionesUsuario(item)}
              >
                <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
                  {item.username}
                </Text>
              </TouchableOpacity>
            )}
            style={styles.resultList}
          />
        ) : (
          this.state.query !== "" && (
            <Text style={styles.noResults}>No hay resultados de búsqueda</Text>
          )
        )}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 12,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: "#ffffff",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
    flexShrink: 0,
  },
  resultList: {
    flexGrow: 1,
    width: "100%",
  },
  resultItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    width: "100%",
  },
  username: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    textAlign: "left",
    overflow: "hidden",
    flex: 1,
    maxWidth: "100%",
  },
  noResults: {
    fontSize: 16,
    color: "#757575",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});
