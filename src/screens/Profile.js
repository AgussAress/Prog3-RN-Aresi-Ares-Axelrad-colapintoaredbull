import React, {Component} from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import {db} from "../firebase/config"
import {auth} from "../firebase/config"
import SubirPosteos from "../screens/SubirPosteos"


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

  handleLogout = () =>
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
      {this.state.userInfo.length >0
      ?
      (
        <>
        <Text style={styles.infoText}>Nombre de usuario: {this.state.userInfo[0].data.username}</Text>
        <Text style={styles.infoText}>Email: {this.state.userInfo[0].data.owner}</Text>
      </>
      )
      
      :
      (<Text style={styles.loadingText}>Cargando informacion...</Text>)}

      <TouchableOpacity title = "Crear posteos" onPress={() => this.props.navigation.navigate('SubirPosteos')}>
          <Text style={styles.createPostButton}>Crear posteos</Text>
        </TouchableOpacity>
      
      <FlatList
        data = {this.state.posts}
        keyExtractor = {(item)=> item.id}
        renderItem= {({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postText}>{item.data.content}</Text>
            <TouchableOpacity title="Eliminar" onPress={() => this.deletePost(item.id)} />
          </View>
        )}
    
      />

      <TouchableOpacity title="Cerrar sesión" onPress={this.handleLogout} color="#FF0000" />
    </View>
  );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff', // Fondo blanco
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000000', // Texto negro
      marginBottom: 20,
    },
    infoText: {
      fontSize: 18,
      color: '#000000', // Texto negro
      marginVertical: 5,
    },
    loadingText: {
      fontSize: 18,
      color: '#0000FF', // Texto azul para el loading
    },
    createPostButton: {
      backgroundColor: '#007BFF', // Color de fondo
      color: '#FFFFFF', // Color del texto
      padding: 10, // Espaciado interno
      borderRadius: 5, // Bordes redondeados
      textAlign: 'center', // Centrar el texto
      marginTop: 20, // Espaciado superior
      fontSize: 18, // Tamaño de fuente
      fontWeight: 'bold', // Negrita
    }
});
