import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import Card from '../../components/cards/cards';
import Api from '../services/api';
import styles from '../../styles/styles';
import CircularProgress from 'react-native-circular-progress-indicator';
import { auth, database } from '../services/fireBaseConfig';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const MainScreen = () => {
  const [temperatura, setTemperatura] = useState("");
  const [cidade, setCidade] = useState("");
  const [uid, setUid] = useState('');
  const [comodos, setComodos] = useState([]);
  const [comodoAdded, setComodoAdded] = useState(false);

  const fetchData = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);

        if (uid || comodoAdded) {
          const comodosCollectionRef = collection(database, 'comodos');
          const userComodosQuery = query(comodosCollectionRef, where('userid', '==', uid));

          try {
            const querySnapshot = await getDocs(userComodosQuery);
            const comodosData = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              comodosData.push(data);
            });
            setComodos(comodosData);
            setComodoAdded(false);
          } catch (error) {
            console.error('Erro ao buscar os cômodos: ', error);
          }
        }
      } else {
        setUid('');
      }
    });

    let { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let locationPosition = await getCurrentPositionAsync({});
    let position = `${locationPosition.coords.latitude},${locationPosition.coords.longitude}`;
    try {
      const response = await Api.get(`current.json?key=45064b6ba2194310805203850230810&q=${position}&aqi=no`);
      setTemperatura(response.data.current.temp_c);
      setCidade(response.data.location.name);
    } catch (error) {
      console.log("Erro" + error);
      Alert.alert('Erro', 'Não achamos sua localização!', [
        { text: 'OK' },
      ]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData(); // Execute a lógica de atualização dos comodos aqui
    }, [uid, comodoAdded])
  );

  const handleDeleteComodo = async (comodoNome) => {
    const comodoRef = collection(database, 'comodos');
    const comodoQuery = query(comodoRef, where('userid', '==', uid), where('nome_comodo', '==', comodoNome));
    const querySnapshot = await getDocs(comodoQuery);

    querySnapshot.forEach(async (doc) => {
      try {
        await deleteDoc(doc.ref);
        console.log('Cômodo excluído com sucesso');
        setComodos(comodos.filter(comodo => comodo.nome_comodo !== comodoNome));
      } catch (error) {
        console.error('Erro ao excluir o cômodo:', error);
      }
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.card_center}>
          <Text style={styles.title}>Olá, bem-vindo!</Text>
          <Text style={styles.subtitle}>Temperatura:</Text>
          <CircularProgress
            value={parseInt(temperatura) || 0}
            radius={80}
            duration={1000}
            valueSuffix={'°C'}
            progressValueColor={'blue'}
            maxValue={50}
            activeStrokeColor={'blue'}
          />
          <Text style={styles.subtitle}>{cidade}</Text>
        </View>
        {comodos.length === 0 ? (
          <View style={styles.addButtonContainer}>
            <Text style={styles.infoText}>
              Parece que você não tem nenhum cômodo, adicione um pelo menu ao lado!
            </Text>
          </View>
        ) : (
          comodos.map((comodo, index) => (
            <Card
              key={index}
              title={comodo.nome_comodo}
              description={comodo.descricao}
              tela="Teste"
              onDelete={() => handleDeleteComodo(comodo.nome_comodo)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;
