import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getNotes, saveNotes, Note } from '../services/NoteService';
import { MainAppStackParamList } from '../navigation/MainAppStack';
import { Colors } from '../config/colors'; 

type NoteListScreenNavigationProp = StackNavigationProp<MainAppStackParamList, 'NoteList'>;

interface NoteListScreenProps {
  navigation: NoteListScreenNavigationProp;
}

const NoteListScreen: React.FC<NoteListScreenProps> = ({ navigation }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = useCallback(() => {
    async function fetchNotesData() {
      const storedNotes = await getNotes();
      setNotes(storedNotes.sort((a, b) => b.timestamp - a.timestamp));
    }
    fetchNotesData();
  }, []);

  useFocusEffect(loadNotes);

  const handleDeleteNote = async (id: string) => {
    Alert.alert(
      'Excluir Nota',
      'Tem certeza que deseja excluir esta nota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const updatedNotes = notes.filter((note) => note.id !== id);
            await saveNotes(updatedNotes);
            setNotes(updatedNotes);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => navigation.navigate('NoteDetail', { note: item })}
      onLongPress={() => handleDeleteNote(item.id)}
    >
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteContent} numberOfLines={2}>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minhas Notas</Text>
      
      
      <Text style={styles.screenDescription}>
        Um espaço para suas ideias. Anote insights, resumos ou qualquer pensamento rápido enquanto explora o universo da TI.
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NoteDetail', { note: null })}
      >
        <Text style={styles.addButtonText}>Adicionar Nova Nota</Text>
      </TouchableOpacity>
      
      {notes.length === 0 ? (
        <View style={styles.noNotesContainer}>
            <Text style={styles.noNotesText}>Nenhuma nota ainda. Toque acima para adicionar uma!</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.primaryBackground, 
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.textPrimary, 
  },
  screenDescription: {
    fontSize: 16,
    color: Colors.textSecondary, 
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: Colors.accentColor, 
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  noteItem: {
    backgroundColor: Colors.secondaryBackground, 
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark, 
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.textPrimary,
  },
  noteContent: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  noNotesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotesText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.textSecondary,
  },
});

export default NoteListScreen;