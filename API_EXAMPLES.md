# SuperAppBet - Exemplos Práticos de API

## 🚀 Exemplos de Requests/Responses Reais

### 1. Home Screen - Usuário Novo
```http
GET /api/screens/home?userId=new_user_123&segment=default

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "screenName": "home",
    "metadata": {
      "name": "Home Screen",
      "version": 1,
      "lastUpdated": "2024-01-15T10:30:00.000Z",
      "cacheTTL": 300
    },
    "components": [
      {
        "type": "Container",
        "props": {
          "style": { "flex": 1, "backgroundColor": "#ffffff" }
        },
        "children": [
          {
            "type": "PromotionCard",
            "props": {
              "title": "Bônus de Boas-vindas!",
              "description": "Ganhe até R$ 500 no seu primeiro depósito",
              "buttonText": "Depositar Agora",
              "gradient": ["#0ea5e9", "#0284c7"],
              "action": {
                "type": "navigate",
                "payload": { "screen": "deposit" }
              }
            }
          },
          {
            "type": "Text",
            "props": {
              "variant": "heading",
              "text": "Apostas Rápidas",
              "style": { "marginTop": 24, "marginBottom": 16 }
            }
          },
          {
            "type": "QuickBetCard",
            "props": {
              "matchId": "flamengo_vs_palmeiras",
              "homeTeam": "Flamengo",
              "awayTeam": "Palmeiras",
              "matchTime": "Hoje, 20:00",
              "isLive": true,
              "odds": {
                "home": 2.10,
                "draw": 3.20,
                "away": 3.80
              }
            }
          }
        ]
      }
    ]
  }
}
```

### 2. Home Screen - Usuário Premium
```http
GET /api/screens/home?userId=premium_user_456&segment=premium

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "screenName": "home",
    "metadata": {
      "name": "Home Screen Premium",
      "version": 1,
      "lastUpdated": "2024-01-15T10:30:00.000Z",
      "cacheTTL": 180
    },
    "components": [
      {
        "type": "Container",
        "props": {
          "style": { "flex": 1, "backgroundColor": "#ffffff" }
        },
        "children": [
          {
            "type": "Text",
            "props": {
              "variant": "heading",
              "text": "Bem-vindo de volta, João!",
              "color": "primary"
            }
          },
          {
            "type": "Container",
            "props": {
              "style": { 
                "flexDirection": "row", 
                "justifyContent": "space-between",
                "marginVertical": 16
              }
            },
            "children": [
              {
                "type": "Text",
                "props": {
                  "variant": "caption",
                  "text": "Saldo disponível",
                  "color": "tertiary"
                }
              },
              {
                "type": "Text",
                "props": {
                  "variant": "subtitle",
                  "text": "R$ 2.450,00",
                  "color": "primary",
                  "weight": "bold"
                }
              }
            ]
          },
          {
            "type": "PromotionCard",
            "props": {
              "title": "Cashback Premium",
              "description": "10% de volta em todas as apostas desta semana",
              "buttonText": "Ver Detalhes",
              "gradient": ["#7c3aed", "#c026d3"],
              "isPremium": true
            }
          }
        ]
      }
    ]
  }
}
```

### 3. Sports Screen - Futebol ao Vivo
```http
GET /api/screens/sports?sport=football&live=true&userId=123

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "screenName": "sports",
    "metadata": {
      "name": "Sports - Football Live",
      "version": 1,
      "lastUpdated": "2024-01-15T15:45:00.000Z",
      "cacheTTL": 30
    },
    "layout": {
      "type": "scroll",
      "backgroundColor": "#fafafa"
    },
    "components": [
      {
        "type": "Container",
        "props": {
          "style": { "padding": 16 }
        },
        "children": [
          {
            "type": "Text",
            "props": {
              "variant": "heading",
              "text": "⚽ Futebol ao Vivo",
              "style": { "marginBottom": 16 }
            }
          },
          {
            "type": "QuickBetCard",
            "props": {
              "matchId": "live_123",
              "homeTeam": "Brasil",
              "awayTeam": "Argentina", 
              "matchTime": "45' + 2",
              "isLive": true,
              "score": { "home": 1, "away": 0 },
              "odds": {
                "home": 1.85,
                "draw": 3.40,
                "away": 4.20
              },
              "liveEvents": [
                { "time": "23'", "event": "Gol - Neymar" },
                { "time": "31'", "event": "Cartão Amarelo - Messi" }
              ]
            }
          },
          {
            "type": "QuickBetCard",
            "props": {
              "matchId": "live_124",
              "homeTeam": "Flamengo",
              "awayTeam": "Corinthians",
              "matchTime": "78'",
              "isLive": true,
              "score": { "home": 2, "away": 1 },
              "odds": {
                "home": 1.20,
                "draw": 5.50,
                "away": 8.00
              }
            }
          }
        ]
      }
    ]
  }
}
```

### 4. Casino Screen
```http
GET /api/screens/casino?category=slots&userId=789

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "screenName": "casino",
    "metadata": {
      "name": "Casino - Slots",
      "version": 1,
      "lastUpdated": "2024-01-15T12:00:00.000Z",
      "cacheTTL": 600
    },
    "components": [
      {
        "type": "Container",
        "props": {
          "style": { "flex": 1, "backgroundColor": "#1a1a1a" }
        },
        "children": [
          {
            "type": "PromotionCard",
            "props": {
              "title": "🎰 Mega Jackpot",
              "description": "R$ 1.250.000 acumulados!",
              "buttonText": "Jogar Agora",
              "gradient": ["#7c3aed", "#c026d3"],
              "style": { "marginBottom": 20 }
            }
          },
          {
            "type": "Text",
            "props": {
              "variant": "subtitle",
              "text": "Slots Populares",
              "color": "inverse",
              "style": { "marginBottom": 16 }
            }
          },
          {
            "type": "Container",
            "props": {
              "style": { 
                "flexDirection": "row",
                "flexWrap": "wrap",
                "justifyContent": "space-between"
              }
            },
            "children": [
              {
                "type": "GameCard",
                "props": {
                  "gameId": "book_of_ra",
                  "title": "Book of Ra",
                  "provider": "Novomatic",
                  "thumbnail": "/images/book_of_ra.jpg",
                  "jackpot": "R$ 15.000",
                  "rtp": "95.10%"
                }
              },
              {
                "type": "GameCard",
                "props": {
                  "gameId": "starburst",
                  "title": "Starburst",
                  "provider": "NetEnt",
                  "thumbnail": "/images/starburst.jpg",
                  "isPopular": true
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### 5. Component Library
```http
GET /api/components?category=betting

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": [
    {
      "id": "quick-bet-card",
      "name": "Quick Bet Card",
      "type": "QuickBetCard",
      "description": "Card para apostas rápidas em eventos esportivos",
      "category": "betting",
      "schema": {
        "props": {
          "matchId": { "type": "string", "required": true },
          "homeTeam": { "type": "string", "required": true },
          "awayTeam": { "type": "string", "required": true },
          "matchTime": { "type": "string", "required": true },
          "isLive": { "type": "boolean", "default": false },
          "score": { 
            "type": "object",
            "properties": {
              "home": { "type": "number" },
              "away": { "type": "number" }
            }
          },
          "odds": {
            "type": "object",
            "properties": {
              "home": { "type": "number", "required": true },
              "draw": { "type": "number", "required": true },
              "away": { "type": "number", "required": true }
            }
          }
        }
      },
      "defaultProps": {
        "isLive": false
      },
      "variants": ["default", "compact", "detailed"],
      "platforms": ["ios", "android"]
    },
    {
      "id": "bet-slip",
      "name": "Bet Slip",
      "type": "BetSlip",
      "description": "Cupom de apostas do usuário",
      "category": "betting",
      "schema": {
        "props": {
          "bets": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "matchId": { "type": "string" },
                "selection": { "type": "string" },
                "odds": { "type": "number" },
                "stake": { "type": "number" }
              }
            }
          },
          "totalOdds": { "type": "number" },
          "totalStake": { "type": "number" },
          "potentialWin": { "type": "number" }
        }
      },
      "variants": ["mini", "full", "checkout"],
      "platforms": ["ios", "android"]
    }
  ]
}
```

### 6. Analytics Tracking
```http
POST /api/analytics/track
Content-Type: application/json

{
  "event": "bet_placed",
  "properties": {
    "matchId": "flamengo_vs_palmeiras",
    "selection": "home",
    "odds": 2.10,
    "stake": 50.00,
    "potentialWin": 105.00,
    "screenName": "sports",
    "sport": "football"
  },
  "userId": "123",
  "sessionId": "session-abc-123",
  "timestamp": "2024-01-15T20:15:30.000Z",
  "platform": "android",
  "appVersion": "1.0.0",
  "deviceInfo": {
    "model": "SM-G973F",
    "os": "Android 11"
  }
}

HTTP/1.1 204 No Content
```

### 7. Screen Configuration Update
```http
PUT /api/sdui/screen/home
Content-Type: application/json

{
  "metadata": {
    "cacheTTL": 600
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
            "text": "Nova versão da Home!",
            "color": "primary"
          }
        }
      ]
    }
  ]
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "screenName": "home",
    "metadata": {
      "name": "Home Screen",
      "version": 2,
      "lastUpdated": "2024-01-15T16:20:00.000Z",
      "cacheTTL": 600
    },
    "components": [
      // Configuração atualizada
    ]
  }
}
```

### 8. A/B Testing Variant
```http
POST /api/sdui/screen/home/variant
Content-Type: application/json

{
  "variantName": "welcome_banner_test",
  "trafficSplit": 30,
  "config": {
    "components": [
      {
        "type": "Container",
        "children": [
          {
            "type": "PromotionCard",
            "props": {
              "title": "🎁 Oferta Especial!",
              "description": "Teste A/B - Banner diferente",
              "buttonText": "Aproveitar",
              "gradient": ["#16a34a", "#15803d"]
            }
          }
        ]
      }
    ]
  }
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "variantId": "variant-123",
    "variantName": "welcome_banner_test",
    "screenName": "home",
    "trafficSplit": 30,
    "active": true,
    "createdAt": "2024-01-15T16:30:00.000Z"
  }
}
```

### 9. Error Responses

#### 404 - Screen Not Found
```http
GET /api/screens/nonexistent

HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "success": false,
  "error": "Screen 'nonexistent' not found",
  "code": "SCREEN_NOT_FOUND"
}
```

#### 400 - Invalid Request
```http
GET /api/screens/profile

HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "success": false,
  "error": "userId is required for profile screen",
  "code": "MISSING_REQUIRED_PARAM",
  "details": {
    "requiredParams": ["userId"]
  }
}
```

#### 500 - Server Error
```http
GET /api/screens/home

HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "success": false,
  "error": "Internal server error while fetching screen configuration",
  "code": "INTERNAL_ERROR"
}
```

## 🔧 Configurações Específicas por Stack

### Node.js + Express
```javascript
app.get('/api/screens/home', (req, res) => {
  const { userId, segment = 'default' } = req.query;
  
  // Sua lógica aqui
  
  res.json({
    success: true,
    data: screenConfig
  });
});
```

### Python + FastAPI
```python
@app.get("/api/screens/home")
async def get_home_screen(userId: str = None, segment: str = "default"):
    # Sua lógica aqui
    return {
        "success": True,
        "data": screen_config
    }
```

### PHP + Laravel
```php
Route::get('/api/screens/home', function (Request $request) {
    $userId = $request->query('userId');
    $segment = $request->query('segment', 'default');
    
    // Sua lógica aqui
    
    return response()->json([
        'success' => true,
        'data' => $screenConfig
    ]);
});
```

### Java + Spring Boot
```java
@GetMapping("/api/screens/home")
public ResponseEntity<ApiResponse> getHomeScreen(
    @RequestParam(required = false) String userId,
    @RequestParam(defaultValue = "default") String segment
) {
    // Sua lógica aqui
    
    return ResponseEntity.ok(new ApiResponse(true, screenConfig));
}
```

## 📝 Notas de Implementação

1. **Todas as respostas devem seguir o padrão `{ success: boolean, data?: any, error?: string }`**
2. **TTL de cache deve ser configurável por tela**
3. **Personalização por usuário/segmento é essencial**
4. **Analytics deve ser fire-and-forget (não falhar a aplicação)**
5. **Suporte a A/B testing através de variantes**
6. **Logs estruturados para debugging**