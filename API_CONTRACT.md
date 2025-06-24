# SuperAppBet - Contrato de API SDUI (Server-Driven UI)

## Visão Geral
Este documento define o contrato entre o frontend React Native e o backend para o sistema de **Server-Driven UI (SDUI)** do SuperAppBet.

## Configuração Base
- **Base URL**: `http://localhost:3001/api` (configurável)
- **Headers Padrão**: `Content-Type: application/json`
- **Formato de Resposta**: Todas as respostas seguem o padrão:
```json
{
  "success": boolean,
  "data": any,      // presente quando success=true
  "error": string   // presente quando success=false
}
```

---

## 🏠 1. ENDPOINTS PRINCIPAIS

### 1.1 Health Check
```http
GET /api/health
```

**Resposta de Sucesso:**
```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

---

### 1.2 Configuração Completa do SDUI
```http
GET /api/sdui/config
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "version": 1,
    "screens": {},
    "components": {},
    "themes": {},
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 📱 2. ENDPOINTS DE TELAS

### 2.1 Tela Home (Principal)
```http
GET /api/screens/home?segment={segment}&userId={userId}
```

**Parâmetros Query:**
- `segment` (opcional, padrão: "default"): Segmento do usuário
- `userId` (opcional): ID do usuário para personalização

**Exemplo de Resposta:**
```json
{
  "success": true,
  "data": {
    "screenName": "home",
    "metadata": {
      "name": "Home Screen",
      "version": 1,
      "lastUpdated": "2024-01-01T00:00:00.000Z",
      "cacheTTL": 300
    },
    "components": [
      {
        "type": "Container",
        "props": {
          "style": { "flex": 1, "padding": 16 }
        },
        "children": [
          {
            "type": "Text",
            "props": {
              "variant": "heading",
              "text": "Bem-vindo ao SuperAppBet",
              "style": { "marginBottom": 16 }
            }
          },
          {
            "type": "PromotionCard",
            "props": {
              "title": "Bônus de Boas-vindas",
              "description": "Ganhe até R$ 500 no seu primeiro depósito",
              "buttonText": "Depositar Agora",
              "backgroundColor": "#0ea5e9"
            }
          }
        ]
      }
    ]
  }
}
```

### 2.2 Tela de Esportes
```http
GET /api/screens/sports?userId={userId}&sport={sport}&live={live}
```

**Parâmetros Query:**
- `userId` (opcional): ID do usuário
- `sport` (opcional): Filtro por esporte específico
- `live` (opcional): Apenas eventos ao vivo

**Exemplo:**
```
GET /api/screens/sports?userId=123&sport=football&live=true
```

### 2.3 Tela de Cassino
```http
GET /api/screens/casino?userId={userId}&category={category}&gameType={gameType}
```

**Parâmetros Query:**
- `userId` (opcional): ID do usuário
- `category` (opcional): Categoria de jogos
- `gameType` (opcional): Tipo específico de jogo

### 2.4 Tela de Loteria
```http
GET /api/screens/lottery?region={region}&userId={userId}
```

**Parâmetros Query:**
- `region` (opcional, padrão: "BR"): Código da região
- `userId` (opcional): ID do usuário

### 2.5 Tela de Perfil
```http
GET /api/screens/profile?userId={userId}&section={section}
```

**Parâmetros Query:**
- `userId` (obrigatório): ID do usuário
- `section` (opcional, padrão: "overview"): Seção do perfil

---

## 🔧 3. GESTÃO DE CONFIGURAÇÕES

### 3.1 Configuração Genérica de Tela
```http
GET /api/sdui/screen/{screenName}?variant={variant}&userId={userId}&experimentGroup={experimentGroup}
```

**Parâmetros:**
- `screenName` (path): Nome da tela
- `variant` (query, opcional, padrão: "default"): Variante da tela
- `userId` (query, opcional): ID do usuário
- `experimentGroup` (query, opcional): Grupo de teste A/B

### 3.2 Atualizar Configuração de Tela
```http
PUT /api/sdui/screen/{screenName}
Content-Type: application/json

{
  "layout": {
    "type": "tabs",
    "backgroundColor": "#f5f5f5"
  },
  "metadata": {
    "cacheTTL": 600
  }
}
```

### 3.3 Criar Variante A/B
```http
POST /api/sdui/screen/{screenName}/variant
Content-Type: application/json

{
  "variantName": "test_variant",
  "config": { /* configuração da variante */ },
  "trafficSplit": 50
}
```

---

## 🧩 4. BIBLIOTECA DE COMPONENTES

### 4.1 Listar Componentes
```http
GET /api/components?category={category}&platform={platform}&status={status}
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "button-primary",
      "name": "Primary Button",
      "type": "Button",
      "description": "Botão de ação principal",
      "category": "buttons",
      "schema": {
        "props": {
          "title": { "type": "string", "required": true },
          "variant": { "type": "string", "enum": ["primary", "secondary"] }
        }
      },
      "defaultProps": {
        "variant": "primary"
      },
      "variants": ["primary", "secondary", "outline", "ghost"],
      "platforms": ["ios", "android"]
    }
  ]
}
```

### 4.2 Obter Componente Específico
```http
GET /api/components/{componentId}
```

---

## 🎨 5. TEMAS

### 5.1 Obter Tema
```http
GET /api/sdui/theme?variant={variant}
```

### 5.2 Atualizar Tema
```http
PUT /api/sdui/theme
Content-Type: application/json

{
  "variant": "dark",
  "colors": {
    "primary": "#0ea5e9",
    "secondary": "#f59e0b"
  }
}
```

---

## 📊 6. ANALYTICS

### 6.1 Rastrear Eventos
```http
POST /api/analytics/track
Content-Type: application/json

{
  "event": "button_click",
  "properties": {
    "buttonId": "home-cta",
    "screenName": "home",
    "userId": "123"
  },
  "userId": "123",
  "sessionId": "session-456",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "platform": "mobile",
  "appVersion": "1.0.0"
}
```

**Resposta:** 204 No Content (fire-and-forget)

### 6.2 Analytics de Tela
```http
GET /api/analytics/screens/{screenName}?startDate={date}&endDate={date}&segment={segment}
```

---

## 🚀 7. SISTEMA

### 7.1 Forçar Atualização
```http
POST /api/sdui/refresh
Content-Type: application/json

{
  "reason": "Manual refresh"
}
```

---

## 📋 8. TIPOS DE DADOS IMPORTANTES

### 8.1 ScreenConfiguration
```typescript
interface ScreenConfiguration {
  screenName?: string;
  variant?: string;
  generatedAt?: string;
  metadata?: {
    name: string;
    version: number;
    lastUpdated: string;
    cacheTTL?: number;
    personalizable?: boolean;
    dynamicContent?: boolean;
  };
  layout?: {
    type: 'scroll' | 'tabs' | 'grid' | 'sections';
    backgroundColor?: string;
    sections?: any[];
    tabs?: any[];
  };
  components?: ComponentConfig[];
}
```

### 8.2 ComponentConfig
```typescript
interface ComponentConfig {
  id?: string;
  type: string;           // Tipo do componente (Button, Text, Container, etc.)
  props?: {              // Propriedades do componente
    [key: string]: any;
  };
  children?: ComponentConfig[];  // Componentes filhos
  conditions?: {         // Condições para renderização
    platform?: string[];
    userSegment?: string[];
    featureFlag?: string;
  };
  actions?: ActionConfig[];  // Ações associadas ao componente
}
```

### 8.3 Componentes Disponíveis no Frontend
- `Container` - Layout container
- `Button` - Botões interativos
- `Text` - Texto formatado
- `BetSlip` - Cupom de apostas
- `QuickBetCard` - Card de aposta rápida
- `PromotionCard` - Card promocional
- `GameCard` - Card de jogo
- `View`, `ScrollView`, `TouchableOpacity`, `Image`, `FlatList`, `ActivityIndicator` (React Native)

---

## ⚡ 9. ESTRATÉGIA DE CACHE

### Frontend (Automático)
- **Formato da Chave**: `{screenName}-{variant}-{userId||'anonymous'}`
- **TTL Padrão**: 300 segundos (5 minutos)
- **TTL Customizado**: Especificado em `metadata.cacheTTL`
- **Invalidação**: Cache é limpo nas atualizações

### Backend (Sugerido)
- Implementar cache Redis para responses frequentes
- Cache de configurações de tela por usuário/segmento
- Invalidação automática quando configurações são atualizadas

---

## 🔒 10. AUTENTICAÇÃO (Futuro)

Atualmente o sistema não usa autenticação, mas aceita `userId` para personalização. Para implementações futuras:

```http
Authorization: Bearer {jwt_token}
X-API-Key: {api_key}
```

---

## 🚨 11. TRATAMENTO DE ERROS

### Códigos de Status HTTP
- `200` - Sucesso
- `400` - Requisição inválida
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

### Respostas de Erro
```json
{
  "success": false,
  "error": "Descrição detalhada do erro",
  "code": "ERROR_CODE",  // opcional
  "details": {}          // opcional
}
```

---

## 🧪 12. EXEMPLOS DE USO

### Exemplo 1: Tela Home Personalizada
```http
GET /api/screens/home?userId=123&segment=premium

Response:
{
  "success": true,
  "data": {
    "screenName": "home",
    "metadata": { "cacheTTL": 300 },
    "components": [
      {
        "type": "Container",
        "props": { "style": { "padding": 16 } },
        "children": [
          {
            "type": "Text",
            "props": {
              "variant": "heading",
              "text": "Olá, Usuário Premium!"
            }
          },
          {
            "type": "PromotionCard",
            "props": {
              "title": "Oferta Exclusiva Premium",
              "description": "Cashback de 10% em todas as apostas"
            }
          }
        ]
      }
    ]
  }
}
```

### Exemplo 2: Fallback quando Backend Indisponível
O frontend possui fallback automático quando o backend não responde. Retorna uma tela estática básica.

---

## 📝 13. OBSERVAÇÕES IMPORTANTES

1. **Todas as chamadas HTTP devem ser não-bloqueantes**
2. **Analytics não deve falhar a aplicação** (fire-and-forget)
3. **Cache TTL deve ser respeitado para performance**
4. **Personalização por usuário/segmento é essencial**
5. **Suporte a A/B testing através de variantes**
6. **Estrutura de componentes deve ser flexível e extensível**

---

## 🛠️ 14. FERRAMENTAS DE DESENVOLVIMENTO

### Postman Collection
Crie uma collection Postman com todos os endpoints para testes.

### Swagger/OpenAPI
Considere implementar documentação Swagger para API interativa.

### Monitoramento
Implemente logs estruturados e métricas para monitoramento da API.

---

**Contato:** Envie este documento para o desenvolvedor backend junto com qualquer dúvida específica sobre implementação.