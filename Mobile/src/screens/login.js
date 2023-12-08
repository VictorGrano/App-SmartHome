import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../services/fireBaseConfig';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegistrar = () => {
    navigation.replace('Register');
  }
  const handleLogin = async () => {
    if (username !== "" && password !== "") {
      try {
        await signInWithEmailAndPassword(auth, username, password);
        navigation.replace('Main');
      } catch (error) {
        console.log(error.code);
        if (error.code === 'auth/invalid-email') {
          setError('Email inválido!')
        }
        if (error.code === 'auth/invalid-login-credentials') {
          setError('Credenciais inválidas!')
        }
      }
    }
    else {
      setError('Preencha todos os campos.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace('Register')}>
      <Text style={styles.loginText}>Não tem uma conta? Registre-se aqui!</Text>
    </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '75%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    width: '75%',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  loginText: {
    marginTop: 10,
    color: 'blue',
  },
});

export default LoginScreen;
