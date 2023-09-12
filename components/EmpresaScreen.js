import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const allowedSegmentos = ['Cabeleireiro', 'Barbeiro', 'Frete', 'Pintor', 'Manicure', 'Tattoo'];

const EmpresaScreen = () => {
  const [empresa, setEmpresa] = useState({
    nome: '',
    segmento: '',
    endereco: '',
    km: '',
    favorito: false,
  });

  const handleChange = (key, value) => {
    setEmpresa({ ...empresa, [key]: value });
  };

  const handleSubmit = () => {
    if (!allowedSegmentos.includes(empresa.segmento)) {
      Alert.alert('Erro', 'O segmento deve ser um dos seguintes: Cabeleireiro, Barbeiro, Frete, Pintor, Manicure, Tattoo');
      return;
    }

    fetch('https://mean-pears-change.loca.lt/api/empresas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empresa),
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert('Sucesso', 'Empresa cadastrada com sucesso!');
          setEmpresa({
            nome: '',
            segmento: '',
            endereco: '',
            km: '',
            favorito: false,
          }); 
        } else {
          console.error('Erro ao cadastrar empresa.');
        }
      })
      .catch((error) => {
        console.error('Erro ao cadastrar empresa:', error);
      });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Criar empresa</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={(text) => handleChange('nome', text)}
        value={empresa.nome}
      />
      <TextInput
        style={styles.input}
        placeholder="Segmento"
        onChangeText={(text) => handleChange('segmento', text)}
        value={empresa.segmento}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        onChangeText={(text) => handleChange('endereco', text)}
        value={empresa.endereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Km"
        onChangeText={(text) => handleChange('km', text)}
        value={empresa.km}
      />
      
      <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
            <Text style={styles.confirmButtonText}>Cadastrar Empresa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

   heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  confirmButton: {
    backgroundColor: '#FF5C00',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: "90%",
    marginLeft: "5%"
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center"
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
    alignSelf: 'center',
    top: "25%"
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default EmpresaScreen;
