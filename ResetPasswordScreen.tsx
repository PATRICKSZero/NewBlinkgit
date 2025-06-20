import React, { useState, useLayoutEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useAuth } from '../context/AuthContext';
import { Colors } from '../config/colors';

const ResetPasswordScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  
  const { resetPassword, loading } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Redefinir Senha',
      headerStyle: { backgroundColor: Colors.secondaryBackground },
      headerTintColor: Colors.textPrimary,
      headerTitleStyle: { fontWeight: 'bold' },
    });
  }, [navigation]);

  const handleReset = async () => {
    if (!username || !newPassword || !confirmPassword) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    const success = await resetPassword(username, newPassword);
    if (success) {
      navigation.goBack();
    }
  };
  
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redefinir Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        placeholderTextColor={Colors.textSecondary}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Nova Senha"
          placeholderTextColor={Colors.textSecondary}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!isNewPasswordVisible}
        />
        <TouchableOpacity onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}>
          <Ionicons name={isNewPasswordVisible ? "eye-off" : "eye"} size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirme a Nova Senha"
          placeholderTextColor={Colors.textSecondary}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isConfirmPasswordVisible}
        />
        <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
          <Ionicons name={isConfirmPasswordVisible ? "eye-off" : "eye"} size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 10, width: '100%'}}>
        <TouchableOpacity style={styles.mainButton} onPress={handleReset}>
          <Text style={styles.mainButtonText}>Salvar Nova Senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      padding: 20, 
      backgroundColor: Colors.primaryBackground 
    },
    title: { 
      fontSize: 28, 
      fontWeight: 'bold', 
      textAlign: 'center', 
      marginBottom: 30, 
      color: Colors.textPrimary 
    },
    input: { 
      width: '100%', 
      padding: 15, 
      borderRadius: 12, 
      marginBottom: 16, 
      backgroundColor: Colors.secondaryBackground, 
      color: Colors.textPrimary, 
      fontSize: 16,
      borderWidth: 1,
      borderColor: Colors.borderDark,
    },

    inputContainer: {
      width: '100%',
      paddingHorizontal: 15,
      borderRadius: 12,
      backgroundColor: Colors.secondaryBackground,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: Colors.borderDark,
    },
    passwordInput: {
      flex: 1,
      paddingVertical: 15,
      color: Colors.textPrimary,
      fontSize: 16,
    },
    mainButton: {
      backgroundColor: Colors.accentColor,
      padding: 18,
      borderRadius: 12,
      alignItems: 'center',
    },
    mainButtonText: {
      color: Colors.textPrimary,
      fontSize: 18,
      fontWeight: 'bold',
    },
});

export default ResetPasswordScreen;