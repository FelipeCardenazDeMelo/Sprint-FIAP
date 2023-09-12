import React, {useState} from 'react';
import { View, TouchableOpacity, Image, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';


const TopBar = ({ expanded, toggleExpand }) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={toggleExpand}>
          <Feather name={expanded ? "chevron-up" : "chevron-down"} size={24} color="#FF5C00" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.topBarContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.containerInfos}>
            <Text style={styles.title}>Bem vindo, Felipe</Text>
            <View style={styles.profileImageContainer}>
              <Image source={require('../img.jfif')} style={styles.profileImage} />
            </View>
          </View>
          {expanded && (
            <View style={styles.addressContainer}>
              <View style={styles.adressBlock}>
                <Text style={styles.address}>02452-002 São Paulo SP
                  <TouchableOpacity>
                    <Feather name="edit" size={16} color="#ffff" style={styles.icon} />
                  </TouchableOpacity>
                </Text>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Agendar Serviço</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

    adressBlock: {
    display: "flex",
    flexDirection: 'row',
  },


  container: {
    backgroundColor: "#080300",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)', 
  },

  
  icon: {
    marginLeft: 13,
  },

  iconContainer: {
    position: "absolute",
    zIndex: 9999,
    right: 8,
    top: 8,
  },

  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0000',
    padding: 8,
    marginTop: -6
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  
  },
  title: {
    fontSize: 20,
    marginTop: 17,
    color: "#FFFFFF"
  
  },
  addressContainer: {
    flexDirection: 'colum',
    marginTop: -10
  },
  address: {
    fontSize: 12,
    marginRight: 4,
    color: "#CECDCD"
  },

  containerInfos: {

    display: 'Flex',
    flexDirection: 'row',
    justifyContent: "space-between"

  },

  profileImageContainer: {
    width: 42,
    height: 42,
    borderRadius: 40, 
    overflow: 'hidden',
    marginBottom: 8,
    right: 40,
    marginTop: 15
    
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },

  button: {
    backgroundColor: '#FF5C00', 
    borderRadius: 10,
    padding: 6, 
    alignItems: 'center',
    justifyContent: 'center',
    width: "50%",
    marginTop: 15,
    marginLeft: "25%"
  },
  buttonText: {
    color: '#fff', 
    fontSize: 12, 
    fontWeight: 'bold',
  },
});

export default TopBar;