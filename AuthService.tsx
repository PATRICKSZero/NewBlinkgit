
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = '@NewBlink:users';

export interface User {
  username: string; 
  password: string;
}

export const getUsers = async (): Promise<User[]> => {};
export const saveUsers = async (users: User[]): Promise<void> => {};

export const registerUser = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
  const loweredUsername = username.toLowerCase().trim();
  if (!loweredUsername) return { success: false, message: 'Nome de usuário não pode ser vazio.' };

  const existingUsers = await getUsers();
  const userExists = existingUsers.some(user => user.username.toLowerCase() === loweredUsername);

  if (userExists) {
    return { success: false, message: 'Este nome de usuário já está em uso.' };
  }

  const newUser: User = { username: loweredUsername, password };
  await saveUsers([...existingUsers, newUser]);
  return { success: true, message: 'Usuário registrado com sucesso!' };
};

export const loginUser = async (username: string, password: string): Promise<boolean> => {
  const loweredUsername = username.toLowerCase().trim();
  const existingUsers = await getUsers();
  const user = existingUsers.find(u => u.username.toLowerCase() === loweredUsername && u.password === password);
  return !!user;
};