import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importa as pilhas de navegação definidas.
import AuthStack from './AuthStack';     // Pilha para o fluxo de autenticação.
import MainAppStack from './MainAppStack'; // Pilha para o fluxo principal do app (após login).

// Cria uma instância do Stack Navigator.
const Stack = createStackNavigator();

interface AppNavigatorProps {
  isLoggedIn: boolean;       // Indica se o usuário está logado.
  onLoginSuccess: () => void; // Callback para ser chamado após login bem-sucedido.
  onLogout: () => void;      // Callback para ser chamado após logout.
}


const AppNavigator: React.FC<AppNavigatorProps> = ({ isLoggedIn, onLoginSuccess, onLogout }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {}
      {isLoggedIn ? (
        // Rota para a pilha principal do aplicativo (visível apenas para usuários logados).
        // Passa a função 'onLogout' para que o fluxo de logout funcione a partir do MainAppStack.
        <Stack.Screen name="MainAppFlow" component={(props) => <MainAppStack {...props} onLogout={onLogout} />} />
      ) : (
        // Rota para a pilha de autenticação (visível apenas para usuários não logados).
        // Passa as funções 'onLoginSuccess' e 'onLogout' para o AuthStack (e daí para AuthScreen).
        <Stack.Screen name="AuthFlow" component={(props) => <AuthStack {...props} onLoginSuccess={onLoginSuccess} onLogout={onLogout} />} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;