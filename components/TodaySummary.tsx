import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CircleBadge } from "@/components/CircleBadge";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface TodaySummaryProps {
  counts: {
    inner: number;
    middle: number;
    outer: number;
  };
}

export function TodaySummary({ counts }: TodaySummaryProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.backgroundDefault },
        Shadows.card,
      ]}
    >
      <ThemedText style={[styles.title, { color: theme.textSecondary }]}>
        Today's Activity
      </ThemedText>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <CircleBadge circleType="inner" size={20} />
          <ThemedText style={styles.count}>{counts.inner}</ThemedText>
        </View>
        <View style={styles.stat}>
          <CircleBadge circleType="middle" size={20} />
          <ThemedText style={styles.count}>{counts.middle}</ThemedText>
        </View>
        <View style={styles.stat}>
          <CircleBadge circleType="outer" size={20} />
          <ThemedText style={styles.count}>{counts.outer}</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: Spacing.md,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  count: {
    fontSize: 18,
    fontWeight: "600",
  },
});
