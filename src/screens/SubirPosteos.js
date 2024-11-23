import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from '../firebase/config';
import { auth } from '../firebase/config';

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: '',
    };
  }

  CreatePost = () => {
    const { postText } = this.state;

    if (postText.trim() === '') {
      Alert.alert('Error', 'El texto del posteo no puede estar vacío.');
      return;
    }

    const posts = {
      text: postText,
      createdAt: new Date(),
      owner: auth.currentUser.email,
      likes: [],
    };

    db.collection('posts')
      .add(posts)
      .then(() => {
        Alert.alert('Éxito', 'Posteo creado con éxito.');
        this.setState({ postText: '' }); 
      })
      .catch((error) => {
        console.error("Error al crear el posteo: ", error);
        Alert.alert('Error', 'No se pudo crear el posteo. Inténtalo de nuevo.');
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crear Nuevo Posteo</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribi tu posteo aca..."
          keyboardType='default'
          value={this.state.postText}
          onChangeText={(text) => this.setState({ postText: text })}
        />
        <TouchableOpacity  onPress={this.CreatePost} >
        <Text>Crear Post</Text>
        </TouchableOpacity>
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
    title: {
      fontSize: 28, 
      fontWeight: 'bold',
      color: '#000000', 
      marginBottom: 30, 
      textAlign: 'center', 
    },
    input: {
      height: 100, 
      borderColor: '#007BFF', 
      borderWidth: 1, 
      borderRadius: 5, 
      padding: 10, 
      marginBottom: 20, 
      backgroundColor: '#F0F0F0', 
      fontSize: 16, 
      color: '#000000', 
    },
    
  });