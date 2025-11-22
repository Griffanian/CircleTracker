# Behavioral Tracking App - Design Guidelines

## Authentication Architecture
**Auth Required**: App includes user accounts for data persistence and potential sync.

**Implementation**:
- Use SSO authentication (Replit Auth supporting Google, GitHub, Apple, email/password)
- Login screen with SSO buttons and privacy policy/terms links
- Account management in Settings screen with logout and delete account options
- Mock auth flow in prototype using local state

## Navigation Structure
**Root Navigation**: Bottom Tab Bar (4 tabs)
- **Home** (house icon): Quick logging and daily snapshot
- **Tracker** (bar-chart icon): Statistics and trends
- **History** (clock icon): Chronological event log
- **Settings** (settings icon): Preferences and circle management

**Initial Flow**: First-time users see OnboardingCirclesScreen (modal stack) before accessing main tabs.

## Screen Specifications

### OnboardingCirclesScreen
**Purpose**: First-time setup where users define behaviors for each circle.

**Layout**:
- Custom header with progress indicator (1/3, 2/3, 3/3) and "Skip" button (right)
- Scrollable form containing three CircleBehaviorEditor sections (Inner, Middle, Outer)
- Fixed footer with "Back" and "Next"/"Finish" buttons
- Safe area insets: top = insets.top + Spacing.xl, bottom = insets.bottom + Spacing.xl

**Components**:
- Three CircleBehaviorEditor sections (collapsible accordions)
- Text input with "Add" button for each circle
- Behavior list items with delete icons
- Navigation buttons (Back/Next/Finish)

### HomeScreen
**Purpose**: Dashboard for quick logging and daily overview.

**Layout**:
- Transparent header with app title
- Scrollable content:
  - DaysSinceInnerWidget (large, prominent card at top)
  - QuickCircleLogButtons (three equal-width buttons)
  - TodaySummary (compact stats row)
- Safe area insets: top = headerHeight + Spacing.xl, bottom = tabBarHeight + Spacing.xl

**Components**:
- Large counter card (optional, based on user preference)
- Three circle log buttons with icons (Inner/Middle/Outer)
- Today's summary stats card
- All cards use subtle shadows (shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.10, shadowRadius: 2)

### LogEventModal
**Purpose**: Capture event details when logging behavior.

**Layout**:
- Native modal presentation (iOS card style)
- Custom header with "Cancel" (left) and "Save" (right)
- Scrollable form:
  - Circle type indicator (non-editable, color-coded)
  - Behavior picker (dropdown/list)
  - Optional note field (expandable text area)
- Safe area insets: top = headerHeight + Spacing.xl, bottom = insets.bottom + Spacing.xl

**Components**:
- Circle badge showing current circle type
- Searchable behavior picker
- Multi-line text input for notes
- Save button (enabled only when behavior selected)

### HistoryScreen
**Purpose**: Chronological log of all events.

**Layout**:
- Default header with title "History"
- Filter bar (horizontal scrollable pills: All, Inner, Middle, Outer)
- Scrollable list grouped by date
- Safe area insets: top = Spacing.xl, bottom = tabBarHeight + Spacing.xl

**Components**:
- Horizontal filter pills (pill-shaped buttons)
- Date section headers (sticky)
- Event list items showing time, circle badge, behavior name, note icon
- Empty state: "No events logged yet" with encouragement message

### TrackerScreen
**Purpose**: Statistics and behavioral trends.

**Layout**:
- Default header with title "Tracker"
- Scrollable content:
  - CircleSummaryStats cards (7-day and 30-day views)
  - TopBehaviorsList per circle
- Safe area insets: top = Spacing.xl, bottom = tabBarHeight + Spacing.xl

**Components**:
- Summary stat cards with circle color accents
- Simple bar charts or number displays
- Top behaviors list with frequency counts
- Period toggle (7 days / 30 days)

### SettingsScreen
**Purpose**: App preferences and circle management.

**Layout**:
- Default header with title "Settings"
- Scrollable form with grouped sections:
  - Display Preferences
  - Circles Management
  - Account
- Safe area insets: top = Spacing.xl, bottom = tabBarHeight + Spacing.xl

**Components**:
- Toggle switch for "Show Days Since Inner"
- "Edit Circles" button → navigates to OnboardingCirclesScreen (edit mode)
- Account section with logout and delete account buttons
- Confirmation alerts for destructive actions

## Design System

### Color Palette
**Core Colors**:
- **Inner Circle**: #E63946 (red - represents inner/red-line behaviors)
- **Middle Circle**: #F4A261 (orange - represents middle/amber behaviors)
- **Outer Circle**: #2A9D8F (teal - represents outer/healthy behaviors)
- **Primary**: #264653 (dark slate - for primary text and headers)
- **Background**: #F8F9FA (light gray - main background)
- **Surface**: #FFFFFF (white - cards and surfaces)
- **Text Primary**: #2B2D42 (dark blue-gray)
- **Text Secondary**: #8D99AE (medium gray)
- **Success**: #06D6A0 (green - for milestones)
- **Border**: #E5E7EB (light border)

### Typography
- **Header Large**: 28pt, Bold, Primary color
- **Header Medium**: 20pt, Semibold, Primary color
- **Body**: 16pt, Regular, Text Primary
- **Caption**: 14pt, Regular, Text Secondary
- **Button**: 16pt, Semibold, White or Primary

### Component Styles
**Cards**:
- Background: Surface white
- Border radius: 12px
- Padding: Spacing.lg
- Shadow: shadowOffset {width: 0, height: 2}, shadowOpacity: 0.10, shadowRadius: 2

**Buttons**:
- Primary: Circle-specific color background, white text, 12px radius
- Secondary: Border with circle color, circle-colored text, 12px radius
- Minimum tap target: 44x44pt
- Pressed state: 90% opacity

**Circle Badges**:
- Small circular indicators (24x24pt) with circle color
- First letter of circle name in white
- Used throughout for visual consistency

**Floating Action Buttons** (if needed):
- 56x56pt circular button
- Circle color background with white icon
- Shadow: shadowOffset {width: 0, height: 2}, shadowOpacity: 0.10, shadowRadius: 2

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- xxl: 32px

## Visual Design & Interactions

### Icons
- Use Feather icons from @expo/vector-icons
- Home: "home"
- Tracker: "bar-chart-2"
- History: "clock"
- Settings: "settings"
- Add: "plus-circle"
- Delete: "trash-2"
- Edit: "edit-2"
- Note: "file-text"

### Accessibility
- All interactive elements have minimum 44x44pt tap targets
- Circle colors have sufficient contrast with white text (WCAG AA)
- Support for dynamic type sizes
- Semantic labels for screen readers
- Clear visual feedback on all interactions

### Assets Required
**Critical Assets**:
1. **Circle Icons**: Three simple, abstract circle graphics representing inner (red), middle (orange), outer (teal) - minimalist style, 48x48pt
2. **Empty State Illustrations**: Supportive, non-judgmental illustration for empty history/tracker screens - calming aesthetic
3. **Onboarding Illustration**: Simple diagram showing three concentric circles with brief labels - educational, not clinical

**Avatar System** (for profile/account):
- Generate 4 preset avatars with calm, supportive aesthetic
- Abstract geometric patterns in muted tones
- No emojis or overly playful imagery (app serves serious purpose)

### Tone & Messaging
- **Supportive, not punitive**: Celebrate progress, don't shame setbacks
- **Clear, simple language**: Avoid clinical jargon
- **Encouraging empty states**: "You're building new habits" vs. "No data"
- **Milestone celebrations**: Special UI when reaching 7, 30, 90, 365 days