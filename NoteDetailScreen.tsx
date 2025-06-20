import React, { useState, useLayoutEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity 
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getNotes, saveNotes, Note } from '../services/NoteService';
import { MainAppStackParamList } from '../navigation/MainAppStack';
import { Colors } from '../config/colors'; 

type NoteDetailScreenRouteProp = RouteProp<MainAppStackParamList, 'NoteDetail'>;
type NoteDetailScreenNavigationProp = StackNavigationProp<MainAppStackParamList, 'NoteDetail'>;

interface NoteDetailScreenProps {
  route: NoteDetailScreenRouteProp;
  navigation: NoteDetailScreenNavigationProp;
}

const NoteDetailScreen: React.FC<NoteDetailScreenProps> = ({ route, navigation }) => {
  const { note } = route.params; 
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  
  const screenTitle = note ? 'Editar Nota' : 'Adicionar Nova Nota';

  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: screenTitle,
      headerStyle: { backgroundColor: Colors.secondaryBackground },
      headerTintColor: Colors.textPrimary,
      headerTitleStyle: { fontWeight: 'bold' },
    });
  }, [navigation, screenTitle]);

  const handleSaveNote = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o título e o conteúdo da nota.');
      return;
    }

    const existingNotes = await getNotes();
    let updatedNotes: Note[];

    if (note) {
      updatedNotes = existingNotes.map((n) =>
        n.id === note.id ? { ...n, title, content, timestamp: Date.now() } : n
      );
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        timestamp: Date.now(),
      };
      updatedNotes = [...existingNotes, newNote];
    }

    await saveNotes(updatedNotes);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <TextInput
          style={styles.titleInput}
          placeholder="Título"
          placeholderTextColor={Colors.textSecondary}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.contentInput}
          placeholder="Comece a escrever sua nota aqui..."
          placeholderTextColor={Colors.textSecondary}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
          <Text style={styles.saveButtonText}>Salvar Nota</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  titleInput: {
    width: '100%',
    padding: 15,
    backgroundColor: Colors.secondaryBackground,
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  contentInput: {
    flex: 1, 
    minHeight: 300, 
    width: '100%',
    padding: 15,
    backgroundColor: Colors.secondaryBackground,
    color: Colors.textPrimary,
    fontSize: 17,
    lineHeight: 26,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  saveButtonContainer: {
    padding: 20,
    backgroundColor: Colors.primaryBackground,
  },
  saveButton: {
    backgroundColor: Colors.accentColor,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NoteDetailScreen;