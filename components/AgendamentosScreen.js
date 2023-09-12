import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const AgendamentosScreen = () => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await fetch('https://mean-pears-change.loca.lt/api/agendamentos');
        const data = await response.json();
        setAgendamentos(data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    fetchAgendamentos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Agendamentos</Text>
      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
            }}
          >
            <Text style={styles.companyName}>{item.empresa.nome}</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Segmento:</Text>
              <Text style={styles.value}>{item.empresa.segmento}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Endereço:</Text>
              <Text style={styles.value}>{item.empresa.endereco}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Km:</Text>
              <Text style={styles.value}>{item.empresa.km}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Data:</Text>
              <Text style={styles.value}>{item.data}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Hora:</Text>
              <Text style={styles.value}>{item.hora}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    flex: 2,
    fontSize: 16,
    fontWeight: 'normal',
  },
});

export default AgendamentosScreen;
