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

class DataStore {
  private behaviors: Behavior[] = [];
  private events: Event[] = [];
  private preferences: UserPreferences = {
    showDaysSinceInner: true,
    hasCompletedOnboarding: false,
    sobrietyStartDate: null,
  };
  private listeners: Set<() => void> = new Set();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  getBehaviors(circleType?: CircleType): Behavior[] {
    if (circleType) {
      return this.behaviors.filter((b) => b.circleType === circleType);
    }
    return this.behaviors;
  }

  addBehavior(behavior: Omit<Behavior, "id">): Behavior {
    const newBehavior: Behavior = {
      ...behavior,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    this.behaviors.push(newBehavior);
    this.notifyListeners();
    return newBehavior;
  }

  deleteBehavior(id: string) {
    this.behaviors = this.behaviors.filter((b) => b.id !== id);
    this.notifyListeners();
  }

  getEvents(): Event[] {
    return [...this.events].sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  addEvent(event: Omit<Event, "id" | "timestamp">): Event {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    this.events.push(newEvent);
    this.notifyListeners();
    return newEvent;
  }

  getPreferences(): UserPreferences {
    return { ...this.preferences };
  }

  updatePreferences(updates: Partial<UserPreferences>) {
    this.preferences = { ...this.preferences, ...updates };
    this.notifyListeners();
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
