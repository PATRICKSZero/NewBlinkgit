import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  FC,
} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves para o armazenamento local
const USER_STORAGE_KEY = '@NewBlink:user';
const CREDENTIALS_USER_KEY = '@NewBlink:username';
const CREDENTIALS_PASS_KEY = '@NewBlink:password';

// Interfaces
interface User {
  username: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login(username: string, password: string): Promise<void>;
  logout(): Promise<void>;
  signUp(username: string, password: string): Promise<void>;
  resetPassword(username: string, newPassword: string): Promise<boolean>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Carrega o usuário do armazenamento na inicialização
  useEffect(() => {
    async function loadUserFromStorage() {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("AuthContext: Falha ao carregar usuário.", error);
      } finally {
        setLoading(false);
      }
    }
    loadUserFromStorage();
  }, []);

  // Função de Login
  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const storedUsername = await AsyncStorage.getItem(CREDENTIALS_USER_KEY);
      const storedPassword = await AsyncStorage.getItem(CREDENTIALS_PASS_KEY);

      if (username === storedUsername && password === storedPassword && username) {
        const userData: User = { username };
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error('Nome de usuário ou senha inválidos.');
      }
    } catch (error: any) {
      Alert.alert('Erro no Login', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Função de Cadastro
  const signUp = async (username: string, password: string) => {
    setLoading(true);
    try {
        if (!username.trim() || !password.trim()) {
            throw new Error("Usuário e senha não podem ser vazios.");
        }
      await AsyncStorage.setItem(CREDENTIALS_USER_KEY, username);
      await AsyncStorage.setItem(CREDENTIALS_PASS_KEY, password);
      Alert.alert('Sucesso', 'Registro bem-sucedido! Por favor, faça login.');
    } catch (error: any) {
      Alert.alert('Erro no Cadastro', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Função de Logout
  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair.');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (username: string, newPassword: string): Promise<boolean> => {
    setLoading(true);
    try {
      const storedUsername = await AsyncStorage.getItem(CREDENTIALS_USER_KEY);
      
      if (username === storedUsername) {
        await AsyncStorage.setItem(CREDENTIALS_PASS_KEY, newPassword);
        Alert.alert('Sucesso', 'Sua senha foi redefinida. Por favor, faça o login com a nova senha.');
        return true; // Retorna sucesso
      } else {
        throw new Error('Usuário não encontrado.');
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message);
      return false; // Retorna falha
    } finally {
      // Usar 'finally' garante que o loading sempre termine.
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signUp, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir o contexto
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider.');
  }
  return context;
}