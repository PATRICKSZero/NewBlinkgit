import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave para armazenar as notas no AsyncStorage
const NOTES_KEY = 'user_notes';


export interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: number; // Para ordenar ou exibir a data de criação/edição
}


export const getNotes = async (): Promise<Note[]> => {
  try {
    const notesString = await AsyncStorage.getItem(NOTES_KEY);
    
    return notesString ? JSON.parse(notesString) : [];
  } catch (error) {
    console.error('Erro ao obter notas:', error);
    
    return [];
  }
};


export const saveNotes = async (notes: Note[]): Promise<void> => {
  try {
    // Converte o array de notas para uma string JSON e salva no AsyncStorage
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Erro ao salvar notas:', error);
    
  }
};
