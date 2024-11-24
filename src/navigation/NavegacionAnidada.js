import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Home from "../screens/Home";
import Profile from '../screens/Profile';
import BuscadorUsers from '../screens/BuscadorUsers';
import SubirPosteos from "../screens/SubirPosteos";

const Tab = createBottomTabNavigator();

export default class NavegacionAnidada extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome 
                name="home" 
                size={size || 24} 
                color={focused ? 'tomato' : 'black'} 
              />
            )
          }} 
        />
        <Tab.Screen 
          name="Profile" 
          component={Profile} 
          options={{ 
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome 
                name="user" 
                size={size || 24} 
                color={focused ? 'tomato' : 'black'} 
              />
            )
          }} 
        />
        <Tab.Screen 
          name="Buscador" 
          component={BuscadorUsers} 
          options={{ 
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome 
                name="search" 
                size={size || 24} 
                color={focused ? 'tomato' : 'black'} 
              />
            )
          }} 
        />
        <Tab.Screen 
          name="Crear posteo" 
          component={SubirPosteos} 
          options={{ 
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome 
                name="plus-circle" 
                size={size || 24} 
                color={focused ? 'tomato' : 'black'} 
              />
            )
          }} 
        />
      </Tab.Navigator>
    );
  }
}
