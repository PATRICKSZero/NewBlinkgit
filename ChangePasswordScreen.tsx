// screens/ChangePasswordScreen.tsx

import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { MainAppStackParamList } from '../navigation/MainAppStack';
import { Colors } from '../config/colors';
import { changeUserPassword } from '../services/AuthService';

type ChangePasswordScreenNavigationProp = StackNavigationProp<MainAppStackParamList, 'ChangePassword'>;

interface ChangePasswordScreenProps {
  navigation: ChangePasswordScreenNavigationProp;
}


const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Estados para controlar a visibilidade de cada campo de senha.
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  // Hook para estilizar o cabeçalho da navegação, garantindo consistência visual.
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Mudar Senha',
      headerStyle: { backgroundColor: Colors.secondaryBackground },
      headerTintColor: Colors.textPrimary,
    });
  }, [navigation]);

  const handleChangePassword = async () => {
    // Sequência de validações defensivas para garantir a integridade dos dados antes de chamar o serviço.
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Erro', 'A nova senha e a confirmação não coincidem.');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (currentPassword === newPassword) {
      Alert.alert('Atenção', 'A nova senha não pode ser igual à senha atual.');
      return;
    }

    setIsProcessing(true);
    try {
      const success = await changeUserPassword(currentPassword, newPassword);
      if (success) {
        Alert.alert('Sucesso', 'Sua senha foi alterada com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'A senha atual está incorreta.');
      }
    } catch (error) {
      console.error('Erro ao mudar a senha:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Mudar Senha</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Senha Atual"
            placeholderTextColor={Colors.textSecondary}
            secureTextEntry={!isCurrentPasswordVisible}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            editable={!isProcessing}
          />
          <TouchableOpacity onPress={() => setIsCurrentPasswordVisible(prev => !prev)}>
            <Ionicons name={isCurrentPasswordVisible ? 'eye-off' : 'eye'} size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nova Senha"
            placeholderTextColor={Colors.textSecondary}
            secureTextEntry={!isNewPasswordVisible}
            value={newPassword}
            onChangeText={setNewPassword}
            editable={!isProcessing}
          />
          <TouchableOpacity onPress={() => setIsNewPasswordVisible(prev => !prev)}>
            <Ionicons name={isNewPasswordVisible ? 'eye-off' : 'eye'} size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirmar Nova Senha"
            placeholderTextColor={Colors.textSecondary}
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            editable={!isProcessing}
          />
          <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(prev => !prev)}>
            <Ionicons name={isConfirmPasswordVisible ? 'eye-off' : 'eye'} size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={[styles.actionButton, isProcessing && styles.actionButtonDisabled]}
          onPress={handleChangePassword}
          disabled={isProcessing}
          activeOpacity={0.7}
        >
          {isProcessing ? (
            <ActivityIndicator color={Colors.textPrimary} size="small" />
          ) : (
            <Text style={styles.actionButtonText}>Salvar Nova Senha</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondaryBackground,
    borderRadius: 12,
    marginBottom: 20,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  input: {
    flex: 1,
    padding: 15,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  actionButton: {
    width: '100%',
    padding: 18,
    backgroundColor: Colors.accentColor,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  actionButtonDisabled: {
    backgroundColor: Colors.secondaryBackground,
  },
  actionButtonText: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;