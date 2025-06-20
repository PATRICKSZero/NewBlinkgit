import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importação das telas
import HomeScreen from '../screens/HomeScreen';
import TipsScreen from '../screens/TipsScreen';
import ContentListScreen from '../../NewBlink/screens/ContentListScreen';
import NoteListScreen from '../screens/NoteListScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';
import AboutScreen from '../screens/AboutScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

// Importações de tipos e configurações
import { Note } from '../../NewBlink/services/NoteService';
import { Colors } from '../../NewBlink/config/colors';

const Stack = createStackNavigator();

export type MainAppStackParamList = {
  Home: undefined;
  ContentList: { type: 'free' | 'youtube' };
  NoteList: undefined;
  NoteDetail: { note: Note | null };
  About: undefined;
  ChangePassword: undefined;
  Tips: undefined;
};

/**
 * MainAppStack é a pilha de navegação principal do aplicativo.
 */
const MainAppStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.secondaryBackground,
          borderBottomWidth: 1,
          borderBottomColor: Colors.primaryHighlight,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: Colors.secondaryHighlight,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          color: Colors.secondaryHighlight,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Tips" component={TipsScreen} options={{ title: 'Dicas de Estudo' }} />
      <Stack.Screen name="ContentList" component={ContentListScreen} options={({ route }) => ({ title: route.params?.type === 'free' ? 'Conteúdo Gratuito' : 'Vídeos de Aulas' })} />
      <Stack.Screen name="NoteList" component={NoteListScreen} options={{ title: 'Minhas Notas' }} />
      <Stack.Screen name="NoteDetail" component={NoteDetailScreen} options={({ route }) => ({ title: route.params?.note ? 'Editar Nota' : 'Nova Nota' })} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Sobre o New Blink' }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Mudar Senha' }} />
    </Stack.Navigator>
  );
};

export default MainAppStack;