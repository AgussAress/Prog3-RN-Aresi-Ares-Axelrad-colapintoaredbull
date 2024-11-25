import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default class Likes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    };
  }

  componentDidMount() {
    const { postId } = this.props;

    db.collection('posts')
      .doc(postId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const isLiked = data.arrCopados?.includes(auth.currentUser.email);
          this.setState({ liked: isLiked });
        }
      });
  }

  actualizarLikeado(idDocumento) {
    db.collection('posts')
      .doc(idDocumento)
      .update({
        arrCopados: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        this.setState({ liked: true });
      });
  }

  yaNoEsLikeado(idDocumento) {
    db.collection('posts')
      .doc(idDocumento)
      .update({
        arrCopados: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then(() => {
        this.setState({ liked: false });
      });
  }

  manejarCambioLike() {
    const { postId } = this.props;
    this.state.liked
      ? this.yaNoEsLikeado(postId)
      : this.actualizarLikeado(postId);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.manejarCambioLike()}
        style={this.state.liked ? styles.likedButton : styles.button}
      >
        <Text style={styles.buttonText}>
          {this.state.liked ? 'Ya no me gusta' : 'Me gusta'}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    marginTop: 10,
  },
  likedButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
