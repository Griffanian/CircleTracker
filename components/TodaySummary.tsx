import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CircleBadge } from "@/components/CircleBadge";
import { CircleType } from "@/stores/DataStore";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface TodaySummaryProps {
  counts: {
    inner: number;
    middle: number;
    outer: number;
  };
  onCirclePress?: (circleType: CircleType) => void;
}

export function TodaySummary({ counts, onCirclePress }: TodaySummaryProps) {
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
        <Pressable
          style={({ pressed }) => [
            styles.stat,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => onCirclePress?.("inner")}
        >
          <CircleBadge circleType="inner" size={20} />
          <ThemedText style={styles.count}>{counts.inner}</ThemedText>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.stat,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => onCirclePress?.("middle")}
        >
          <CircleBadge circleType="middle" size={20} />
          <ThemedText style={styles.count}>{counts.middle}</ThemedText>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.stat,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => onCirclePress?.("outer")}
        >
          <CircleBadge circleType="outer" size={20} />
          <ThemedText style={styles.count}>{counts.outer}</ThemedText>
        </Pressable>
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
