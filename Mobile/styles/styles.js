import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  description: {
    fontSize: 20, // Defina o tamanho da fonte desejado
    textAlign: 'left', // Alinhe o texto ao centro
    marginBottom: 10, // Margem inferior para separar do restante do conteúdo
    color: 'gray', // Defina a cor desejada para a descrição
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  addButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'white',
    margin: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  card_center: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'white',
    margin: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  information: {
    padding: 16,
  },
  spaceBelowTitle: {
    height: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: 'red', // Cor do botão de exclusão
    padding: 12,
    borderRadius: 8,
    marginTop: 10, // Margem superior para separar do botão principal
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
});

export default styles;
