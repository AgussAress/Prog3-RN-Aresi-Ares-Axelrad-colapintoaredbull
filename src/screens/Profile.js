import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {db} from "../firebase/config"
import {auth} from "../firebase/config"


export default class Profile extends Component {

  constructor(props){
    super(props)
    this.state = {
      userInfo: []
    }
  }

  componentDidMount(){
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

  render(){
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      {this.state.userInfo.length >0
      ?
      (<Text> Nombre de usuario:
        {this.state.userInfo[0].data.username}
      </Text>
      )
      :
      (<Text>Cargando informacion...</Text>)}
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
