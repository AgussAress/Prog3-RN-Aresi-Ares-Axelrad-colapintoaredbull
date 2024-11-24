import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { db, auth } from "../firebase/config";
import Likes from "../componentes/Likes";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    if (!auth.currentUser ) {
      this.props.navigation.navigate("login");
    } else {
      this.loadPosts();
    }
  }

  loadPosts = () => {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let postsArray = [];
        docs.forEach((doc) => {
          postsArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posts: postsArray,
        });
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
  
        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <View style={styles.header}>
                <Image
                  source={{
                    uri: item.data.avatar || "https://via.placeholder.com/50",
                  }}
                  style={styles.avatar}
                />
                <Text style={styles.username}>
                  {item.data.owner || "Usuario desconocido"}
                </Text>
              </View>

              <Text style={styles.postText}>{item.data.text}</Text>

              {/* Footer con likes y acciones */}
              <View style={styles.footer}>
                <Likes postId={item.id} />
                <Text style={styles.likesCount}>
                  ❤️ {item.data.arrCopados ? item.data.arrCopados.length : 0}
                </Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  listContainer: {
    padding:10
  },
  postContainer: {
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  postText: {
    fontSize: 16,
    color: "#555",
    padding: 15,
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  likesCount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});
