import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch, Button } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import ColorPicker from 'react-native-wheel-color-picker';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { auth, database } from '../services/fireBaseConfig';

const ControlScreen = ({route, navigation}) => {
  const {comodoNome} = route.params;
  const [uid, setUid] = useState('');
  const [color, setColor] = useState('');
  const [brightness, setBrightness] = useState(0);
  const [temperature, setTemperature] = useState(16);
  const [lightsOn, setLightsOn] = useState(false);
  const [acOn, setAcOn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        setUid(user.uid);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchControlData = async () => {
      try {
        const comodoRef = collection(database, 'comodos');
        const comodoQuery = query(comodoRef, where('userid', '==', uid), where('nome_comodo', '==', comodoNome));
        const querySnapshot = await getDocs(comodoQuery);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Definir os valores dos estados com base nos dados do Firestore
          setLightsOn(data.lightsOn || false);
          setAcOn(data.acOn || false);
          setBrightness(data.brightness || 0);
          setTemperature(data.temperature || 16);
          setColor(data.color || '');
        });
      } catch (error) {
        console.error('Erro ao carregar informações:', error);
      }
    };

    fetchControlData();
  }, [uid, comodoNome]);

  const handleColorChange = (color) => {
    setColor(color);
  };

  const handleBrightnessChange = (value) => {
    setBrightness(Math.round(value));
  };

  const handleTemperatureChange = (value) => {
    setTemperature(Math.round(value));
  };

  const handleSave = async () => {
    const comodoRef = collection(database, 'comodos');
    const comodoQuery = query(comodoRef, where('userid', '==', uid), where('nome_comodo', '==', comodoNome));
    const querySnapshot = await getDocs(comodoQuery);

    querySnapshot.forEach(async (doc) => {
      try {
        await updateDoc(doc.ref, {
          color: color,
          brightness: brightness,
          temperature: temperature,
          lightsOn: lightsOn,
          acOn: acOn,
        });
        navigation.goBack();
      } catch (error) {
        console.error('Erro ao atualizar informações:', error);
      }
    });
  };

  return (
    <View style={styles.container}>
    <View style={styles.switchContainer}>
      <Text style={styles.switchText}>Luzes</Text>
      <Switch
        value={lightsOn}
        onValueChange={(value) => setLightsOn(value)}
        color="blue"
      />
    </View>
  
    {lightsOn && (
      <View>
        <Text style={styles.sectionTitle}>Brilho: {brightness}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={brightness}
          onValueChange={handleBrightnessChange}
          step={1}
          thumbTintColor="blue"
          minimumTrackTintColor="blue"
          maximumTrackTintColor="#000000"
        />
        <Text style={styles.sectionTitle}>Cor das Luzes</Text>
        <View>
          <ColorPicker style={styles.pickerContainer}
            color={color}
            onColorChange={handleColorChange}
          />
        </View>
      </View>
    )}
  
    <View style={styles.switchContainer}>
      <Text style={styles.switchText}>Ar-condicionado</Text>
      <Switch
        value={acOn}
        onValueChange={(value) => setAcOn(value)}
        color="blue"
      />
    </View>
  
    {acOn && (
      <View>
        <Text style={styles.sectionTitle}>Ajustar Temperatura</Text>
        <Slider
          style={styles.slider}
          minimumValue={16}
          maximumValue={30}
          value={temperature}
          onValueChange={handleTemperatureChange}
          step={1}
          thumbTintColor="blue"
          minimumTrackTintColor="blue"
          maximumTrackTintColor="#000000"
        />
        <Text style={styles.sliderValue}>Temperatura: {temperature}°C</Text>
      </View>
    )}
  
    <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
      Salvar Configurações
    </Button>
  </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 150,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20, // Adicionando um marginTop para afastar o switch superior
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  switchText: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
  },
  slider: {
    marginBottom: 10,
  },
  sliderValue: {
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: 'blue',
  },
});

export default ControlScreen;
