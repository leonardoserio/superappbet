# SuperAppBet - Contrato de API dos Módulos (Micro Frontend)

## Visão Geral
Este documento define o contrato entre o frontend React Native e o backend para o sistema de **Módulos (Micro Frontend)** do SuperAppBet. O sistema permite ativar/desativar funcionalidades dinamicamente e executar ações específicas de cada módulo.

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

## 🧩 1. GESTÃO DE MÓDULOS

### 1.1 Listar Todos os Módulos Disponíveis
```http
GET /api/modules
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "betting",
      "name": "Sports Betting",
      "description": "Módulo de apostas esportivas",
      "version": "1.0.0",
      "category": "gaming",
      "platforms": ["ios", "android"],
      "dependencies": [],
      "features": ["odds", "betslip", "live-betting"],
      "isActive": true
    },
    {
      "id": "casino",
      "name": "Casino Games", 
      "description": "Módulo de jogos de cassino",
      "version": "1.2.0",
      "category": "gaming",
      "platforms": ["ios", "android"],
      "dependencies": ["payments"],
      "features": ["slots", "table-games", "live-casino"],
      "isActive": true
    },
    {
      "id": "lottery",
      "name": "Lottery",
      "description": "Módulo de loterias e números",
      "version": "1.0.0",
      "category": "gaming",
      "platforms": ["ios", "android"],
      "dependencies": ["payments"],
      "features": ["mega-sena", "quina", "lotomania"],
      "isActive": false
    },
    {
      "id": "payments",
      "name": "Payment System",
      "description": "Módulo de pagamentos e carteira",
      "version": "2.1.0",
      "category": "core",
      "platforms": ["ios", "android"],
      "dependencies": [],
      "features": ["pix", "card", "wallet", "cashout"],
      "isActive": true
    }
  ]
}
```

### 1.2 Obter Módulos Habilitados para Usuário
```http
GET /api/modules/enabled?segment={segment}&region={region}&userId={userId}
```

**Parâmetros Query:**
- `segment` (opcional, padrão: "default"): Segmento do usuário (default, premium, vip)
- `region` (opcional, padrão: "BR"): Código da região
- `userId` (opcional): ID do usuário para personalização

**Exemplo:**
```
GET /api/modules/enabled?segment=premium&region=BR&userId=123
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "betting",
      "name": "Sports Betting",
      "version": "1.0.0",
      "enabledAt": "2024-01-15T10:00:00.000Z",
      "config": {
        "maxBetAmount": 10000,
        "liveBettingEnabled": true,
        "oddsFormat": "decimal",
        "autoAcceptOddsChanges": false,
        "features": {
          "cashout": true,
          "betBuilder": true,
          "livestream": true
        }
      }
    },
    {
      "id": "casino",
      "name": "Casino Games",
      "version": "1.2.0", 
      "enabledAt": "2024-01-15T10:00:00.000Z",
      "config": {
        "gameCategories": ["slots", "table", "live"],
        "maxSessionTime": 7200,
        "responsibleGaming": {
          "lossLimit": 5000,
          "sessionReminders": true
        }
      }
    },
    {
      "id": "payments",
      "name": "Payment System",
      "version": "2.1.0",
      "enabledAt": "2024-01-15T10:00:00.000Z",
      "config": {
        "methods": ["pix", "credit-card", "debit-card"],
        "limits": {
          "dailyDeposit": 50000,
          "dailyWithdraw": 100000,
          "minDeposit": 10
        },
        "kyc": {
          "required": true,
          "level": "basic"
        }
      }
    }
  ]
}
```

---

## 🔧 2. CONTROLE DE MÓDULOS

### 2.1 Ativar Módulo
```http
POST /api/modules/enable/{moduleId}
Content-Type: application/json

{
  "userId": "123",
  "segment": "premium",
  "region": "BR",
  "config": {
    "customProperty": "value"
  }
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "moduleId": "lottery",
    "enabled": true,
    "enabledAt": "2024-01-15T15:30:00.000Z",
    "config": {
      "availableGames": ["mega-sena", "quina"],
      "maxTicketValue": 1000,
      "autoNumberSelection": true
    }
  }
}
```

### 2.2 Desativar Módulo
```http
POST /api/modules/disable/{moduleId}
Content-Type: application/json

{
  "userId": "123",
  "segment": "default",
  "region": "BR",
  "reason": "User request"
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "moduleId": "lottery",
    "disabled": true,
    "disabledAt": "2024-01-15T16:00:00.000Z",
    "reason": "User request"
  }
}
```

---

## ⚙️ 3. CONFIGURAÇÃO DE MÓDULOS

### 3.1 Obter Configuração de Módulo
```http
GET /api/modules/{moduleId}/config?userId={userId}&segment={segment}&region={region}
```

**Exemplo:**
```
GET /api/modules/betting/config?userId=123&segment=premium&region=BR
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "moduleId": "betting",
    "version": "1.0.0",
    "lastUpdated": "2024-01-15T10:00:00.000Z",
    "config": {
      "maxBetAmount": 10000,
      "liveBettingEnabled": true,
      "oddsFormat": "decimal",
      "autoAcceptOddsChanges": false,
      "sports": {
        "football": { "enabled": true, "maxOdds": 50 },
        "basketball": { "enabled": true, "maxOdds": 20 },
        "tennis": { "enabled": false }
      },
      "features": {
        "cashout": true,
        "betBuilder": true,
        "livestream": true,
        "statistics": true
      },
      "ui": {
        "theme": "dark",
        "oddsAnimation": true,
        "soundEffects": false
      }
    }
  }
}
```

### 3.2 Atualizar Configuração de Módulo
```http
PUT /api/modules/{moduleId}/config
Content-Type: application/json

{
  "userId": "123",
  "segment": "premium",
  "config": {
    "maxBetAmount": 15000,
    "features": {
      "cashout": true,
      "betBuilder": true,
      "livestream": true,
      "statistics": true,
      "promotionalBoosts": true
    }
  }
}
```

---

## 🎯 4. EXECUÇÃO DE AÇÕES DOS MÓDULOS

### 4.1 Estrutura Geral de Ação
```http
POST /api/modules/{moduleId}/actions/{actionType}
Content-Type: application/json

{
  "payload": {
    // Dados específicos da ação
  },
  "userId": "123",
  "metadata": {
    "timestamp": "2024-01-15T20:15:30.000Z",
    "source": "mobile-app",
    "platform": "android",
    "appVersion": "1.0.0"
  }
}
```

---

## 🏈 5. MÓDULO DE APOSTAS (BETTING)

### 5.1 Fazer Aposta
```http
POST /api/modules/betting/actions/place-bet
Content-Type: application/json

{
  "payload": {
    "betslipId": "betslip-123",
    "selections": [
      {
        "eventId": "match-456",
        "marketId": "1x2",
        "outcomeId": "home",
        "odds": 2.10,
        "sport": "football",
        "eventName": "Flamengo vs Palmeiras"
      }
    ],
    "stake": 100.00,
    "betType": "single",
    "acceptOddsChanges": false
  },
  "userId": "123",
  "metadata": {
    "timestamp": "2024-01-15T20:15:30.000Z",
    "source": "mobile-app"
  }
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "betId": "bet-789",
    "status": "confirmed",
    "placedAt": "2024-01-15T20:15:30.000Z",
    "stake": 100.00,
    "potentialPayout": 210.00,
    "oddsAccepted": 2.10,
    "reference": "BT789456123",
    "selections": [
      {
        "eventId": "match-456",
        "marketId": "1x2",
        "outcomeId": "home",
        "odds": 2.10,
        "status": "active"
      }
    ]
  }
}
```

### 5.2 Adicionar ao Cupom de Apostas
```http
POST /api/modules/betting/actions/add-to-betslip
Content-Type: application/json

{
  "payload": {
    "eventId": "match-789",
    "marketId": "over-under",
    "outcomeId": "over_2.5",
    "odds": 1.85,
    "sport": "football",
    "eventName": "São Paulo vs Corinthians",
    "stake": 50.00
  },
  "userId": "123"
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "betslipId": "betslip-124",
    "selectionsCount": 2,
    "totalStake": 150.00,
    "potentialPayout": 395.00,
    "combinedOdds": 3.95,
    "selections": [
      {
        "eventId": "match-456",
        "selection": "Flamengo to win",
        "odds": 2.10,
        "stake": 100.00
      },
      {
        "eventId": "match-789", 
        "selection": "Over 2.5 goals",
        "odds": 1.85,
        "stake": 50.00
      }
    ]
  }
}
```

### 5.3 Cashout de Aposta
```http
POST /api/modules/betting/actions/cashout
Content-Type: application/json

{
  "payload": {
    "betId": "bet-789",
    "cashoutAmount": 150.00,
    "partial": false
  },
  "userId": "123"
}
```

---

## 🎰 6. MÓDULO DE CASSINO (CASINO)

### 6.1 Iniciar Jogo
```http
POST /api/modules/casino/actions/launch-game
Content-Type: application/json

{
  "payload": {
    "gameId": "book_of_ra",
    "gameType": "slot",
    "provider": "novomatic",
    "currency": "BRL",
    "mode": "real", // "real" ou "demo"
    "stake": 10.00
  },
  "userId": "123"
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "sessionId": "session-abc123",
    "gameUrl": "https://games.casino.com/launch?token=xyz789",
    "gameInfo": {
      "id": "book_of_ra",
      "name": "Book of Ra Deluxe",
      "provider": "Novomatic",
      "type": "slot",
      "rtp": "95.10%",
      "maxWin": "500000",
      "paylines": 10
    },
    "balance": 2450.00,
    "sessionExpiry": "2024-01-15T23:15:30.000Z"
  }
}
```

### 6.2 Histórico de Jogos
```http
POST /api/modules/casino/actions/get-game-history
Content-Type: application/json

{
  "payload": {
    "gameType": "slot", // opcional
    "startDate": "2024-01-01",
    "endDate": "2024-01-15",
    "limit": 50,
    "offset": 0
  },
  "userId": "123"
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "sessions": [
      {
        "sessionId": "session-abc123",
        "gameId": "book_of_ra",
        "gameName": "Book of Ra Deluxe",
        "startedAt": "2024-01-15T20:00:00.000Z",
        "endedAt": "2024-01-15T20:45:00.000Z",
        "totalWagered": 250.00,
        "totalWon": 180.00,
        "netResult": -70.00,
        "spinsCount": 125,
        "biggestWin": 45.00
      }
    ],
    "pagination": {
      "total": 150,
      "limit": 50,
      "offset": 0,
      "hasNext": true
    },
    "summary": {
      "totalSessions": 150,
      "totalWagered": 15000.00,
      "totalWon": 13500.00,
      "netResult": -1500.00
    }
  }
}
```

---

## 🎲 7. MÓDULO DE LOTERIA (LOTTERY)

### 7.1 Comprar Bilhete de Loteria
```http
POST /api/modules/lottery/actions/buy-ticket
Content-Type: application/json

{
  "payload": {
    "gameType": "mega-sena",
    "drawId": "draw-2024-003",
    "numbers": [5, 12, 23, 34, 41, 58],
    "isQuickPick": false,
    "ticketPrice": 5.00,
    "quantity": 1
  },
  "userId": "123"
}
```

### 7.2 Verificar Resultados
```http
POST /api/modules/lottery/actions/check-results
Content-Type: application/json

{
  "payload": {
    "ticketId": "ticket-789",
    "gameType": "mega-sena",
    "drawId": "draw-2024-003"
  },
  "userId": "123"
}
```

---

## 💳 8. MÓDULO DE PAGAMENTOS (PAYMENTS)

### 8.1 Processar Depósito
```http
POST /api/modules/payments/actions/deposit
Content-Type: application/json

{
  "payload": {
    "amount": 500.00,
    "currency": "BRL",
    "method": "pix",
    "metadata": {
      "cpf": "123.456.789-00",
      "email": "user@example.com"
    }
  },
  "userId": "123"
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "transactionId": "txn-456789",
    "status": "pending",
    "amount": 500.00,
    "currency": "BRL",
    "method": "pix",
    "pixCode": "00020126580014BR.GOV.BCB.PIX...",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "expiresAt": "2024-01-15T21:15:30.000Z",
    "estimatedTime": "até 10 minutos"
  }
}
```

### 8.2 Processar Saque
```http
POST /api/modules/payments/actions/withdraw
Content-Type: application/json

{
  "payload": {
    "amount": 1000.00,
    "currency": "BRL",
    "method": "pix",
    "pixKey": "user@example.com",
    "keyType": "email"
  },
  "userId": "123"
}
```

---

## 🚨 9. FEATURE FLAGS E CONTROLE

### 9.1 Verificar Feature Flag
```http
POST /api/modules/{moduleId}/feature-flag
Content-Type: application/json

{
  "flagName": "new-betting-interface",
  "userId": "123",
  "segment": "premium",
  "platform": "android"
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "flagName": "new-betting-interface",
    "enabled": true,
    "variant": "version_b",
    "config": {
      "backgroundColor": "#1a1a1a",
      "animationSpeed": "fast"
    }
  }
}
```

---

## 📡 10. WEBSOCKET - ATUALIZAÇÕES EM TEMPO REAL

### 10.1 Eventos de Módulos
O sistema WebSocket envia eventos em tempo real para sincronizar módulos:

#### Módulo Ativado
```json
{
  "event": "module_enabled",
  "data": {
    "moduleId": "lottery",
    "userId": "123",
    "config": { /* configuração do módulo */ },
    "enabledAt": "2024-01-15T15:30:00.000Z"
  }
}
```

#### Módulo Desativado
```json
{
  "event": "module_disabled", 
  "data": {
    "moduleId": "lottery",
    "userId": "123",
    "reason": "Maintenance",
    "disabledAt": "2024-01-15T16:00:00.000Z"
  }
}
```

#### Configuração Atualizada
```json
{
  "event": "module_config_updated",
  "data": {
    "moduleId": "betting",
    "userId": "123",
    "config": { /* nova configuração */ },
    "updatedAt": "2024-01-15T17:00:00.000Z"
  }
}
```

#### Resultado de Ação
```json
{
  "event": "module_action_result",
  "data": {
    "moduleId": "betting",
    "action": "place-bet",
    "result": "success",
    "data": { /* resultado da ação */ },
    "timestamp": "2024-01-15T20:15:30.000Z"
  }
}
```

---

## 📊 11. ANALYTICS DE MÓDULOS

### 11.1 Rastrear Uso de Módulo
```http
POST /api/analytics/module-usage
Content-Type: application/json

{
  "moduleId": "betting",
  "action": "bet_placed",
  "userId": "123",
  "sessionId": "session-xyz",
  "properties": {
    "stake": 100.00,
    "sport": "football",
    "betType": "single",
    "odds": 2.10
  },
  "timestamp": "2024-01-15T20:15:30.000Z"
}
```

---

## 🔒 12. TRATAMENTO DE ERROS

### Módulo Não Encontrado
```json
{
  "success": false,
  "error": "Module 'unknown-module' not found",
  "code": "MODULE_NOT_FOUND"
}
```

### Módulo Desabilitado
```json
{
  "success": false,
  "error": "Module 'lottery' is currently disabled for user",
  "code": "MODULE_DISABLED",
  "details": {
    "reason": "User segment restriction"
  }
}
```

### Ação Inválida
```json
{
  "success": false,
  "error": "Action 'invalid-action' not supported by module 'betting'",
  "code": "INVALID_ACTION",
  "details": {
    "availableActions": ["place-bet", "add-to-betslip", "cashout"]
  }
}
```

### Dependência Não Atendida
```json
{
  "success": false,
  "error": "Cannot enable module 'lottery' - dependency 'payments' not enabled",
  "code": "DEPENDENCY_NOT_MET",
  "details": {
    "missingDependencies": ["payments"]
  }
}
```

---

## 🎛️ 13. CONFIGURAÇÕES AVANÇADAS

### 13.1 Segmentação de Usuários
O sistema suporta diferentes configurações por segmento:

- **default**: Usuário padrão
- **premium**: Usuário premium
- **vip**: Usuário VIP
- **new**: Usuário novo (primeiros 30 dias)
- **high-roller**: Usuário com alto volume de apostas

### 13.2 Configuração por Região
Diferentes regiões podem ter módulos e configurações específicas:

- **BR**: Brasil
- **AR**: Argentina  
- **CL**: Chile
- **CO**: Colômbia

### 13.3 Testes A/B
O sistema suporta testes A/B através de feature flags e variantes de configuração.

---

## 📝 14. OBSERVAÇÕES IMPORTANTES

1. **Todos os módulos devem ser independentes** e não podem depender diretamente uns dos outros
2. **Actions devem ser idempotentes** quando possível
3. **WebSocket é usado para sincronização em tempo real**
4. **Cache local é mantido para performance**
5. **Fallback para operação offline** quando backend não disponível
6. **Logs detalhados para auditoria** de todas as ações
7. **Validação de permissões** por usuário/segmento
8. **Rate limiting** para prevenir abuso

---

**Contato:** Envie este documento para o desenvolvedor backend junto com qualquer dúvida sobre implementação específica dos módulos.