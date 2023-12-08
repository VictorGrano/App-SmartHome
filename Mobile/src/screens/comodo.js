import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, database } from '../services/fireBaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

const AddComodoScreen = () => {
  const navigation = useNavigation();

  const [nomeComodo, setNomeComodo] = useState('');
  const [descricaoComodo, setDescricaoComodo] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid('');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Função para adicionar um cômodo
  const handleAddRoom = async () => {
    if (!nomeComodo || !descricaoComodo) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    try {
      await new Promise((resolve) => {
        if (uid) {
          resolve();
        }
      });

      const docRef = await addDoc(collection(database, 'comodos'), {
        nome_comodo: nomeComodo,
        descricao: descricaoComodo,
        userid: uid,
        color: '',
        brightness: 0,
        temperature: 0,
        lightsOn: false,
        acOn: false,
      });
      console.log('Documento adicionado com sucesso com ID: ', docRef.id);
      navigation.navigate('Home');
      setNomeComodo('');
      setDescricaoComodo('');
    } catch (error) {
      console.error('Erro ao adicionar o documento: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Cômodo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Cômodo"
        value={nomeComodo}
        onChangeText={text => setNomeComodo(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição do Cômodo"
        value={descricaoComodo}
        onChangeText={text => setDescricaoComodo(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddRoom}>
        <Text style={styles.buttonText}>Adicionar Cômodo</Text>
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
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
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
});

export default AddComodoScreen;
