import React, { useState } from "react";
import { View, StyleSheet, Pressable, SectionList } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { EventListItem } from "@/components/EventListItem";
import { useDataStore } from "@/hooks/useDataStore";
import { Event, CircleType } from "@/stores/DataStore";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

type FilterType = "all" | CircleType;

export default function HistoryScreen() {
  const { theme } = useTheme();
  const store = useDataStore();
  const [filter, setFilter] = useState<FilterType>("all");
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  const events = store.getEvents();
  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((e) => e.circleType === filter);

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

  return (
    <ThemedView style={styles.container}>
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

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const behavior = store
            .getBehaviors()
            .find((b) => b.id === item.behaviorId);
          return (
            <View style={{ marginBottom: Spacing.sm }}>
              <EventListItem event={item} behavior={behavior} />
            </View>
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <ThemedText style={[styles.dateHeader, { color: theme.textSecondary }]}>
            {title}
          </ThemedText>
        )}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: tabBarHeight + Spacing.xl },
        ]}
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    padding: Spacing.lg,
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
  list: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
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
