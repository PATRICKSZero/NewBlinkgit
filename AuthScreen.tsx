import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAuth } from '../context/AuthContext';
import { Colors } from '../config/colors';

// Tipagem para as props de navegação que este componente recebe do AuthStack
type AuthStackParamList = {
  Auth: undefined;
  ResetPassword: undefined;
};
type AuthScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Auth'>;
interface AuthScreenProps {
  navigation: AuthScreenNavigationProp;
}

/**
 * @screen AuthScreen
 * Tela de autenticação que opera em dois modos: Login e Cadastro.
 * Toda a lógica de autenticação (chamadas de API, estado global) é delegada
 * para o hook 'useAuth' a fim de manter este componente focado apenas na UI.
 */
const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
  const { login, signUp, loading } = useAuth();

  // Altera o comportamento do botão principal com base no estado 'isRegistering'.
  const handleAuth = async () => {
    if (isRegistering) {
      await signUp(username, password);
      setIsRegistering(false); // Retorna para a tela de login após o sucesso
    } else {
      await login(username, password);
    }
  };

  // Exibe um feedback de carregamento durante a tentativa de login para melhorar a UX.
  if (loading && !isRegistering) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primaryHighlight} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/app_logo.png')} 
        style={styles.logo}
      />
      <Text style={styles.appName}>NEW BLINK</Text>

      <Text style={styles.title}>{isRegistering ? 'Crie sua Conta' : 'Acesse sua Conta'}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        placeholderTextColor={Colors.textSecondary}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* O estado 'isPasswordVisible' controla tanto a propriedade 'secureTextEntry' do 
          TextInput quanto o ícone ('eye' vs 'eye-off'), criando o efeito de "ver senha". */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          placeholderTextColor={Colors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.mainButton} onPress={handleAuth}>
        <Text style={styles.mainButtonText}>{isRegistering ? 'Finalizar Cadastro' : 'Entrar'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.secondaryButtonText}>
          {isRegistering ? 'Já tem uma conta? Entrar' : 'Novo Usuário? Cadastrar'}
        </Text>
      </TouchableOpacity>

      {/* O link para redefinição de senha só é relevante e exibido no modo de login. */}
      {!isRegistering && (
         <TouchableOpacity style={{marginTop: 20}} onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
         </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.primaryBackground,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: Colors.secondaryBackground,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: Colors.secondaryBackground,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  mainButton: {
    width: '100%',
    padding: 18,
    borderRadius: 12,
    backgroundColor: Colors.accentColor,
    alignItems: 'center',
    marginBottom: 20,
  },
  mainButtonText: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: Colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  forgotPasswordText: {
    color: Colors.primaryHighlight,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  }
});

export default AuthScreen;