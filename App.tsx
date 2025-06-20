import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';

// 1. Importe o AuthProvider e o hook useAuth que criamos.
import { AuthProvider, useAuth } from './context/AuthContext'; 

// 2. Importe seus navegadores de pilha.
import AuthStack from './navigation/AuthStack';
import MainAppStack from './navigation/MainAppStack';

/**
 * Este componente interno é o "porteiro". Ele está dentro do AuthProvider,
 * então ele tem acesso ao contexto de autenticação.
 */
const AppNavigator = () => {
  // 3. Pega o estado do 'user' e 'loading' diretamente do contexto.
  // Não há mais useState ou useEffect aqui.
  const { user, loading } = useAuth();

  // Mostra uma tela de carregamento apenas na inicialização do app.
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // 4. O NavigationContainer renderiza o navegador correto baseado no estado 'user'.
  // Se 'user' tiver um objeto, mostra MainAppStack. Se for nulo, mostra AuthStack.
  return (
    <NavigationContainer>
      {user ? <MainAppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

/**
 * Este é o componente principal que será exportado.
 * Sua única responsabilidade é "envolver" toda a aplicação com o AuthProvider.
 */
export default function App() {
  return (
    // 5. O AuthProvider garante que todos os componentes filhos (como o AppNavigator)
    // possam acessar o contexto de autenticação (user, login, logout, etc.).
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}