import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, Image, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TopBar from './components/TopBar';
import IconTitle from './components/IconTitle';
import HomeScreen from './components/HomeScreen';
import PesquisaScreen from './components/PesquisaScreen';
import AgendamentosScreen from './components/AgendamentosScreen';
import EmpresaScreen from './components/EmpresaScreen.js';


const App = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const Tab = createBottomTabNavigator();

  return (
    <View style={{ flex: 1, }}>
      <TopBar expanded={expanded} toggleExpand={toggleExpand} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#080300"
            },
            tabBarIcon: ({ focused }) => {
              let iconName;
              let iconPath;

              if (route.name === 'Home') {
                iconName = focused ? 'home-active' : 'home';
                iconPath = focused ? require('./img/home-active.png') : require('./img/home-active.png');
              } else if (route.name === 'Pesquisa') {
                iconName = focused ? 'search-active' : 'search';
                iconPath = focused ? require('./img/search-active.png') : require('./img/search.png');
              } else if (route.name === 'Agendamentos') {
                iconName = focused ? 'calendar-active' : 'calendar';
                iconPath = focused ? require('./img/agendamento-active.png') : require('./img/agendamento-active.png');
              } else if (route.name === 'Configurações') {
                iconName = focused ? 'settings-active' : 'settings';
                iconPath = focused ? require('./img/ajustes-active.png') : require('./img/ajustes.png');
              }

              return (
                <Image
                  source={iconPath}
                  style={{ width: 24, height: 24, tintColor: focused ? '#FF5C00' : '#CECDCD' }}
                />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: '#FF5C00',
            inactiveTintColor: '#CECDCD',
            style: { backgroundColor: '#080300' },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: '', 
            }}
          />
          <Tab.Screen
            name="Pesquisa"
            component={PesquisaScreen}
            options={{
              tabBarLabel: '', 
            }}
          />
          <Tab.Screen
            name="Agendamentos"
            component={AgendamentosScreen}
            options={{
              tabBarLabel: '', 
            }}
          />
          <Tab.Screen
            name="Configurações"
            component={EmpresaScreen}
            options={{
              tabBarLabel: '', 
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
