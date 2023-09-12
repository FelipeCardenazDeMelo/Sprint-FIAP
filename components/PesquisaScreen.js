import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Icon from 'react-native-vector-icons/FontAwesome';


const PesquisaScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [originalCards, setOriginalCards] = useState([]); 
  const [filteredCards, setFilteredCards] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('empresasData')
      .then(data => {
        if (data) {
          const parsedData = JSON.parse(data);
          setOriginalCards(parsedData);
          setFilteredCards(parsedData); 
        } else {
          fetch('https://mean-pears-change.loca.lt/api/empresas')
            .then(response => response.json())
            .then(data => {
              setOriginalCards(data);
              setFilteredCards(data);
              AsyncStorage.setItem('empresasData', JSON.stringify(data));
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
        }
      })
      .catch(error => console.error('Erro ao obter dados do AsyncStorage:', error));
  }, []);

  const handleSearch = () => {
    const filtered = originalCards.flat().filter((card) =>
      card.nome.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCards(filtered);
    setSearching(true);
  };

  const handleClear = () => {
    setSearchText('');
    setFilteredCards([]);
    setSearching(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar por nome..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} onPress={handleSearch} />

      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.textResult}>Resultados</Text>
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />

      {searching ? (
        filteredCards.length > 0 ? (
          <FlatList
            data={filteredCards}
            keyExtractor={(item, index) => `${item.nome}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <Text style={styles.cardName}>{item.nome}</Text>
                <Text style={styles.cardSegment}>{item.segmento}</Text>
                <Text style={styles.cardKm}>{item.km} km</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noResultsText}>Não encontramos resultados</Text>
        )
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
    padding: 5
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: '#FF5C00',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  clearButton: {
    backgroundColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    overflow: 'hidden',
    padding: 16,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSegment: {
    fontSize: 14,
    color: '#888',
  },
  cardKm: {
    fontSize: 14,
    color: '#FF5C00',
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },

  textResult:{
    fontSize: 22,
    marginTop: 10
  },

  divider: {
    height: 1, 
    backgroundColor: 'black', 
    marginVertical: 10, 
    borderRadius: 20,
    width: "100%",
    marginTop: "3%"
  },
});

export default PesquisaScreen;
