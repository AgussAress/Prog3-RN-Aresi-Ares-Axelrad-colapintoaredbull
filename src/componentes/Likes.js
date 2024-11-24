import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import {db, auth} from '../firebase/config'
import firebase from 'firebase'

export default class Likes extends Component {

    constructor(props){
        super(props)
        this.state = {
            liked: false,
        }
    }

    componentDidMount() {
        // Verificar si el post ya ha sido "likado" por el usuario
        const { postId } = this.props;
        db.collection('posts')
        .doc(postId)
        .get()
        .then(doc => {
            if (doc.exists) {
                const data = doc.data();
                if (data.likes && data.likes.includes(auth.currentUser.email)) {
                    this.setState({ liked: true });
                }
            }
        });
    }

    cambioLike = () => {
        const { postId } = this.props;
        if (this.state.liked) {
            this.noLikeado(postId);
        } else {
            this.actualizarLikeado(postId);
        }
    };

    actualizarLikeado(idDocumento) {
        db.collection('posts') //utilizo esta collection porque voy a querer ddecirle a cada usuario si es o no copado
            .doc(idDocumento) //el metodo doc va a estar esperando justamente lo que voy a estar pasando por parametro
            .update({
                arrCopados: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)//liked: true //arrayUnion() para agregar // arrayRemove() para sacar
            })
            .then(()=> {
                this.setState({
                    liked:true
                })
            })
    }

    noLikeado(idDocumento){ //tiene que saber a donde apuntar por ende pasamos ese parametro
        db.collection("posts")
        .doc(idDocumento)
        .update({
            arrCopados: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) //asi saca al email si se vuelve a apretar el boton
        })// como es un metodo asincronico podemos asignarle un then
        .then(()=> {
            this.setState({
                liked:false
            })
        })
    }

    render() {
        return (
            <TouchableOpacity onPress={this.cambioLike} style={this.state.liked ? styles.likedButton : styles.button}>
                <Text style={styles.buttonText}>{this.state.liked ? 'Ya no me gusta' : 'Me gusta'}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: '#e87474',
        borderRadius: 5,
    },
    likedButton: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
});
