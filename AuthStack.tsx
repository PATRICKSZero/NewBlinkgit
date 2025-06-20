import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { registerUser, loginUser, setNewPasswordForEmail } from '../../NewBlink/services/AuthService';
import { Colors } from '../../NewBlink/config/colors';

interface AuthScreenProps {
  onLoginSuccess: () => void;
  onLogout: () => void;
}

type AuthMode = 'login' | 'register' | 'forgot_password';


const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess, onLogout }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [showDeveloperOptions, setShowDeveloperOptions] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  // Refs são usados para o contador de toques pois seus valores persistem entre as re-renderizações sem causar uma nova renderização.
  const tapCountRef = useRef(0);
  const lastTapRef = useRef(0);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha seu e-mail e senha.');
      return;
    }
    setIsProcessing(true);
    try {
      const success = await loginUser(email.trim(), password.trim());
      if (success) {
        
        onLoginSuccess();
      } else {
        Alert.alert('Erro', 'E-mail ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha seu e-mail e senha.');
      return;
    }
    setIsProcessing(true);
    try {
      const success = await registerUser(email.trim(), password.trim());
      if (success) {
        Alert.alert('Sucesso', 'Conta criada! Faça login para continuar.');
        setAuthMode('login');
        setEmail('');
        setPassword('');
      } else {
        Alert.alert('Erro', 'Este e-mail já está registrado.');
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email.trim() || !newPassword.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha seu e-mail e a nova senha.');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }
    setIsProcessing(true);
    try {
      const success = await setNewPasswordForEmail(email.trim(), newPassword.trim());
      if (success) {
        Alert.alert('Sucesso', 'Senha redefinida! Faça login com a nova senha.');
        setAuthMode('login');
        setEmail('');
        setPassword('');
        setNewPassword('');
      } else {
        Alert.alert('Erro', 'E-mail não encontrado.');
      }
    } catch (error) {
      console.error('Erro na redefinição de senha:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao redefinir a senha.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Implementação de um "Easter Egg": 7 toques rápidos no logo ativam as opções de dev.
  const handleDeveloperTap = () => {
    const now = Date.now();
    const TAP_THRESHOLD = 500; // 0.5 segundos
    const REQUIRED_TAPS = 7;

    if (now - lastTapRef.current < TAP_THRESHOLD) {
      tapCountRef.current += 1;
      if (tapCountRef.current >= REQUIRED_TAPS) {
        setShowDeveloperOptions(prev => !prev);
        tapCountRef.current = 0;
        lastTapRef.current = 0;
        Alert.alert("Modo Desenvolvedor", showDeveloperOptions ? "Desativado." : "Ativado!");
      }
    } else {
      tapCountRef.current = 1;
    }
    lastTapRef.current = now;
  };

  const handleClearAllAsyncStorage = () => {
    Alert.alert(
      "Apagar Todos os Dados",
      "Tem certeza que deseja apagar permanentemente TODOS os dados? Esta ação é irreversível.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "APAGAR TUDO", onPress: onLogout, style: "destructive" }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDeveloperTap} activeOpacity={0.8}>
        <Image source={require('../assets/app_logo.png')} style={styles.logo}/>
      </TouchableOpacity>
      <Text style={styles.title}>Bem-vindo ao New Blink</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor={Colors.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        editable={!isProcessing}
      />

      {authMode !== 'forgot_password' && (
        // Container para o campo de senha com ícone de visibilidade
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.passwordInput}
                placeholder="Senha"
                placeholderTextColor={Colors.textSecondary}
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
                editable={!isProcessing}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color={Colors.textSecondary}/>
            </TouchableOpacity>
        </View>
      )}

      {authMode === 'forgot_password' && (
        // Container para o campo de nova senha com ícone de visibilidade
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.passwordInput}
                placeholder="Nova Senha"
                placeholderTextColor={Colors.textSecondary}
                secureTextEntry={!isNewPasswordVisible}
                value={newPassword}
                onChangeText={setNewPassword}
                editable={!isProcessing}
            />
            <TouchableOpacity onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}>
                <Ionicons name={isNewPasswordVisible ? 'eye-off' : 'eye'} size={24} color={Colors.textSecondary}/>
            </TouchableOpacity>
        </View>
      )}

      {/* O botão de ação principal é dinâmico, mudando seu texto e função com base no authMode. */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={
          authMode === 'login' ? handleLogin :
          authMode === 'register' ? handleRegister :
          handleResetPassword
        }
        disabled={isProcessing}
        activeOpacity={0.7}
      >
        {isProcessing ? (
          <ActivityIndicator color={Colors.textDark} size="small" />
        ) : (
          <Text style={styles.actionButtonText}>
            {authMode === 'login' ? 'Entrar' :
             authMode === 'register' ? 'Registrar' :
             'Redefinir Senha'}
          </Text>
        )}
      </TouchableOpacity>
      
      {/* Botões secundários para alternar entre os modos */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setAuthMode(authMode === 'forgot_password' ? 'login' : 'forgot_password')}
          disabled={isProcessing}
        >
          <Text style={styles.toggleButtonText}>
            {authMode === 'forgot_password' ? 'Voltar ao Login' : 'Esqueceu a senha?'}
          </Text>
        </TouchableOpacity>

        {authMode !== 'forgot_password' && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            disabled={isProcessing}
          >
            <Text style={styles.toggleButtonText}>
              {authMode === 'login' ? 'Não tem uma conta? Registrar' : 'Já tem uma conta? Login'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {showDeveloperOptions && (
        <View style={styles.developerOptionsContainer}>
          <Text style={styles.developerOptionsHeader}>Opções do Desenvolvedor</Text>
          <TouchableOpacity style={styles.developerButton} onPress={handleClearAllAsyncStorage}>
            <Text style={styles.developerButtonText}>Limpar Tudo (DEBUG)</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: Colors.primaryBackground },
    logo: { width: 120, height: 120, marginBottom: 20, borderRadius: 60 },
    title: { fontSize: 28, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 30, textAlign: 'center' },
    input: { width: '95%', padding: 15, backgroundColor: Colors.secondaryBackground, borderRadius: 10, color: Colors.textPrimary, fontSize: 16, marginBottom: 15 },
    inputContainer: { width: '95%', flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.secondaryBackground, borderRadius: 10, marginBottom: 15, paddingRight: 15 },
    passwordInput: { flex: 1, padding: 15, color: Colors.textPrimary, fontSize: 16 },
    actionButton: { width: '95%', padding: 15, backgroundColor: Colors.accentColor, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
    actionButtonText: { color: Colors.textPrimary, fontSize: 18, fontWeight: 'bold' },
    toggleContainer: { marginTop: 20, alignItems: 'center'},
    toggleButton: { marginTop: 15, padding: 5 },
    toggleButtonText: { color: Colors.secondaryHighlight, fontSize: 16 },
    developerOptionsContainer: { marginTop: 30, padding: 15, backgroundColor: Colors.secondaryBackground, borderRadius: 10, borderWidth: 1, borderColor: Colors.borderDark, alignItems: 'center', width: '95%' },
    developerOptionsHeader: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 10 },
    developerButton: { backgroundColor: Colors.error, padding: 10, borderRadius: 8, marginTop: 10, width: '80%', alignItems: 'center' },
    developerButtonText: { color: Colors.textPrimary, fontSize: 16, fontWeight: 'bold' },
});

export default AuthScreen;