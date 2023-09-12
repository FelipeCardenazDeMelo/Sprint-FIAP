import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

const ServiceCardPopup = ({ isVisible, onClose, serviceData, empresaId }) => {
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');

  const formatInputDate = (text) => {
    if (text.length === 2) {
      text += '-';
    } else if (text.length === 5) {
      text += '-';
    }
    setDateInput(text);
  };

  const formatInputTime = (text) => {
    if (text.length === 2 && !text.includes(':')) {
      text += ':';
    }
    if (text.length === 5 && !text.includes(':')) {
      text += ':';
    }
    setTimeInput(text);
  };

  const handleDateInputChange = (text) => {
    formatInputDate(text);
  };

  const handleTimeInputChange = (text) => {
    formatInputTime(text);
  };

  const confirmAgendamento = async () => {
    try {
      const apiEndpoint = 'https://mean-pears-change.loca.lt/api/agendamentos';
      const agendamentoId = uuidv4();
      const formattedDate = dateInput.replace(/-/g, ''); 
      const formattedTime = timeInput.replace(/-/g, ''); 
      const requestBody = {
        empresa: {
          id: serviceData.id,
          favorito: false,
        },
        data: formattedDate,
        hora: formattedTime,
      };

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
   
        console.log('Agendamento confirmado com sucesso!');
      } else {
        console.error('Erro ao confirmar o agendamento');
      }
    } catch (error) {
      console.error('Erro ao realizar a solicitação à API:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <View style={styles.alignResponses}>
         <Text style={styles.modalTitle}>Criar Agendamento</Text>
          <Text style={styles.modalText}><Text style={styles.boldText}>Nome:</Text> {serviceData.nome}</Text>
          <Text style={styles.modalText}><Text style={styles.boldText}>Segmento:</Text> {serviceData.segmento}</Text>
          <Text style={styles.modalText}><Text style={styles.boldText}>Endereço:</Text> {serviceData.endereco}</Text>
          <Text style={styles.modalText}><Text style={styles.boldText}>Distância:</Text> {serviceData.km} km</Text>
        </View>

          <TextInput
            style={styles.input}
            placeholder="Data (dd-mm-aaaa)"
            value={dateInput}
            onChangeText={(text) => handleDateInputChange(text)}
            maxLength={10}
          />

          <TextInput
            style={styles.input}
            placeholder="Horário (hh:mm:ss)"
            value={timeInput}
            onChangeText={(text) => handleTimeInputChange(text)}
            maxLength={8}
          />

          <TouchableOpacity style={styles.confirmButton} onPress={confirmAgendamento}>
            <Text style={styles.confirmButtonText}>Confirmar Agendamento</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({

  alignResponses: {
    alignItems: "start"
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#FF5C00', 
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18, 
    color: 'Black', 
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  closeButton: {
    backgroundColor: '#FF5C00',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: "90%",
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center"

  },
  confirmButton: {
    backgroundColor: '#0CA300',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: "90%",
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center"
  },
});

export default ServiceCardPopup;