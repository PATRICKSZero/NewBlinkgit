import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { AuthProvider, useAuth } from './context/AuthContext';
import { Colors } from './config/colors'; 
import AuthStack from './navigation/AuthStack';
import MainAppStack from './navigation/MainAppStack';


const AppNavigator = () => {
  const { user, loading } = useAuth();

  // Enquanto o AuthProvider verifica o AsyncStorage, exibimos um loading global.
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primaryBackground }}>
        <ActivityIndicator size="large" color={Colors.primaryHighlight} />
      </View>
    );
  }
  
  // O NavigationContainer envolve a lógica de troca de navegadores.
  return (
    <NavigationContainer>
      {user ? <MainAppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}


export default function App() {
  return (
    <AuthProvider>
      {}
      <StatusBar style="light" />
      <AppNavigator />
    </AuthProvider>
  );
}
