import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ServiceCardPopup from './ServiceCardPopup'

const HomeScreen = () => {
  const [serviceData, setServiceData] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [iconOpacities, setIconOpacities] = useState([0.5, 0.5, 0.5, 0.5, 0.5, 0.5]);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [cartaoVisivel, setCartaoVisivel] = useState(false);


  useEffect(() => {
    fetch('https://mean-pears-change.loca.lt/api/empresas')
      .then(response => response.json())
      .then(data => setServiceData(data))
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  const handleIconClick = (iconIndex) => {
    setSelectedIcon(iconIndex);
    const updatedOpacities = iconOpacities.map((opacity, index) =>
      index === iconIndex - 1 ? 1 : 0.5
    );
    setIconOpacities(updatedOpacities);
  };

  const iconImages = [
    require('../img/Barbeiro.png'),
    require('../img/Cabeleireiro.png'),
    require('../img/Frete.png'),
    require('../img/Pintor.png'),
    require('../img/Manicure.png'),
    require('../img/tattoo.png'),
  ];

  const iconTitles = ['Cabeleireiro', 'Barbeiro', 'Frete', 'Pintor', 'Manicure', 'Tattoo'];

  const filteredData = serviceData.filter((card) => {
    if (selectedIcon) {
      const segmento = card.segmento.toLowerCase();
      const iconName = iconTitles[selectedIcon - 1].toLowerCase();
      return segmento === iconName;
    }
    return true;
  });

  const lidarComCliqueNoCartao = (dadosDoCartao) => {
    setServicoSelecionado(dadosDoCartao);
    setCartaoVisivel(true);
  };


  return (
    <View style={styles.containerHome}  >
    {cartaoVisivel && (
  <ServiceCardPopup
    isVisible={cartaoVisivel}
    onClose={() => setCartaoVisivel(false)}
    serviceData={servicoSelecionado}
  />
)}
    <View  style={styles.containerServicos}>
      <ScrollView  horizontal={true}>
        {[1, 2, 3, 4, 5, 6].map((iconIndex) => (
          <TouchableOpacity
            key={iconIndex}
            style={{ ...styles.containerIcons, opacity: iconOpacities[iconIndex - 1] }}
            onPress={() => handleIconClick(iconIndex)}
          >
            <Image source={iconImages[iconIndex - 1]} style={styles.iconServicos} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>

      <View style={styles.divider} />

      <Text style={styles.selectedIconText}>
        {selectedIcon ? `${iconTitles[selectedIcon - 1]}` : ''}
      </Text>

      <ScrollView
        style={styles.serviceCardContainer}
        contentContainerStyle={{ flexGrow: 1, alignItems: 'flex-start' }}
      >
        {filteredData.map((card, index) => (
          <View key={index} style={styles.serviceCard}>
            <View style={styles.serviceCardContent}>
              <Text style={styles.serviceCardTitle}>{card.nome}</Text>
              <Text style={styles.serviceCardSegment}>{card.segmento} </Text>
              <Text style={styles.serviceCardDistance}>{card.km} km</Text>
            </View>
            <View style={styles.serviceCardButtons}>
              <TouchableOpacity style={styles.serviceCardButton} onPress={() => lidarComCliqueNoCartao(card)}>
                <Text style={styles.serviceCardButtonText}>Agendar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.heartButton}>
                <Feather name="heart" size={16} color="#FF5C00" style={styles.heartIcon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  selectedIconText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: "2.5%",
  },

  containerHome: {
    flex: 1,
    padding: 16,
    width: "100%",
    height: "auto",
  },
  containerServicos: {
    width: 'auto',
    marginTop: '6%',
    height: 85
  
  },
  containerIcons: {
    width: 60,
    height: 60,
    backgroundColor: "#FF5C00",
    borderRadius: 100,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    opacity: 0.5,
    cursor: "pointer",
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)', 
    padding: 10,
    right: 13,
    
  },
  iconServicos: {
    width: "80%",
    height: "80%",
  },
  divider: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
    borderRadius: 20,
    width: "95%",
    marginLeft: "2.5%",
    marginTop: "3%",
  },
  serviceCardContainer: {
    flex: 1,
    height: "40vh",
    marginTop: 10,
    width: '100%'
  },
  serviceCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    overflow: 'hidden',
    height: 135,
  },
  serviceCardContent: {
    padding: 10,
    height: 80,
  },
  serviceCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceCardSegment: {
    fontSize: 14,
    color: '#888',
  },
  serviceCardDistance: {
    fontSize: 14,
    color: '#FF5C00',
  },
  serviceCardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    marginTop: -2,
  },
  serviceCardButton: {
    width: "auto",
    height: 40,
    backgroundColor: '#FF5C00',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    padding: 10,
  },
  serviceCardButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    width: "100%",
    height:"100%"
  },
  heartButton: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  heartIcon: {
    fontSize: 16,
    color: '#FF5C00',
  },
});

export default HomeScreen;
