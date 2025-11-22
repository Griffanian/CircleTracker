import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Event } from "@/stores/DataStore";
import { Spacing, BorderRadius, Typography, Shadows } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface DaysSinceInnerWidgetProps {
  lastInnerEvent: Event | null;
  show: boolean;
}

export function DaysSinceInnerWidget({
  lastInnerEvent,
  show,
}: DaysSinceInnerWidgetProps) {
  const { theme } = useTheme();

  if (!show) {
    return null;
  }

  const getDaysSince = (): number => {
    if (!lastInnerEvent) {
      return 0;
    }
    const now = new Date();
    const diff = now.getTime() - lastInnerEvent.timestamp.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const days = getDaysSince();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.backgroundDefault },
        Shadows.card,
      ]}
    >
      <ThemedText style={[styles.label, { color: theme.textSecondary }]}>
        Days Since Inner Circle
      </ThemedText>
      <ThemedText style={[styles.count, { color: theme.success }]}>
        {days}
      </ThemedText>
      <ThemedText style={[styles.sublabel, { color: theme.textSecondary }]}>
        {days === 0 && "Just started"}
        {days === 1 && "Keep it up!"}
        {days > 1 && days < 7 && "Building momentum"}
        {days >= 7 && days < 30 && "Strong progress"}
        {days >= 30 && "Incredible work!"}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
  },
  label: {
    ...Typography.small,
    marginBottom: Spacing.sm,
  },
  count: {
    ...Typography.h1,
    fontSize: 64,
    fontWeight: "700",
  },
  sublabel: {
    ...Typography.body,
    marginTop: Spacing.sm,
  },
});
