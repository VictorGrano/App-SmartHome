import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/styles';

function Card({ title, description, onDelete }) {
  const navigation = useNavigation();

  const handleDelete = () => {
    onDelete(title);
  };

  const handleNavigateToControlScreen = () => {
    navigation.navigate('ControlScreen', { comodoNome: title });
  };

  return (
    <View style={styles.card}>
      <View style={styles.information}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.spaceBelowTitle} />
        <TouchableOpacity style={styles.button} onPress={handleNavigateToControlScreen}>
          <Text style={styles.buttonText}>Ir para a página</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Excluir Cômodo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Card;
