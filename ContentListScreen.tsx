// screens/ContentListScreen.tsx

import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { MainAppStackParamList } from '../navigation/MainAppStack';
import { Colors } from '../config/colors';

// --- DADOS MOCADOS ---
// Em uma aplicação real, estes dados viriam de uma API ou de um banco de dados.
// Para este projeto, mantê-los como constantes locais é uma forma simples e eficaz de simular o conteúdo.
const freeContent = [
  // ... (a lista de 20 artigos permanece a mesma)
  { id: '1', title: 'Desenvolvimento Web Completo com HTML, CSS e JavaScript por MDN Web Docs', url: 'https://developer.mozilla.org/pt-BR/docs/Learn' },
  { id: '2', title: 'Formação Completa em Lógica de Programação por Digital Innovation One (DIO)', url: 'https://web.dio.me/track/logica-de-programacao-essencial' },
  { id: '3', title: 'Guia de Referência de SQL para Consultas por W3Schools', url: 'https://www.w3schools.com/sql/' },
  { id: '4', title: 'Introdução ao Git e GitHub - Guia Oficial por GitHub Docs', url: 'https://docs.github.com/pt/get-started/start-your-journey/hello-world' },
  { id: '5', title: 'Aprenda Python 3 - Curso Interativo por Codecademy', url: 'https://www.codecademy.com/learn/learn-python-3' },
  { id: '6', title: 'Princípios de Design de Sistemas para Iniciantes por FreeCodeCamp News', url: 'https://www.freecodecamp.org/news/systems-design-for-beginners-conceptualizing-a-complex-system/' },
  { id: '7', title: 'Fundamentos de React.js - Crie sua primeira SPA por React.dev', url: 'https://react.dev/learn' },
  { id: '8', title: 'O que são APIs? Guia para iniciantes por Alura Artigos', url: 'https://www.alura.com.br/artigos/o-que-e-api' },
  { id: '9', title: 'Guia de Acessibilidade na Web (WCAG) por W3C', url: 'https://www.w3.org/WAI/fundamentals/accessibility-intro/pt-br' },
  { id: '10', title: 'Estruturas de Dados e Algoritmos em JavaScript por GeeksforGeeks', url: 'https://www.geeksforgeeks.org/data-structures-and-algorithms-in-javascript/' },
  { id: '11', title: 'O que são Redes de Computadores? - Guia Completo por AWS', url: 'https://aws.amazon.com/pt/what-is/computer-networking/' },
  { id: '12', title: 'Introdução à Administração de Servidores Linux por DigitalOcean', url: 'https://www.digitalocean.com/community/tutorials/an-introduction-to-linux-basics-pt' },
  { id: '13', title: 'Primeiros Passos com Docker - Tutoriais Oficiais por Docker Docs', url: 'https://docs.docker.com/get-started/' },
  { id: '14', title: 'Fundamentos da Computação em Nuvem (Cloud) por Azure Microsoft', url: 'https://learn.microsoft.com/pt-br/training/modules/describe-cloud-compute/' },
  { id: '15', title: 'O que é DevOps? Unindo Desenvolvimento e Operações por KingHost Blog', url: 'https://king.host/blog/tecnologia/devops/' },
  { id: '16', title: 'Guia de Comandos Básicos do Terminal Linux por Alura Artigos', url: 'https://www.alura.com.br/artigos/linux-onboarding-usando-a-cli-de-uma-forma-rapida-e-pratica' },
  { id: '17', title: 'Introdução à Segurança da Informação para Iniciantes por Fundação Bradesco', url: 'https://www.ev.org.br/cursos/seguranca-em-tecnologia-da-informacao' },
  { id: '18', title: 'Monitoramento de Sistemas: O que é e por onde começar por Zabbix Blog', url: 'https://blog.zabbix.com/pt/monitoramento-de-ti-o-que-e-e-como-comecar/9865/' },
  { id: '19', title: 'Administração de Banco de Dados: Guia da Carreira por Kenzie Academy', url: 'https://kenzie.com.br/blog/administrador-de-banco-de-dados' },
  { id: '20', title: 'O que é Virtualização e Máquinas Virtuais? por Red Hat', url: 'https://www.redhat.com/pt-br/topics/virtualization/what-is-virtualization' },
];

const youtubeVideos = [
  // Desenvolvimento de Sistemas (Títulos refinados e lista completada para 20 itens)
  { id: '1', title: 'Curso de Lógica de Programação para Iniciantes por Curso em Vídeo', url: 'http://www.youtube.com/watch?v=8mei6uVttho' },
  { id: '2', title: 'Primeiro Site com HTML e CSS na Prática por Rafaella Ballerini', url: 'http://www.youtube.com/watch?v=n_Etdr7Dbjs' },
  { id: '3', title: 'Curso de JavaScript do Zero - Variáveis e Funções por Rafaella Ballerini', url: 'http://www.youtube.com/watch?v=Z7mnxUI4u00' },
  { id: '4', title: 'O que é Git e GitHub? - Conceitos Essenciais por Rafaella Ballerini', url: 'http://www.youtube.com/watch?v=DqTITcMq68k' },
  { id: '5', title: 'Minicurso de SQL para Sair do Zero em 1 Hora por Código Fonte TV', url: 'http://www.youtube.com/watch?v=dpanYy8IrcU' },
  { id: '6', title: 'Como Funciona o Endereçamento IP (IPv4 e IPv6) por Código Fonte TV', url: 'http://www.youtube.com/watch?v=O8DmpmBMUSw' },
  { id: '7', title: 'O que é uma API? - Explicado para Iniciantes por Código Fonte TV', url: 'http://www.youtube.com/watch?v=vGuqKIRWosk' },
  { id: '8', title: 'Curso Intensivo de Python para Iniciantes por freeCodeCamp em Português', url: 'http://www.youtube.com/watch?v=rfscVS0vtbw' },
  { id: '9', title: 'O que um Analista de Sistemas Realmente Faz? por Código Fonte TV', url: 'http://www.youtube.com/watch?v=5K7OGSsWlzU' },
  { id: '10', title: 'Como se Tornar um Programador em 2025? (Guia de estudos) por Filipe Deschamps', url: 'https://www.youtube.com/watch?v=gS-yO-20I5A' },
  // Administração de Sistemas
  { id: '11', title: 'O que é Linux? Explicação COMPLETA para 2025 por Diolinux', url: 'http://www.youtube.com/watch?v=CT6BZBzbpWA' },
  { id: '12', title: '30 Comandos Essenciais do Terminal Linux por Diolinux', url: 'http://www.youtube.com/watch?v=QZ2nyxzZXPY' },
  { id: '13', title: 'Redes de Computadores Explicado de Forma Simples por Professora Nattane', url: 'http://www.youtube.com/watch?v=q0S75nKpmcw' },
  { id: '14', title: 'Diferença entre Hub, Switch e Roteador por Professora Nattane', url: 'http://www.youtube.com/watch?v=BmBPhA5b-Lc' },
  { id: '15', title: 'Teoria Geral dos Sistemas - Uma Introdução por Mundo da Administração', url: 'http://www.youtube.com/watch?v=-y55wUlk8bk' },
  { id: '16', title: 'O que é um Firewall e Como Funciona? por Bóson Treinamentos', url: 'http://www.youtube.com/watch?v=Qg7mhOXH7QY' },
  { id: '17', title: 'O que é Cloud Computing (Computação em Nuvem)? por Diolinux', url: 'https://www.youtube.com/watch?v=G_Q2mYI9I50' },
  { id: '18', title: 'Introdução ao Docker de Forma Simples e Direta por LINUXtips', url: 'https://www.youtube.com/watch?v=c2ySAi0wggY' },
  { id: '19', title: 'O que é um Administrador de Sistemas (SysAdmin)? por Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=Qc1N9aB2DvY' },
  { id: '20', title: 'Introdução à Segurança da Informação por Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=MRH4dZkFnsQ' },
];

// Tipagem para as props de rota e navegação
type ContentListScreenRouteProp = RouteProp<MainAppStackParamList, 'ContentList'>;
interface ContentListScreenProps {
  route: ContentListScreenRouteProp;
  navigation: any; // Adicionado 'navigation' para o hook 'useLayoutEffect'
}

/**
 * @screen ContentListScreen
 * Uma tela genérica que exibe uma lista de conteúdos (artigos ou vídeos).
 * A decisão de qual conteúdo mostrar é baseada no parâmetro 'type' recebido via navegação.
 */
const ContentListScreen: React.FC<ContentListScreenProps> = ({ route, navigation }) => {
  // A lógica de renderização da tela depende do parâmetro 'type' passado na navegação.
  // Isso torna o componente reutilizável para diferentes tipos de conteúdo.
  const { type } = route.params;
  const data = type === 'free' ? freeContent : youtubeVideos;
  const screenTitle = type === 'free' ? 'Artigos e Cursos' : 'Aulas em Vídeo';

  // Hook para estilizar o cabeçalho dinamicamente com base no tipo de conteúdo.
  useLayoutEffect(() => {
    navigation.setOptions({
      title: screenTitle,
      headerStyle: { backgroundColor: Colors.secondaryBackground },
      headerTintColor: Colors.textPrimary,
    });
  }, [navigation, screenTitle]);
  
  // O componente Linking é a forma padrão no React Native para interagir com apps externos,
  // como o navegador web ou o aplicativo do YouTube.
  const renderItem = ({ item }: { item: typeof data[0] }) => (
    <TouchableOpacity style={styles.item} onPress={() => Linking.openURL(item.url)}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemUrl} numberOfLines={1}>{item.url}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* A FlatList é usada em vez de um .map() dentro de um ScrollView porque ela é otimizada para performance.
        Ela renderiza apenas os itens que estão visíveis na tela (e alguns próximos),
        evitando o consumo excessivo de memória em listas muito longas.
      */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.primaryBackground,
  },
  // O header foi removido do JSX, pois o título agora é gerenciado pelo cabeçalho da navegação.
  item: {
    backgroundColor: Colors.secondaryBackground,
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark, 
  }, // <--- CORREÇÃO: Chave '}' que estava faltando foi adicionada aqui.
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.textPrimary,
  },
  itemUrl: {
    fontSize: 14,
    color: Colors.accentColor, // Usando uma cor de destaque para o link.
    textDecorationLine: 'underline',
  },
});

export default ContentListScreen;