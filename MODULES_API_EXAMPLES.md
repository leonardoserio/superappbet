# SuperAppBet - Exemplos Práticos de API dos Módulos

## 🚀 Exemplos de Requests/Responses Reais para Módulos

### 1. Inicialização do Sistema de Módulos

#### 1.1 Usuário Novo - Primeiro Login
```http
GET /api/modules/enabled?segment=new&region=BR&userId=new_user_456

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": [
    {
      "id": "payments",
      "name": "Payment System",
      "version": "2.1.0",
      "enabledAt": "2024-01-15T10:00:00.000Z",
      "config": {
        "methods": ["pix"],
        "limits": {
          "dailyDeposit": 1000,
          "dailyWithdraw": 500,
          "minDeposit": 10
        },
        "kyc": {
          "required": false,
          "level": "none"
        },
        "welcomeBonus": {
          "enabled": true,
          "percentage": 100,
          "maxAmount": 200
        }
      }
    },
    {
      "id": "betting",
      "name": "Sports Betting",
      "version": "1.0.0",
      "enabledAt": "2024-01-15T10:00:00.000Z",
      "config": {
        "maxBetAmount": 100,
        "liveBettingEnabled": false,
        "oddsFormat": "decimal",
        "sports": {
          "football": { "enabled": true, "maxOdds": 10 },
          "basketball": { "enabled": false },
          "tennis": { "enabled": false }
        },
        "features": {
          "cashout": false,
          "betBuilder": false,
          "livestream": false
        },
        "tutorial": {
          "required": true,
          "steps": ["basic-betting", "odds-explanation"]
        }
      }
    }
  ]
}
```

#### 1.2 Usuário Premium - Login Regular
```http
GET /api/modules/enabled?segment=premium&region=BR&userId=premium_user_789

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": [
    {
      "id": "payments",
      "name": "Payment System",
      "version": "2.1.0",
      "config": {
        "methods": ["pix", "credit-card", "debit-card", "crypto"],
        "limits": {
          "dailyDeposit": 100000,
          "dailyWithdraw": 50000,
          "minDeposit": 1
        },
        "kyc": {
          "required": true,
          "level": "advanced",
          "verified": true
        },
        "fees": {
          "depositFee": 0,
          "withdrawFee": 0,
          "expeditedWithdraw": 5.00
        }
      }
    },
    {
      "id": "betting",
      "name": "Sports Betting",
      "version": "1.0.0",
      "config": {
        "maxBetAmount": 50000,
        "liveBettingEnabled": true,
        "oddsFormat": "decimal",
        "sports": {
          "football": { "enabled": true, "maxOdds": 100 },
          "basketball": { "enabled": true, "maxOdds": 50 },
          "tennis": { "enabled": true, "maxOdds": 30 },
          "esports": { "enabled": true, "maxOdds": 20 }
        },
        "features": {
          "cashout": true,
          "betBuilder": true,
          "livestream": true,
          "statistics": true,
          "oddsBoost": true
        },
        "vipSupport": {
          "enabled": true,
          "priority": "high",
          "dedicatedManager": true
        }
      }
    },
    {
      "id": "casino",
      "name": "Casino Games",
      "version": "1.2.0",
      "config": {
        "gameCategories": ["slots", "table", "live", "jackpot"],
        "maxSessionTime": 14400,
        "vipTables": {
          "enabled": true,
          "minBet": 100
        },
        "bonuses": {
          "freeSpins": 50,
          "depositMatch": 150
        }
      }
    },
    {
      "id": "lottery",
      "name": "Lottery",
      "version": "1.0.0",
      "config": {
        "availableGames": ["mega-sena", "quina", "lotomania", "timemania"],
        "maxTicketValue": 5000,
        "autoNumberSelection": true,
        "subscriptions": {
          "enabled": true,
          "maxDraws": 50
        }
      }
    }
  ]
}
```

---

## 🏈 2. MÓDULO DE APOSTAS - CENÁRIOS DETALHADOS

### 2.1 Fazer Aposta Simples - Futebol
```http
POST /api/modules/betting/actions/place-bet
Content-Type: application/json

{
  "payload": {
    "betslipId": "betslip-20240115-001",
    "selections": [
      {
        "eventId": "flamengo_vs_palmeiras_2024",
        "marketId": "match_result",
        "outcomeId": "home_win",
        "odds": 2.10,
        "sport": "football",
        "league": "Brasileirão Série A",
        "eventName": "Flamengo vs Palmeiras",
        "eventDate": "2024-01-20T20:00:00.000Z",
        "venue": "Maracanã"
      }
    ],
    "stake": 100.00,
    "betType": "single",
    "acceptOddsChanges": false,
    "bonusCode": "WELCOME100"
  },
  "userId": "123",
  "metadata": {
    "timestamp": "2024-01-15T20:15:30.000Z",
    "source": "mobile-app",
    "platform": "android",
    "appVersion": "1.0.0",
    "deviceId": "device-abc123",
    "ipAddress": "192.168.1.100"
  }
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "betId": "bet-20240115-789",
    "status": "confirmed",
    "placedAt": "2024-01-15T20:15:30.000Z",
    "stake": 100.00,
    "potentialPayout": 210.00,
    "oddsAccepted": 2.10,
    "reference": "BT789456123",
    "bonusApplied": {
      "code": "WELCOME100",
      "type": "freebet",
      "amount": 100.00
    },
    "selections": [
      {
        "eventId": "flamengo_vs_palmeiras_2024",
        "marketId": "match_result",
        "outcomeId": "home_win",
        "odds": 2.10,
        "status": "active",
        "description": "Flamengo to win"
      }
    ],
    "receipt": {
      "receiptId": "receipt-123456",
      "timestamp": "2024-01-15T20:15:30.000Z",
      "hash": "sha256:abc123def456..."
    }
  }
}
```

### 2.2 Aposta Múltipla - Combo de Jogos
```http
POST /api/modules/betting/actions/place-bet
Content-Type: application/json

{
  "payload": {
    "betslipId": "betslip-20240115-002",
    "selections": [
      {
        "eventId": "real_madrid_vs_barcelona",
        "marketId": "match_result",
        "outcomeId": "away_win",
        "odds": 3.20,
        "sport": "football",
        "league": "La Liga",
        "eventName": "Real Madrid vs Barcelona"
      },
      {
        "eventId": "manchester_city_vs_liverpool",
        "marketId": "total_goals",
        "outcomeId": "over_2.5",
        "odds": 1.85,
        "sport": "football",
        "league": "Premier League",
        "eventName": "Manchester City vs Liverpool"
      },
      {
        "eventId": "psg_vs_bayern",
        "marketId": "both_teams_score",
        "outcomeId": "yes",
        "odds": 1.75,
        "sport": "football",
        "league": "Champions League",
        "eventName": "PSG vs Bayern Munich"
      }
    ],
    "stake": 50.00,
    "betType": "accumulator",
    "acceptOddsChanges": true,
    "maxOddsChange": 0.05
  },
  "userId": "premium_user_789"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "betId": "bet-20240115-790",
    "status": "confirmed",
    "placedAt": "2024-01-15T20:20:00.000Z",
    "stake": 50.00,
    "potentialPayout": 515.20,
    "combinedOdds": 10.304,
    "reference": "AC790123456",
    "selections": [
      {
        "eventId": "real_madrid_vs_barcelona",
        "description": "Barcelona to win",
        "odds": 3.20,
        "status": "active"
      },
      {
        "eventId": "manchester_city_vs_liverpool", 
        "description": "Over 2.5 goals",
        "odds": 1.85,
        "status": "active"
      },
      {
        "eventId": "psg_vs_bayern",
        "description": "Both teams to score - Yes",
        "odds": 1.75,
        "status": "active"
      }
    ],
    "accumulatorBonus": {
      "percentage": 15,
      "additionalPayout": 77.28
    }
  }
}
```

### 2.3 Cashout de Aposta ao Vivo
```http
POST /api/modules/betting/actions/cashout
Content-Type: application/json

{
  "payload": {
    "betId": "bet-20240115-789",
    "cashoutAmount": 175.50,
    "partial": false,
    "reason": "securing_profit"
  },
  "userId": "123"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "cashoutId": "cashout-20240115-001",
    "betId": "bet-20240115-789",
    "status": "completed",
    "cashoutAmount": 175.50,
    "originalStake": 100.00,
    "profit": 75.50,
    "completedAt": "2024-01-15T21:30:00.000Z",
    "processingTime": "instant",
    "balanceUpdate": {
      "previousBalance": 1000.00,
      "newBalance": 1175.50,
      "transaction": "credit"
    }
  }
}
```

---

## 🎰 3. MÓDULO DE CASSINO - CENÁRIOS DETALHADOS

### 3.1 Iniciar Jogo de Slot
```http
POST /api/modules/casino/actions/launch-game
Content-Type: application/json

{
  "payload": {
    "gameId": "book_of_ra_deluxe",
    "gameType": "slot",
    "provider": "novomatic",
    "currency": "BRL",
    "mode": "real",
    "initialStake": 2.50,
    "autoplay": false
  },
  "userId": "premium_user_789",
  "metadata": {
    "timestamp": "2024-01-15T21:00:00.000Z",
    "source": "mobile-app",
    "platform": "android"
  }
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "sessionId": "casino-session-abc123",
    "gameUrl": "https://games.casino.com/launch?token=xyz789secure",
    "gameInfo": {
      "id": "book_of_ra_deluxe",
      "name": "Book of Ra Deluxe",
      "provider": "Novomatic",
      "type": "slot",
      "category": "adventure",
      "rtp": "95.10%",
      "maxWin": "500000",
      "paylines": 10,
      "minBet": 0.10,
      "maxBet": 100.00,
      "features": ["freespins", "scatter", "gamble"],
      "thumbnail": "/images/games/book_of_ra_deluxe.jpg"
    },
    "playerInfo": {
      "balance": 2450.00,
      "currency": "BRL",
      "vipLevel": "gold",
      "loyaltyPoints": 15680
    },
    "sessionSettings": {
      "sessionExpiry": "2024-01-15T23:00:00.000Z",
      "maxSessionTime": 7200,
      "lossLimit": 1000.00,
      "timeReminders": [3600, 5400]
    },
    "bonuses": {
      "freeSpinsAvailable": 25,
      "bonusBalance": 150.00,
      "wagering": {
        "required": 35,
        "completed": 12
      }
    }
  }
}
```

### 3.2 Jogo de Mesa ao Vivo - Blackjack
```http
POST /api/modules/casino/actions/launch-game
Content-Type: application/json

{
  "payload": {
    "gameId": "live_blackjack_vip",
    "gameType": "live-table",
    "provider": "evolution",
    "currency": "BRL",
    "mode": "real",
    "tableId": "blackjack-vip-01",
    "seatPreference": "auto"
  },
  "userId": "vip_user_999"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "sessionId": "live-session-xyz789",
    "gameUrl": "https://live.casino.com/table?token=secure123&table=bj-vip-01",
    "gameInfo": {
      "id": "live_blackjack_vip",
      "name": "VIP Blackjack",
      "provider": "Evolution Gaming",
      "type": "live-table",
      "dealerInfo": {
        "name": "Sofia",
        "language": "PT-BR",
        "rating": 4.9
      },
      "tableInfo": {
        "id": "blackjack-vip-01",
        "minBet": 100.00,
        "maxBet": 25000.00,
        "seats": 7,
        "availableSeats": 3
      }
    },
    "playerInfo": {
      "balance": 15000.00,
      "vipStatus": "diamond",
      "cashbackRate": 1.5,
      "seatNumber": 4
    },
    "vipFeatures": {
      "personalAccount": true,
      "prioritySupport": true,
      "exclusiveTables": true,
      "higherLimits": true
    }
  }
}
```

### 3.3 Histórico Detalhado de Jogos
```http
POST /api/modules/casino/actions/get-game-history
Content-Type: application/json

{
  "payload": {
    "gameType": "slot",
    "startDate": "2024-01-01",
    "endDate": "2024-01-15",
    "limit": 10,
    "offset": 0,
    "includeDetails": true
  },
  "userId": "premium_user_789"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "sessions": [
      {
        "sessionId": "session-20240115-001",
        "gameId": "book_of_ra_deluxe",
        "gameName": "Book of Ra Deluxe",
        "provider": "Novomatic",
        "startedAt": "2024-01-15T20:00:00.000Z",
        "endedAt": "2024-01-15T20:45:00.000Z",
        "duration": 2700,
        "totalWagered": 125.00,
        "totalWon": 185.50,
        "netResult": 60.50,
        "spinsCount": 50,
        "bonusRounds": 2,
        "biggestWin": 85.00,
        "winRate": 32,
        "details": {
          "avgBetSize": 2.50,
          "highestBet": 10.00,
          "lowestBet": 1.00,
          "volatility": "medium",
          "hitFrequency": 24.5
        }
      },
      {
        "sessionId": "session-20240114-003",
        "gameId": "starburst",
        "gameName": "Starburst",
        "provider": "NetEnt",
        "startedAt": "2024-01-14T19:30:00.000Z",
        "endedAt": "2024-01-14T20:15:00.000Z",
        "duration": 2700,
        "totalWagered": 75.00,
        "totalWon": 45.00,
        "netResult": -30.00,
        "spinsCount": 75,
        "bonusRounds": 1,
        "biggestWin": 25.00,
        "winRate": 28
      }
    ],
    "pagination": {
      "total": 45,
      "limit": 10,
      "offset": 0,
      "hasNext": true,
      "hasPrevious": false
    },
    "summary": {
      "totalSessions": 45,
      "totalWagered": 5650.00,
      "totalWon": 5240.00,
      "netResult": -410.00,
      "avgSessionTime": 2400,
      "favoriteGame": "book_of_ra_deluxe",
      "biggestWin": 850.00,
      "longestSession": 7200
    }
  }
}
```

---

## 🎲 4. MÓDULO DE LOTERIA - CENÁRIOS DETALHADOS

### 4.1 Comprar Bilhete Mega-Sena
```http
POST /api/modules/lottery/actions/buy-ticket
Content-Type: application/json

{
  "payload": {
    "gameType": "mega-sena",
    "drawId": "mega-sena-2024-008",
    "numbers": [7, 15, 23, 34, 41, 58],
    "isQuickPick": false,
    "ticketPrice": 5.00,
    "quantity": 1,
    "subscription": false
  },
  "userId": "123"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "ticketId": "ticket-mega-20240115-001",
    "gameType": "mega-sena",
    "drawId": "mega-sena-2024-008",
    "numbers": [7, 15, 23, 34, 41, 58],
    "ticketPrice": 5.00,
    "purchasedAt": "2024-01-15T20:30:00.000Z",
    "drawDate": "2024-01-20T20:00:00.000Z",
    "status": "active",
    "barcode": "23791234567890123456789012345",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "jackpotInfo": {
      "currentJackpot": 45000000.00,
      "nextDraw": "2024-01-20T20:00:00.000Z",
      "drawNumber": 2780
    },
    "receipt": {
      "receiptId": "receipt-lottery-123",
      "timestamp": "2024-01-15T20:30:00.000Z"
    }
  }
}
```

### 4.2 Assinatura de Múltiplos Sorteios
```http
POST /api/modules/lottery/actions/create-subscription
Content-Type: application/json

{
  "payload": {
    "gameType": "mega-sena",
    "numbers": [5, 12, 23, 34, 41, 58],
    "drawCount": 10,
    "startFromNext": true,
    "autoRenew": false
  },
  "userId": "premium_user_789"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "subscriptionId": "sub-mega-20240115-001",
    "gameType": "mega-sena",
    "numbers": [5, 12, 23, 34, 41, 58],
    "drawCount": 10,
    "totalCost": 50.00,
    "startDraw": "mega-sena-2024-009",
    "endDraw": "mega-sena-2024-018",
    "status": "active",
    "createdAt": "2024-01-15T20:45:00.000Z",
    "draws": [
      {
        "drawId": "mega-sena-2024-009",
        "drawDate": "2024-01-23T20:00:00.000Z",
        "ticketId": "ticket-sub-001-001"
      },
      {
        "drawId": "mega-sena-2024-010",
        "drawDate": "2024-01-27T20:00:00.000Z", 
        "ticketId": "ticket-sub-001-002"
      }
      // ... mais 8 sorteios
    ]
  }
}
```

### 4.3 Verificar Resultados de Bilhete
```http
POST /api/modules/lottery/actions/check-results
Content-Type: application/json

{
  "payload": {
    "ticketId": "ticket-mega-20240110-001",
    "gameType": "mega-sena",
    "drawId": "mega-sena-2024-007"
  },
  "userId": "123"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "ticketId": "ticket-mega-20240110-001",
    "gameType": "mega-sena",
    "drawId": "mega-sena-2024-007",
    "ticketNumbers": [7, 15, 23, 34, 41, 58],
    "winningNumbers": [7, 15, 23, 28, 41, 52],
    "supplementaryNumbers": [13, 45],
    "matches": 4,
    "prizeCategory": "quadra",
    "prizeAmount": 1284.71,
    "isWinner": true,
    "drawDate": "2024-01-13T20:00:00.000Z",
    "resultDetails": {
      "matchedNumbers": [7, 15, 23, 41],
      "prizeBreakdown": {
        "sena": { "winners": 0, "prizeValue": 0 },
        "quina": { "winners": 65, "prizeValue": 68254.30 },
        "quadra": { "winners": 5324, "prizeValue": 1284.71 }
      }
    },
    "claimInfo": {
      "status": "pending_claim",
      "expiryDate": "2024-05-13T23:59:59.000Z",
      "claimMethod": "automatic",
      "estimatedProcessing": "up to 2 business days"
    }
  }
}
```

---

## 💳 5. MÓDULO DE PAGAMENTOS - CENÁRIOS DETALHADOS

### 5.1 Depósito via PIX
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
      "email": "usuario@example.com",
      "phone": "+5511999999999"
    }
  },
  "userId": "123",
  "metadata": {
    "source": "mobile-app",
    "platform": "android"
  }
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "transactionId": "dep-pix-20240115-001",
    "status": "pending",
    "amount": 500.00,
    "currency": "BRL",
    "method": "pix",
    "createdAt": "2024-01-15T21:00:00.000Z",
    "pixDetails": {
      "pixCode": "00020126580014BR.GOV.BCB.PIX2536pix.example.com/qr/v2/abc1235204000053039865802BR5923SUPERAPPBET LTDA6009SAO PAULO61080540090062070503***630435E7",
      "qrCodeImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
      "chavePix": "pix@superappbet.com",
      "beneficiario": "SUPERAPPBET LTDA",
      "expiresAt": "2024-01-15T22:00:00.000Z"
    },
    "instructions": {
      "steps": [
        "Abra o app do seu banco",
        "Escaneie o código QR ou copie o código PIX",
        "Confirme o pagamento",
        "O valor será creditado automaticamente"
      ],
      "estimatedTime": "até 10 minutos",
      "supportContact": "+5511999999999"
    },
    "fees": {
      "depositFee": 0.00,
      "netAmount": 500.00
    }
  }
}
```

### 5.2 Saque via PIX
```http
POST /api/modules/payments/actions/withdraw
Content-Type: application/json

{
  "payload": {
    "amount": 1000.00,
    "currency": "BRL",
    "method": "pix",
    "pixKey": "usuario@example.com",
    "keyType": "email",
    "expedited": false
  },
  "userId": "premium_user_789"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "transactionId": "with-pix-20240115-001",
    "status": "processing",
    "amount": 1000.00,
    "currency": "BRL",
    "method": "pix",
    "pixKey": "usuario@example.com",
    "keyType": "email",
    "createdAt": "2024-01-15T21:30:00.000Z",
    "fees": {
      "withdrawFee": 0.00,
      "netAmount": 1000.00
    },
    "processing": {
      "estimatedCompletion": "2024-01-16T09:00:00.000Z",
      "businessDays": 1,
      "status": "bank_processing"
    },
    "verification": {
      "kycStatus": "verified",
      "additionalDocsRequired": false
    },
    "balanceUpdate": {
      "previousBalance": 2500.00,
      "newBalance": 1500.00,
      "reservedAmount": 1000.00
    }
  }
}
```

### 5.3 Histórico de Transações
```http
POST /api/modules/payments/actions/get-transaction-history
Content-Type: application/json

{
  "payload": {
    "startDate": "2024-01-01",
    "endDate": "2024-01-15",
    "transactionType": "all", // "deposit", "withdraw", "all"
    "status": "all", // "completed", "pending", "failed", "all"
    "limit": 20,
    "offset": 0
  },
  "userId": "premium_user_789"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "transactions": [
      {
        "transactionId": "dep-pix-20240115-001",
        "type": "deposit",
        "method": "pix",
        "amount": 500.00,
        "currency": "BRL",
        "status": "completed",
        "createdAt": "2024-01-15T21:00:00.000Z",
        "completedAt": "2024-01-15T21:05:30.000Z",
        "reference": "PIX20240115210530",
        "fees": {
          "depositFee": 0.00,
          "netAmount": 500.00
        }
      },
      {
        "transactionId": "with-pix-20240114-002",
        "type": "withdraw",
        "method": "pix",
        "amount": 800.00,
        "currency": "BRL",
        "status": "completed",
        "createdAt": "2024-01-14T15:30:00.000Z",
        "completedAt": "2024-01-15T09:15:00.000Z",
        "reference": "PIXOUT20240115091500",
        "fees": {
          "withdrawFee": 0.00,
          "netAmount": 800.00
        }
      },
      {
        "transactionId": "dep-card-20240112-001",
        "type": "deposit",
        "method": "credit-card",
        "amount": 200.00,
        "currency": "BRL",
        "status": "completed",
        "createdAt": "2024-01-12T20:45:00.000Z",
        "completedAt": "2024-01-12T20:45:15.000Z",
        "reference": "CARD****1234",
        "fees": {
          "depositFee": 6.00,
          "netAmount": 194.00
        },
        "cardInfo": {
          "last4": "1234",
          "brand": "Visa",
          "issuer": "Banco do Brasil"
        }
      }
    ],
    "pagination": {
      "total": 156,
      "limit": 20,
      "offset": 0,
      "hasNext": true
    },
    "summary": {
      "totalDeposits": 15000.00,
      "totalWithdrawals": 8500.00,
      "netFlow": 6500.00,
      "averageDeposit": 375.00,
      "averageWithdrawal": 567.00,
      "mostUsedMethod": "pix"
    }
  }
}
```

---

## 📡 6. WEBSOCKET - EVENTOS EM TEMPO REAL

### 6.1 Módulo Ativado (Premium Upgrade)
```json
{
  "event": "module_enabled",
  "timestamp": "2024-01-15T22:00:00.000Z",
  "data": {
    "moduleId": "casino",
    "userId": "123",
    "reason": "segment_upgrade",
    "config": {
      "gameCategories": ["slots", "table", "live"],
      "maxSessionTime": 7200,
      "bonuses": {
        "welcomePackage": true,
        "freeSpins": 100
      }
    },
    "enabledAt": "2024-01-15T22:00:00.000Z"
  }
}
```

### 6.2 Resultado de Aposta ao Vivo
```json
{
  "event": "module_action_result",
  "timestamp": "2024-01-15T22:45:00.000Z",
  "data": {
    "moduleId": "betting",
    "action": "bet_settled",
    "userId": "123",
    "result": {
      "betId": "bet-20240115-789",
      "status": "won",
      "originalStake": 100.00,
      "payout": 210.00,
      "profit": 110.00,
      "settledAt": "2024-01-15T22:45:00.000Z",
      "event": {
        "name": "Flamengo vs Palmeiras",
        "result": "home_win",
        "score": "2-1"
      }
    }
  }
}
```

### 6.3 Jackpot Progressivo Atualizado
```json
{
  "event": "module_update",
  "timestamp": "2024-01-15T23:00:00.000Z",
  "data": {
    "moduleId": "casino",
    "updateType": "jackpot_update",
    "data": {
      "gameId": "mega_fortune",
      "jackpotAmount": 2567890.45,
      "currency": "BRL",
      "lastWinner": {
        "amount": 1234567.89,
        "timestamp": "2024-01-15T22:55:00.000Z",
        "gameId": "mega_fortune"
      }
    }
  }
}
```

---

## 🔧 7. CONFIGURAÇÕES DINÂMICAS

### 7.1 Feature Flag - Teste A/B
```http
POST /api/modules/betting/feature-flag
Content-Type: application/json

{
  "flagName": "new-betslip-interface",
  "userId": "123", 
  "segment": "premium",
  "platform": "android"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "flagName": "new-betslip-interface",
    "enabled": true,
    "variant": "version_b",
    "config": {
      "layout": "compact",
      "animations": true,
      "quickBetButtons": true,
      "colors": {
        "primary": "#0ea5e9",
        "accent": "#f59e0b"
      }
    },
    "testGroup": "group_b",
    "testPercent": 50
  }
}
```

### 7.2 Atualização de Configuração - Limites Dinâmicos
```http
PUT /api/modules/betting/config
Content-Type: application/json

{
  "userId": "vip_user_999",
  "segment": "vip",
  "config": {
    "maxBetAmount": 100000,
    "sports": {
      "football": { "enabled": true, "maxOdds": 500 },
      "basketball": { "enabled": true, "maxOdds": 200 },
      "tennis": { "enabled": true, "maxOdds": 100 },
      "esports": { "enabled": true, "maxOdds": 50 }
    },
    "features": {
      "cashout": true,
      "betBuilder": true,
      "livestream": true,
      "statistics": true,
      "oddsBoost": true,
      "exclusiveMarkets": true
    },
    "vipPerks": {
      "personalAccountManager": true,
      "higherCashoutLimits": true,
      "fasterWithdrawals": true,
      "exclusivePromotions": true
    }
  }
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "moduleId": "betting",
    "userId": "vip_user_999",
    "configUpdated": true,
    "updatedAt": "2024-01-15T23:15:00.000Z",
    "previousLimits": {
      "maxBetAmount": 50000
    },
    "newLimits": {
      "maxBetAmount": 100000
    },
    "effectiveImmediately": true
  }
}
```

---

## 🚨 8. TRATAMENTO DE ERROS ESPECÍFICOS

### 8.1 Limite de Aposta Excedido
```http
POST /api/modules/betting/actions/place-bet
// Request com stake muito alto...

HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "success": false,
  "error": "Bet amount exceeds maximum limit for user segment",
  "code": "BET_LIMIT_EXCEEDED",
  "details": {
    "requestedAmount": 15000.00,
    "maxAllowed": 10000.00,
    "userSegment": "premium",
    "currency": "BRL"
  },
  "suggestions": [
    "Reduce bet amount to R$ 10,000.00 or less",
    "Contact VIP support for higher limits"
  ]
}
```

### 8.2 Jogo Indisponível
```http
POST /api/modules/casino/actions/launch-game
// Request para jogo em manutenção...

HTTP/1.1 503 Service Unavailable
Content-Type: application/json

{
  "success": false,
  "error": "Game temporarily unavailable due to maintenance",
  "code": "GAME_MAINTENANCE",
  "details": {
    "gameId": "mega_fortune",
    "maintenanceStart": "2024-01-15T23:00:00.000Z",
    "estimatedEnd": "2024-01-16T02:00:00.000Z",
    "reason": "Scheduled maintenance"
  },
  "alternatives": [
    {
      "gameId": "mega_fortune_dreams",
      "name": "Mega Fortune Dreams",
      "provider": "NetEnt"
    }
  ]
}
```

### 8.3 Saldo Insuficiente
```http
POST /api/modules/payments/actions/withdraw
// Request com valor maior que saldo...

HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "success": false,
  "error": "Insufficient balance for withdrawal",
  "code": "INSUFFICIENT_BALANCE",
  "details": {
    "requestedAmount": 2000.00,
    "availableBalance": 1500.00,
    "reservedAmount": 0.00,
    "currency": "BRL"
  },
  "suggestions": [
    "Reduce withdrawal amount to R$ 1,500.00 or less",
    "Make a deposit to increase balance"
  ]
}
```

---

## 📊 9. ANALYTICS E MONITORAMENTO

### 9.1 Tracking de Ação de Módulo
```http
POST /api/analytics/module-action
Content-Type: application/json

{
  "moduleId": "betting",
  "action": "bet_placed",
  "userId": "123",
  "sessionId": "session-abc123",
  "properties": {
    "betType": "single",
    "sport": "football",
    "stake": 100.00,
    "odds": 2.10,
    "potentialWin": 210.00,
    "bonusUsed": false,
    "oddsFormat": "decimal",
    "platform": "android"
  },
  "timestamp": "2024-01-15T20:15:30.000Z",
  "metadata": {
    "appVersion": "1.0.0",
    "deviceModel": "SM-G973F",
    "osVersion": "Android 11"
  }
}

HTTP/1.1 204 No Content
```

---

## 📝 10. OBSERVAÇÕES DE IMPLEMENTAÇÃO

### 10.1 Padrões de Response Time
- **Ações críticas** (place-bet, deposit): < 500ms
- **Consultas** (get-config, history): < 200ms  
- **Launches** (game launch): < 1000ms
- **WebSocket events**: < 100ms

### 10.2 Rate Limiting
- **Ações financeiras**: 10 req/min por usuário
- **Consultas**: 100 req/min por usuário
- **WebSocket connections**: 1 por usuário por plataforma

### 10.3 Caching Strategy
- **Configurações de módulo**: 5 minutos
- **Feature flags**: 1 minuto
- **Saldos**: Sem cache (sempre fresh)
- **Históricos**: 30 segundos

### 10.4 Logs Estruturados
Todos os requests devem gerar logs estruturados com:
- `userId`, `moduleId`, `action`
- `timestamp`, `platform`, `appVersion`
- `requestId` para tracking
- Resultado da operação e tempo de processamento

---

**Importante:** Este documento contém exemplos detalhados para implementação completa do sistema de módulos do SuperAppBet.