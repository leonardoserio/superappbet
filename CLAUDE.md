# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SuperAppBet is a React Native application with a **Server-Driven UI (SDUI)** architecture and **Micro Frontend** pattern, designed as a betting/gambling super app. The architecture supports dynamic UI rendering, modular feature development, and real-time updates.

## Development Commands

### Core Development
- `npm start` - Start Metro bundler (JavaScript build tool)
- `npm run android` - Build and run Android app
- `npm run ios` - Build and run iOS app

### Code Quality
- `npm run lint` - Run ESLint for code linting
- `npm test` - Run Jest tests

### iOS Dependencies
Before running iOS for the first time or after updating native dependencies:
- `bundle install` - Install Ruby gems (first time only)
- `bundle exec pod install` - Install CocoaPods dependencies

## Architecture

### Server-Driven UI + Micro Frontend Architecture

The project follows a sophisticated architecture with the following key patterns:

- **Server-Driven UI**: Components are dynamically rendered based on server configuration
- **Micro Frontend Architecture**: Features are organized as independent, self-contained modules
- **Design System**: Centralized theming with design tokens and theme providers
- **Service-Oriented Architecture**: Business logic separated into dedicated services

### Project Structure

```
src/
├── App.tsx                     # Main application entry point
├── components/                 # Reusable UI components
│   ├── native/                # Native React Native components
│   ├── server-driven/         # Dynamic SDUI components (Container, Text, Button, BetSlip)
│   └── shared/                # Cross-platform shared components
├── design-system/             # Complete design token system
│   ├── providers/             # ThemeProvider for theme management
│   ├── themes/                # Light/dark theme definitions
│   └── tokens/                # Design tokens (colors, typography, spacing)
├── hooks/                     # Custom React hooks (useAuth, useAsyncState)
├── modules/                   # Micro frontend modules
│   ├── betting/               # Sports betting functionality
│   ├── casino/                # Casino games
│   ├── core/                  # Base micro frontend architecture
│   ├── lottery/               # Lottery functionality
│   ├── payments/              # Payment processing
│   └── sports/                # Sports-specific features
├── navigation/                # Navigation types and configuration
├── screens/                   # Screen components (HomeScreen)
├── services/                  # Business logic services
│   ├── api/                   # API communication (ApiService)
│   ├── auth/                  # Authentication (AuthService)
│   ├── server-driven/         # SDUI core services (ComponentRegistry, ActionHandler)
│   └── storage/               # Local storage management (StorageService)
├── types/                     # TypeScript type definitions
└── utils/                     # Utility functions (formatters, validators)
```

## Path Aliases

The project uses TypeScript path mapping and Babel module resolver for clean imports:

- `@/*` - Maps to `src/*`
- `@/components/*` - Maps to `src/components/*`
- `@/design-system/*` - Maps to `src/design-system/*`
- `@/hooks/*` - Maps to `src/hooks/*`
- `@/modules/*` - Maps to `src/modules/*`
- `@/navigation/*` - Maps to `src/navigation/*`
- `@/screens/*` - Maps to `src/screens/*`
- `@/services/*` - Maps to `src/services/*`
- `@/types/*` - Maps to `src/types/*`
- `@/utils/*` - Maps to `src/utils/*`

## Key Components and Services

### Design System
- **Tokens**: Colors, typography, spacing defined as design tokens
- **Themes**: Light and dark themes with betting-specific color palette
- **ThemeProvider**: React Context for theme management with system theme detection

### Server-Driven UI Components
- **Container**: Layout component with variants (default, card, section)
- **Text**: Typography component with semantic variants
- **Button**: Interactive elements with multiple variants and action handling
- **BetSlip**: Advanced betting selection management component

### Core Services
- **ApiService**: HTTP client with authentication and error handling
- **AuthService**: Authentication state management with token handling
- **StorageService**: Local storage wrapper with TTL and encryption options
- **ComponentRegistry**: Dynamic component registration for SDUI
- **ActionHandler**: Action processing system for SDUI interactions

### Micro Frontend System
- **MicroFrontend**: Abstract base class for modules
- **ModuleRegistry**: Module registration and lifecycle management
- **BettingModule**: Example betting functionality module
- **CasinoModule**: Example casino functionality module

## Development Environment

- Node.js >= 18 required
- React Native 0.80.0 with React 19.1.0
- TypeScript 5.0.4 with strict type checking
- Babel with module resolver for path aliases
- ESLint for code linting
- Jest for testing with React Test Renderer
- AsyncStorage for local data persistence

## Naming Conventions

- **PascalCase**: Components, interfaces, types, classes
- **camelCase**: Variables, functions, properties, methods
- **kebab-case**: File names (except components), SDUI component types
- **SCREAMING_SNAKE_CASE**: Constants and environment variables

## Key Development Patterns

1. **All imports use path aliases** - Use `@/` prefixes instead of relative paths
2. **Theme-aware components** - Use `useTheme()` hook for consistent styling
3. **Modular architecture** - Each feature should be a self-contained module
4. **Server-driven components** - Use ComponentRegistry for dynamic component rendering
5. **Type safety** - All components and services are fully typed with TypeScript

## Testing

The project uses Jest with React Test Renderer. Test files are located in `__tests__/` directory. All new components and services should include corresponding test files.