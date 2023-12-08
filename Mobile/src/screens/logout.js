import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { auth } from '../services/fireBaseConfig';

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    const signOut = async () => {
        try {
          await auth.signOut();
        } catch (error) {
          console.error('Erro ao fazer logout:', error);
        }
      };
    signOut();
    navigation.replace('Login');
  }, []);

  return (
    <View>
      <Text>Fazendo logout...</Text>
    </View>
  );
};

export default LogoutScreen;
