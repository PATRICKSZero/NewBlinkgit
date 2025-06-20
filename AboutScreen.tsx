import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../config/colors';

/**
 * @interface FeatureListItemProps
 * Define a estrutura de dados para o componente FeatureListItem, garantindo type-safety.
 * O tipo 'keyof typeof Ionicons.glyphMap' é uma técnica de TypeScript para garantir que
 * apenas nomes de ícones que realmente existem na biblioteca Ionicons sejam aceitos como props.
 */
interface FeatureListItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  text: string;
}

/**
 * @component FeatureListItem
 * Componente reutilizável para exibir um item de funcionalidade com ícone, título e descrição.
 * Abstrai a lógica de layout para manter o componente principal (AboutScreen) mais limpo.
 */
const FeatureListItem: React.FC<FeatureListItemProps> = ({ icon, title, text }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIconContainer}>
      <Ionicons name={icon} size={28} color={Colors.primaryHighlight} />
    </View>
    <View style={styles.featureTextContainer}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  </View>
);

/**
 * @screen AboutScreen
 * Tela estática que apresenta a missão e as funcionalidades do aplicativo New Blink.
 * Utiliza um ScrollView para garantir que o conteúdo seja acessível em telas de todos os tamanhos.
 */
const AboutScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/app_logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Sua Jornada na Tecnologia Começa Aqui.</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Nossa Missão</Text>
        <Text style={styles.paragraph}>
          Bem-vindo ao <Text style={{fontWeight: 'bold'}}>New Blink</Text>! Nossa missão é desmistificar o universo da Tecnologia da Informação. Sabemos que o primeiro passo é o mais desafiador, por isso criamos um guia claro e motivador para transformar sua curiosidade em conhecimento sólido.
        </Text>
        
        <Text style={styles.sectionTitle}>Como Facilitamos seu Aprendizado</Text>
        
        <FeatureListItem
          icon="book-outline"
          title="Conteúdo Curado"
          text="Acesso a artigos e tutoriais para iniciantes, explicando os conceitos fundamentais da TI sem sobrecarregar você com jargões complexos."
        />
        <FeatureListItem
          icon="play-circle-outline"
          title="Aprendizado Visual"
          text="Aulas em vídeo de canais confiáveis que aceleram a compreensão e tornam o estudo mais dinâmico, diretamente pelo app."
        />
        <FeatureListItem
          icon="pencil-outline"
          title="Conhecimento Organizado"
          text="Com a ferramenta 'Minhas Notas', você registra insights e constrói sua própria base de conhecimento, tornando o aprendizado ativo e pessoal."
        />

        <Text style={styles.sectionTitle}>Construindo o Futuro</Text>
        <Text style={styles.paragraph}>
          O New Blink é seu parceiro para transformar incerteza em confiança. Estamos aqui para fornecer as ferramentas e a direção para que seu primeiro "Hello, World!" seja apenas o começo de uma carreira de grande impacto no promissor futuro da tecnologia.
        </Text>
      </View>
      
      <Text style={styles.version}>Versão 3.0.2</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40, 
    paddingHorizontal: 20,
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary, 
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700', 
    color: Colors.primaryHighlight,
    marginBottom: 15,
    marginTop: 25,
  },
  paragraph: {
    fontSize: 17,
    lineHeight: 28, 
    textAlign: 'left', 
    color: Colors.textSecondary, 
  },
  version: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center', 
    paddingVertical: 20,
    opacity: 0.6,
  },
  // Container principal para o item da lista. Usa flexbox para alinhar o ícone e o texto horizontalmente.
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Alinha os itens no topo do container.
    marginBottom: 25,
  },
  // Um container para o ícone para controlar seu espaçamento e alinhamento vertical.
  featureIconContainer: {
    marginRight: 15,
    marginTop: 5, // Pequeno ajuste para alinhar melhor o ícone com a primeira linha do texto.
  },
  featureTextContainer: {
    flex: 1, // Garante que o container de texto ocupe todo o espaço restante.
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 5,
  },
});

export default AboutScreen;