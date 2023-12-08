import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from '../services/fireBaseConfig';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (username && password && confirmPassword) {
      if (password === confirmPassword) {
        if (password.length >= 6) {
          try {
            await createUserWithEmailAndPassword(auth, username, password);
            navigation.replace('Login');
          } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
              setError('O email já está associado a uma conta existente.');
            } else {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode);
              console.log(errorMessage);
            }
          }
        } else {
          setError('A senha deve conter pelo menos 6 caracteres.');
        }
      } else {
        setError('As senhas não coincidem. Tente novamente.');
      }
    } else {
      setError('Preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace('Login')}>
        <Text style={styles.loginText}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
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

export default RegisterScreen;
