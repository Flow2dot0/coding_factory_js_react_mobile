import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import { clearSign, addUser } from "../actions";
import { username, password } from '../actions';


const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: "100%"
    },
    container: {
      flex: 1,
      paddingLeft: 0,
      padding: 20,
      width: "100%",
      maxWidth: 340,
      alignSelf: "center",
      alignItems: "center",
    },
    header : {
        fontSize: 24,
        color: "#9c27b0"
    },
    text: {
        width: "100%",
        paddingBottom: 5
      },
      image: {
        flex: 1,
        width: null,
        height: null,
    }
  });

const SignupScreen = ({navigation}) => {
  const state = useSelector(state => state.signReducer);
  const regList = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();
    return(
        <ImageBackground
        source={require("../assets/register.jpg")}
        resizeMode="cover"
        style={styles.background}>

            <View style={styles.container}> 
                <Text style={styles.header}>Register</Text>
                <TextInput
                    style={styles.text}
                    label='Username'
                    value={state.username}
                    mode="outlined"
                    selectionColor="#9c27b0"
                    underlineColor="transparent"
                    onChange={(t) => dispatch(username(t.nativeEvent.text))}
                />
                <TextInput
                    style={styles.text}
                    label='Password'
                    value={state.password}
                    onChange={(t) => dispatch(password(t.nativeEvent.text))}
                    keyboardType="visible-password"
                    mode="outlined"
                    selectionColor="#9c27b0"
                    underlineColor="transparent"
                />
                  <Button style={{width:200}} mode="contained" onPress={() => {
                    if(state.username != "" && state.password) {
                      dispatch(addUser({
                        username: state.username,
                        password: state.password
                      }));
                      console.log("new state", regList);
                    }
                    
                  }} >
                    Create my account
                  </Button>
                  <Button  mode="text" onPress={() => navigation.navigate("Signin") }>
                    You have already an account ?
                  </Button>

            </View>
        </ImageBackground>
    );
}

export default SignupScreen;