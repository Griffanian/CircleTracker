import AsyncStorage from '@react-native-async-storage/async-storage';

export type CircleType = "inner" | "middle" | "outer";

export interface Behavior {
  id: string;
  circleType: CircleType;
  name: string;
  description?: string;
}

export interface Event {
  id: string;
  behaviorId: string;
  circleType: CircleType;
  timestamp: Date;
  note?: string;
}

export interface UserPreferences {
  showDaysSinceInner: boolean;
  hasCompletedOnboarding: boolean;
  sobrietyStartDate: Date | null;
}

const STORAGE_KEYS = {
  BEHAVIORS: '@circles/behaviors',
  EVENTS: '@circles/events',
  PREFERENCES: '@circles/preferences',
};

class DataStore {
  private behaviors: Behavior[] = [];
  private events: Event[] = [];
  private preferences: UserPreferences = {
    showDaysSinceInner: true,
    hasCompletedOnboarding: false,
    sobrietyStartDate: null,
  };
  private listeners: Set<() => void> = new Set();
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      await this.loadFromStorage();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize DataStore:', error);
    }
  }

  private async loadFromStorage() {
    try {
      const [behaviorsJson, eventsJson, preferencesJson] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.BEHAVIORS),
        AsyncStorage.getItem(STORAGE_KEYS.EVENTS),
        AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES),
      ]);

      if (behaviorsJson) {
        this.behaviors = JSON.parse(behaviorsJson);
      }

      if (eventsJson) {
        const parsedEvents = JSON.parse(eventsJson);
        this.events = parsedEvents.map((e: Event) => ({
          ...e,
          timestamp: new Date(e.timestamp),
        }));
      }

      if (preferencesJson) {
        const parsedPrefs = JSON.parse(preferencesJson);
        this.preferences = {
          ...parsedPrefs,
          sobrietyStartDate: parsedPrefs.sobrietyStartDate 
            ? new Date(parsedPrefs.sobrietyStartDate) 
            : null,
        };
      }
    } catch (error) {
      console.error('Failed to load data from storage:', error);
    }
  }

  private async saveToStorage() {
    if (!this.isInitialized) return;

    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.BEHAVIORS, JSON.stringify(this.behaviors)),
        AsyncStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(this.events)),
        AsyncStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(this.preferences)),
      ]);
    } catch (error) {
      console.error('Failed to save data to storage:', error);
    }
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private async notifyListeners() {
    this.listeners.forEach((listener) => listener());
    await this.saveToStorage();
  }

  getBehaviors(circleType?: CircleType): Behavior[] {
    if (circleType) {
      return this.behaviors.filter((b) => b.circleType === circleType);
    }
    return this.behaviors;
  }

  async addBehavior(behavior: Omit<Behavior, "id">): Promise<Behavior> {
    const newBehavior: Behavior = {
      ...behavior,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    this.behaviors.push(newBehavior);
    await this.notifyListeners();
    return newBehavior;
  }

  async deleteBehavior(id: string) {
    this.behaviors = this.behaviors.filter((b) => b.id !== id);
    await this.notifyListeners();
  }

  getEvents(): Event[] {
    return [...this.events].sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  async addEvent(event: Omit<Event, "id" | "timestamp">): Promise<Event> {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    this.events.push(newEvent);
    
    // If this is an inner circle event, reset the sobriety start date
    if (event.circleType === "inner") {
      this.preferences.sobrietyStartDate = new Date();
    }
    
    await this.notifyListeners();
    return newEvent;
  }

  getPreferences(): UserPreferences {
    return { ...this.preferences };
  }

  async updatePreferences(updates: Partial<UserPreferences>) {
    this.preferences = { ...this.preferences, ...updates };
    await this.notifyListeners();
  }

  getLastInnerEvent(): Event | null {
    const innerEvents = this.events
      .filter((e) => e.circleType === "inner")
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    return innerEvents[0] || null;
  }

  getEventsByCircle(circleType: CircleType): Event[] {
    return this.events
      .filter((e) => e.circleType === circleType)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  getTodayEventCounts(): { inner: number; middle: number; outer: number } {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayEvents = this.events.filter(
      (e) => e.timestamp.getTime() >= today.getTime()
    );

    return {
      inner: todayEvents.filter((e) => e.circleType === "inner").length,
      middle: todayEvents.filter((e) => e.circleType === "middle").length,
      outer: todayEvents.filter((e) => e.circleType === "outer").length,
    };
  }

  getEventCountsForPeriod(days: number): {
    inner: number;
    middle: number;
    outer: number;
  } {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const periodEvents = this.events.filter(
      (e) => e.timestamp.getTime() >= cutoffDate.getTime()
    );

    return {
      inner: periodEvents.filter((e) => e.circleType === "inner").length,
      middle: periodEvents.filter((e) => e.circleType === "middle").length,
      outer: periodEvents.filter((e) => e.circleType === "outer").length,
    };
  }
}

export const dataStore = new DataStore();
