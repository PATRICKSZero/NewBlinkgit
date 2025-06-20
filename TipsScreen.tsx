import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importando a biblioteca de ícones
import { Colors } from '../config/colors';
import { tipsData, TipCategory } from '../data/tipsData';

interface AccordionItemProps {
  category: TipCategory;
  isExpanded: boolean;
  onPress: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ category, isExpanded, onPress }) => {
  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity onPress={onPress} style={[styles.accordionHeader, isExpanded && styles.accordionHeaderExpanded]} activeOpacity={0.8}>
        <Text style={styles.accordionTitle}>{category.title}</Text>
        <Ionicons 
          name={isExpanded ? 'chevron-up' : 'chevron-down'} 
          size={22} 
          color={Colors.primaryHighlight} 
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.accordionContent}>
          <Text style={styles.tipText}>
            {category.content}
          </Text>
        </View>
      )}
    </View>
  );
};

const TipsScreen: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleAccordionPress = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hackeie a Realidade</Text>
        <Text style={styles.subtitle}>Dicas e ferramentas para acelerar seu aprendizado.</Text>
      </View>
      <View style={styles.content}>
        {tipsData.map((category, index) => (
          <AccordionItem
            key={category.category}
            category={category}
            isExpanded={expandedIndex === index}
            onPress={() => handleAccordionPress(index)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

// --- ESTILOS REFINADOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary, // Cor primária para maior destaque
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    padding: 15,
  },
  accordionContainer: {
    backgroundColor: Colors.secondaryBackground,
    borderRadius: 12, // Bordas mais arredondadas
    marginBottom: 15,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 15,
  },
  // Novo estilo para o cabeçalho quando o item está ativo/expandido
  accordionHeaderExpanded: {
    backgroundColor: 'rgba(90, 90, 90, 0.2)', // Um fundo sutil para indicar o estado ativo
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 10,
  },
  // O estilo do ícone de texto foi removido
  accordionContent: {
    paddingHorizontal: 15,
    paddingBottom: 20, // Mais respiro no final do texto
  },
  tipText: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 26, // Linhas mais espaçadas para leitura
    textAlign: 'left', // Alinhado à esquerda para melhor legibilidade
  },
});

export default TipsScreen;