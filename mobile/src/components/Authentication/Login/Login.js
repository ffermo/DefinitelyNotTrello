import React, { Component } from 'react';
import {  StyleSheet, View, Text } from 'react-native';

import LoginForm from './LoginForm';

export default class Login extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View>
          
        </View>
        
        <View style={styles.formContainer}>
            <LoginForm navigation={this.props.navigation}/>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  }, 
  formContainer: {
    flex: 1
  },
  innerText: {
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
