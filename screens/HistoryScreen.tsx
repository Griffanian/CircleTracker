import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import { reloadAppAsync } from "expo";
import { ThemedText } from "@/components/ThemedText";
import { EventListItem } from "@/components/EventListItem";
import { ScreenSectionList } from "@/components/ScreenSectionList";
import { useDataStore } from "@/hooks/useDataStore";
import { Event, CircleType } from "@/stores/DataStore";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useRoute, RouteProp } from "@react-navigation/native";
import { MainTabParamList } from "@/navigation/MainTabNavigator";

type FilterType = "all" | CircleType;
type DaysFilterType = 7 | 30 | "all";

type EventSection = {
  title: string;
  data: Event[];
};

export default function HistoryScreen() {
  const { theme } = useTheme();
  const store = useDataStore();
  const route = useRoute<RouteProp<MainTabParamList, "HistoryTab">>();
  const [filter, setFilter] = useState<FilterType>(route.params?.circleFilter || "all");
  const [daysFilter, setDaysFilter] = useState<DaysFilterType>(route.params?.daysFilter || "all");

  useEffect(() => {
    if (route.params?.circleFilter) {
      setFilter(route.params.circleFilter);
    }
    if (route.params?.daysFilter) {
      setDaysFilter(route.params.daysFilter);
    }
  }, [route.params]);

  const handleDeleteEvent = async (eventId: string) => {
    await store.deleteEvent(eventId);
    
    // Reload the app after deletion
    if (Platform.OS === "web") {
      window.location.reload();
    } else {
      await reloadAppAsync();
    }
  };

  const events = store.getEvents();
  
  const applyFilters = (events: Event[]) => {
    let result = events;
    
    if (filter !== "all") {
      result = result.filter((e) => e.circleType === filter);
    }
    
    if (daysFilter !== "all") {
      const now = new Date();
      const cutoffDate = new Date(now.getTime() - daysFilter * 24 * 60 * 60 * 1000);
      result = result.filter((e) => new Date(e.timestamp) >= cutoffDate);
    }
    
    return result;
  };
  
  const filteredEvents = applyFilters(events);

  const groupEventsByDate = (events: Event[]) => {
    const groups: { [key: string]: Event[] } = {};
    events.forEach((event) => {
      const dateKey = new Date(event.timestamp).toLocaleDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(event);
    });

    return Object.entries(groups).map(([date, events]) => ({
      title: date,
      data: events,
    }));
  };

  const sections = groupEventsByDate(filteredEvents);

  const filters: { type: FilterType; label: string }[] = [
    { type: "all", label: "All" },
    { type: "inner", label: "Inner" },
    { type: "middle", label: "Middle" },
    { type: "outer", label: "Outer" },
  ];

  const daysFilters: { type: DaysFilterType; label: string }[] = [
    { type: "all", label: "All Time" },
    { type: 7, label: "Last 7 Days" },
    { type: 30, label: "Last 30 Days" },
  ];

  const renderHeader = () => (
    <>
      <View style={styles.filterContainer}>
        {filters.map((f) => (
          <Pressable
            key={f.type}
            onPress={() => setFilter(f.type)}
            style={({ pressed }) => [
              styles.filterButton,
              {
                backgroundColor:
                  filter === f.type
                    ? theme.primary
                    : theme.backgroundSecondary,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <ThemedText
              style={[
                styles.filterText,
                {
                  color: filter === f.type ? "#FFFFFF" : theme.text,
                },
              ]}
            >
              {f.label}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      <View style={styles.filterContainer}>
        {daysFilters.map((f) => (
          <Pressable
            key={f.type}
            onPress={() => setDaysFilter(f.type)}
            style={({ pressed }) => [
              styles.filterButton,
              {
                backgroundColor:
                  daysFilter === f.type
                    ? theme.primary
                    : theme.backgroundSecondary,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <ThemedText
              style={[
                styles.filterText,
                {
                  color: daysFilter === f.type ? "#FFFFFF" : theme.text,
                },
              ]}
            >
              {f.label}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </>
  );

  return (
    <ScreenSectionList<Event, EventSection>
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const behavior = store
          .getBehaviors()
          .find((b) => b.id === item.behaviorId);
        return (
          <View style={{ marginBottom: Spacing.sm }}>
            <EventListItem event={item} behavior={behavior} onDelete={handleDeleteEvent} />
          </View>
        );
      }}
      renderSectionHeader={({ section }) => (
        <ThemedText style={[styles.dateHeader, { color: theme.textSecondary }]}>
          {section.title}
        </ThemedText>
      )}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <ThemedText
            style={[styles.emptyText, { color: theme.textSecondary }]}
          >
            No events logged yet
          </ThemedText>
          <ThemedText
            style={[styles.emptyHint, { color: theme.textSecondary }]}
          >
            Start logging your behaviors from the Home screen
          </ThemedText>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  filterButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  emptyState: {
    padding: Spacing.xl,
    alignItems: "center",
    marginTop: Spacing.xl,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  emptyHint: {
    fontSize: 14,
    marginTop: Spacing.sm,
    textAlign: "center",
  },
});
