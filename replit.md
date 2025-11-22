# Overview

Circles is a React Native behavioral tracking application built with Expo. It helps users monitor and categorize behaviors across three concentric circles: Inner (harmful behaviors to avoid), Middle (risky behaviors to monitor), and Outer (positive behaviors to encourage). The app provides quick logging, statistics tracking, a "Days Since Inner Circle" counter that tracks sobriety duration, and a chronological history of events.

The application uses a mobile-first design with tab-based navigation and supports iOS, Android, and web platforms. It includes onboarding flows for first-time users, sobriety start date selection (with calendar picker on web, native date picker on mobile), and customizable behavior tracking per circle type.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React Native with Expo (SDK 54)
- **New Architecture**: Enabled (`newArchEnabled: true`)
- **React Compiler**: Experimental feature enabled
- **Platform Support**: iOS, Android, Web (single-page output)

**Navigation Pattern**: Nested navigation with two levels
- **Root Level**: Bottom tab navigator with 4 tabs (Home, Tracker, History, Settings)
- **Stack Level**: Native stack navigator for Home tab to support modals and onboarding flows
- **State Management**: React Navigation for route-based state

**UI/UX Design Decisions**:
- **Theme System**: Custom light/dark mode support with semantic color tokens
- **Glass Morphism**: iOS platform uses `BlurView` for tab bar with transparent background; Android uses solid colors
- **Gesture Handling**: React Native Gesture Handler for smooth interactions with spring animations via Reanimated
- **Keyboard Management**: Platform-specific keyboard handling (native on mobile, fallback on web)
- **Safe Areas**: Comprehensive safe area inset handling for notched devices

**Component Architecture**:
- **Themed Components**: `ThemedText` and `ThemedView` provide automatic color scheme adaptation
- **Animated Components**: Spring-based animations using Reanimated v4 for buttons and interactive elements
- **Reusable Patterns**: Consistent spacing, border radius, typography, and shadow definitions through theme constants
- **Screen Wrappers**: `ScreenScrollView`, `ScreenKeyboardAwareScrollView`, and `ScreenFlatList` components automatically handle safe area insets and navigation heights

**Design System**:
- **Color Palette**: Three circle-specific colors (Inner: #E63946, Middle: #F4A261, Outer: #2A9D8F) with semantic naming
- **Spacing Scale**: Consistent spacing tokens (xl, lg, md, sm, xs)
- **Typography**: Type scale with h1-h4 headings, body, small, and link variants
- **Elevation System**: Three-level elevation with different background colors per level

## State Management

**Architecture**: Simple observable store pattern without external dependencies
- **Rationale**: For this app's scope, a lightweight custom store avoids Redux/MobX complexity
- **Implementation**: Single `DataStore` class with subscription-based updates
- **Hook Integration**: `useDataStore` hook provides reactive updates through force re-renders
- **Pros**: No external dependencies, simple debugging, minimal boilerplate
- **Cons**: Doesn't scale to complex state trees, manual subscription management

**Data Model**:
- **Behaviors**: User-defined actions categorized by circle type with optional descriptions
- **Events**: Timestamped logs linking to behaviors with optional notes
- **Preferences**: User settings for UI customization, onboarding state, and sobriety start date
  - `sobrietyStartDate: Date | null` - Tracks when user started their sobriety journey
  - `hasCompletedOnboarding: boolean` - Flags first-time user flow completion
  - `showDaysSinceInner: boolean` - Controls Days Since Inner widget visibility
- **Storage**: Currently in-memory only (no persistence implemented yet)

**Future Considerations**: AsyncStorage for local persistence, potential cloud sync if authentication is added

## Module Organization

**Path Aliases**: `@/` alias configured via Babel module resolver for cleaner imports
- **Rationale**: Avoids deep relative paths (`../../../components`) and makes refactoring easier
- **Configuration**: Defined in `babel.config.js` and `tsconfig.json` for IDE support

**Directory Structure**:
```
/components     - Reusable UI components
/screens        - Full-screen views
/navigation     - Navigation configuration
/hooks          - Custom React hooks
/stores         - State management
/constants      - Theme and design tokens
/scripts        - Build and deployment utilities
```

## Error Handling

**Error Boundaries**: Class-based error boundary wraps entire app
- **Development Mode**: Shows detailed error stack traces in modal overlay
- **Production Mode**: Provides app restart capability with user-friendly message
- **Rationale**: React requires class components for error boundaries; provides crash recovery

## Platform-Specific Considerations

**iOS Specific**:
- Supports tablets (`supportsTablet: true`)
- Tab bar uses blur effect for native feel
- Liquid glass effects conditionally enabled if available

**Android Specific**:
- Edge-to-edge display enabled
- Predictive back gesture disabled (false) to maintain custom navigation
- Adaptive icons with background, foreground, and monochrome variants

**Web Specific**:
- Single-page application output
- Keyboard-aware scroll view falls back to standard ScrollView
- Hydration-safe color scheme detection

# External Dependencies

## Core Framework
- **Expo SDK 54**: Provides managed workflow, build system, and cross-platform APIs
- **React 19.1**: Latest React with compiler support
- **React Native 0.81**: Native rendering engine

## Navigation
- **React Navigation 7**: Stack and tab navigation with native animations
- **Expo Router**: Not used; manually configured navigation stacks

## UI Libraries
- **Expo Vector Icons**: Icon library using Feather icons primarily
- **React Native Reanimated 4**: High-performance animations
- **React Native Gesture Handler**: Touch and gesture recognition
- **Expo Blur**: Platform-native blur effects for iOS
- **@react-native-community/datetimepicker**: Native date picker for iOS/Android (not supported on web)

## Platform Utilities
- **React Native Safe Area Context**: Handles device-specific safe areas
- **React Native Keyboard Controller**: Advanced keyboard interaction handling
- **Expo Haptics**: Tactile feedback support
- **Expo System UI**: Status bar and system UI customization

## Development Tools
- **TypeScript 5.9**: Static type checking with strict mode enabled
- **ESLint**: Code linting with Expo config and Prettier integration
- **Babel**: Module resolution and React Native transformation

## Potential Future Dependencies
- **AsyncStorage**: For local data persistence (not yet implemented)
- **Database**: May add database support (design guidelines mention Drizzle compatibility, though not currently used)
- **Authentication**: Design mentions Replit Auth for SSO (not yet implemented)
- **Analytics**: No analytics currently integrated