import React, {Component} from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import {db} from "../firebase/config"
import {auth} from "../firebase/config"
import SubirPosteos from "../screens/SubirPosteos"
import Likes from '../componentes/Likes';


export default class Profile extends Component {

  constructor(props){
    super(props)
    this.state = {
      userInfo: [], 
      posts: []
    }
  }

  componentDidMount(){
    this.loadUserInfo();
    this.loadUserPosts()
  }
  
  loadUserInfo = ()=>{
  db.collection('users')
    .where("owner", "==", auth.currentUser.email)
    .onSnapshot((docs)=> {
      let arrayDocs = []

      docs.forEach((doc)=>{
        arrayDocs.push({
          id: doc.id, 
          data: doc.data()
        })
      })

      this.setState({
        userInfo: arrayDocs
      }, ()=> console.log("este es el estado", this.state))
    })
  }

  loadUserPosts = ()=>{
    db.collection('posts')
    .where("owner", "==", auth.currentUser.email)
    .onSnapshot((docs)=>{
      let postsArray = [];
      docs.forEach((doc)=>{
        postsArray.push({
          id:doc.id,
          data:doc.data()
        })
      })
      this.setState({
        posts: postsArray
      }, ()=> console.log("posts del usuario:", this.state.posts)
      )
    })
  }

  deletePost = (postId) => {
    db.collection('posts').doc(postId).delete()
    .then(()=>{
      Alert.alert("Post eliminado", "El post ha sido eliminado")
    })
  }

  logout = () =>
    auth.signOut()
     .then(()=> {
      this.props.navigation.navigate('Login')
     })
     .catch((error)=> {
      console.log("Error al cerrar sesion")
     })

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Profile</Text>
        {this.state.userInfo.length > 0
          ?
          (
            <>
              <Text style={styles.infoText}>Nombre de usuario: {this.state.userInfo[0].data.username}</Text>
              <Text style={styles.infoText}>Email: {this.state.userInfo[0].data.owner}</Text>
              <Text style={styles.infoText}>Cantidad de posteos: {this.state.posts.length}</Text>
            </>
          )

          :
          (<Text style={styles.loadingText}>Cargando informacion...</Text>)}

        <TouchableOpacity onPress={this.handleLogout}>
          <Text style={styles.createPostButton}>Cerrar sesión</Text>
        </TouchableOpacity>

        {this.state.posts.length === 0 ? (
          <Text>No hay posteos para mostrar.</Text>
        ) : (
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <Text>Tu posteo:</Text>
                <Text style={styles.postText}>{item.data.text}</Text> 
                <Likes postId={item.id} />
                <TouchableOpacity onPress={() => this.deletePost(item.id)}>
                  <Text style={styles.deleteButton}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
            />
          )}
        
        <TouchableOpacity title="Cerrar sesión" onPress={this.logout} color="#FF0000" />
      </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    padding: 20, 
  },
  text: {
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#000000', 
    marginBottom: 30, 
    textAlign: 'center', 
  },
  infoText: {
    fontSize: 18,
    color: '#000000', 
    marginVertical: 10, 
    padding: 10, 
    borderRadius: 5, 
    backgroundColor: '#F0F0F0', 
  },
  loadingText: {
    fontSize: 18,
    color: '#0000FF', 
    textAlign: 'center', 
    marginTop: 20, 
  },
  createPostButton: {
    backgroundColor: '#007BFF', 
    color: '#FFFFFF', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 5, 
    textAlign: 'center', 
    marginTop: 30, 
    fontSize: 18,
    fontWeight: 'bold',
    elevation: 2, 
  },
  postContainer: {
    padding: 15,
    marginVertical: 5, 
    borderRadius: 5, 
    backgroundColor: '#F9F9F9', 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1, 
  },
  postText: {
    fontSize: 16,
    color: '#000000', 
  },
  deleteButton: {
    color: '#FF0000', 
    fontWeight: 'bold',
    marginTop: 10, 
    textAlign: 'right', 
  }})