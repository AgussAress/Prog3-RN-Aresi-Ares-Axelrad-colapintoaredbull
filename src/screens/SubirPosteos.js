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

    const postData = {
      text: postText,
      createdAt: new Date(),
      owner: auth.currentUser .email,
      likes: [],
    };

    db.collection('posts')
      .add(postData)
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
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
});