import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainAppStackParamList } from '../navigation/MainAppStack';
import { Colors } from '../config/colors';
import { useAuth } from '../context/AuthContext'; 

type HomeScreenNavigationProp = StackNavigationProp<MainAppStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
 
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        // A chamada da função 'logout' do contexto continua perfeita.
        { text: "Sim", onPress: logout }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={require('../assets/app_logo.png')} style={styles.headerLogo} />
          
          
          <Text style={styles.headerTitle}>Bem-vindo(a), {user?.username}!</Text>
          
          <Text style={styles.headerSubtitle}>Explore o universo da TI</Text>
        </View>

       
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ContentList', { type: 'free' })}>
            <Text style={styles.buttonText}>📚 Conteúdos e Artigos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ContentList', { type: 'youtube' })}>
            <Text style={styles.buttonText}>▶️ Aulas em Vídeo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NoteList')}>
            <Text style={styles.buttonText}>📝 Minhas Notas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tips')}>
            <Text style={styles.buttonText}>⚡️ Hackeie a Realidade</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.highlightButton]} onPress={() => navigation.navigate('About')}>
            <Text style={[styles.buttonText, styles.highlightButtonText]}>ℹ️ Sobre o New Blink</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={[styles.buttonText, styles.logoutButtonText]}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerLogo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: Colors.secondaryHighlight,
    borderWidth: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 15,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: Colors.secondaryBackground,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  highlightButton: {
    backgroundColor: Colors.primaryHighlight,
    borderColor: Colors.primaryHighlight,
  },
  highlightButtonText: {
    color: Colors.textPrimary,
  },
  logoutButton: {
    backgroundColor: Colors.accentColor,
    borderColor: Colors.accentColor,
    marginTop: 15,
  },
  logoutButtonText: {
    color: Colors.textPrimary,
    textAlign: 'center',
    width: '100%',
  },
});

export default HomeScreen;