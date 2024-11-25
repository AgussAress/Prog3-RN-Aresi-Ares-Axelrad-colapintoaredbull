import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { db, auth } from "../firebase/config";
import { LinearGradient } from 'expo-linear-gradient';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      posts: [],
    };
  }

  componentDidMount() {
    if (!auth.currentUser) {
      this.props.navigation.navigate('login');
    } else {
      this.loadUserInfo();
      this.loadUserPosts();
    }
  }

  loadUserInfo() {
    db.collection('users')
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let arrayDocs = [];
        docs.forEach((doc) => {
          arrayDocs.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        this.setState({
          userInfo: arrayDocs,
        });
      });
  };

  loadUserPosts() {
    db.collection('posts')
      .where("owner", "==", auth.currentUser.email)
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

  deletePost(postId) {
    db.collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert("Post eliminado", "El post ha sido eliminado");
      })
      .catch((error) => {
        Alert.alert("Error", "No se pudo eliminar el post");
        console.error("Error eliminando post:", error);
      });
  };

  logout() {
    auth.signOut()
      .then(() => {
        this.props.navigation.replace('login');
      })
      .catch((error) => {
        Alert.alert("Error al cerrar sesión", error.message);
        console.error("Error al cerrar sesión:", error);
      });
  };

  render() {
    return (
      <LinearGradient colors={['#A7ACB2', '#FFFFFF']} style={styles.container}>
        <Text style={styles.text}>Perfil</Text>
        {this.state.userInfo.length > 0 ? (
          <View style={styles.info}>
            <View style={styles.userInfoContainer}>
              <Text style={styles.userInfoText}>Usuario</Text>
              <Text style={styles.userInfoLabel}>{this.state.userInfo[0].data.username}</Text>
            </View>
            <View style={styles.userInfoContainer}>
              <Text style={styles.userInfoText}>Email</Text>
              <Text style={styles.userInfoLabel}>{this.state.userInfo[0].data.owner}</Text>
            </View>
            <View style={styles.postCount}>
              <Text style={styles.postCountNumber}>{this.state.posts.length}</Text>
              <Text style={styles.postCountLabel}>posts</Text>
            </View>
          </View>


        ) : (
          <Text style={styles.loadingText}>Cargando información...</Text>
        )}

        {this.state.posts.length === 0 ? (
          <Text style={styles.noPostsText}>No hay posteos para mostrar.</Text>
        ) : (
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <Text>Tu posteo:</Text>
                <Text style={styles.postText}>{item.data.text}</Text>
                <TouchableOpacity onPress={() => this.deletePost(item.id)}>
                  <Text style={styles.deleteButton}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
        <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  userInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userInfoLabel: {
    fontSize: 14,
    color: '#555',
  },
  postCount: {
    alignItems: 'center',
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  postCountNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  postCountLabel: {
    fontSize: 14,
    color: '#555',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center"
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  noPostsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  postContainer: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    elevation: 2,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
