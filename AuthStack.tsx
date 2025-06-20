import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen'; 
import { Colors } from '../config/colors';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
        headerStyle: { backgroundColor: Colors.secondaryBackground },
        headerTintColor: Colors.textPrimary,
        headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
    {/* ROTA ADICIONADA ABAIXO */}
    <Stack.Screen 
      name="ResetPassword" 
      component={ResetPasswordScreen} 
      options={{ title: 'Redefinir Senha' }} 
    />
  </Stack.Navigator>
);

export default AuthStack;