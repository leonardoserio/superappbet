import * as React from 'react';
import * as RN from 'react-native';
import { BetSlip } from './BetSlip';
import { GameCard } from './GameCard';
import { PromotionCard } from './PromotionCard';
import { QuickBetCard } from './QuickBetCard';
import { Container } from './Container';


// Definindo tipos mais específicos
interface ComponentItem {
  component: string;
  props: {
    children?: React.ReactNode | ComponentItem[];
    [key: string]: any;
  };
}

interface RenderFromJsonProps {
  json: ComponentItem[];
}

// Mapa de componentes disponíveis
const COMPONENT_MAP = {
BetSlip,
GameCard,
PromotionCard,
QuickBetCard,
Container,
  ...RN,
} as const;

type ComponentKey = keyof typeof COMPONENT_MAP;

const isValidComponentKey = (key: string): key is ComponentKey => {
  return key in COMPONENT_MAP;
};

const renderComponent = (
  item: ComponentItem,
  index: number,
): React.ReactElement | null => {
  const { component, props } = item;

  // Verificar se o componente existe
  if (!isValidComponentKey(component)) {
    console.warn(`Componente '${component}' não encontrado`);
    return null;
  }

  const Component: React.ComponentType<any> = COMPONENT_MAP[component] as any;
  const componentProps = { ...props, key: index };

  // Processar children se existir e for um array (componentes aninhados)
  if (props.children && Array.isArray(props.children)) {
    componentProps.children = renderFromJson({ json: props.children });
  }

  return React.createElement(Component, componentProps);
};

const renderFromJson = ({
  json,
}: RenderFromJsonProps): React.ReactElement[] => {
  if (!Array.isArray(json)) {
    console.error('JSON deve ser um array de componentes');
    return [];
  }

  return json
    .map((item, index) => {
      if (!item || typeof item !== 'object' || !item.component) {
        console.warn(`Item inválido no índice ${index}:`, item);
        return null;
      }

      return renderComponent(item, index);
    })
    .filter((component): component is React.ReactElement => component !== null);
};

export default renderFromJson;
