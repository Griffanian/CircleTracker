import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CircleBadge } from "@/components/CircleBadge";
import { CircleType } from "@/stores/DataStore";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface CircleSummaryStatsProps {
  circleType: CircleType;
  count7Days: number;
  count30Days: number;
}

export function CircleSummaryStats({
  circleType,
  count7Days,
  count30Days,
}: CircleSummaryStatsProps) {
  const { theme } = useTheme();

  const getCircleLabel = () => {
    return circleType.charAt(0).toUpperCase() + circleType.slice(1);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.backgroundDefault },
        Shadows.card,
      ]}
    >
      <View style={styles.header}>
        <CircleBadge circleType={circleType} size={32} />
        <ThemedText style={styles.title}>{getCircleLabel()} Circle</ThemedText>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <ThemedText style={styles.count}>{count7Days}</ThemedText>
          <ThemedText style={[styles.label, { color: theme.textSecondary }]}>
            Last 7 days
          </ThemedText>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <View style={styles.stat}>
          <ThemedText style={styles.count}>{count30Days}</ThemedText>
          <ThemedText style={[styles.label, { color: theme.textSecondary }]}>
            Last 30 days
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: Spacing.md,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  count: {
    fontSize: 32,
    fontWeight: "700",
  },
  label: {
    fontSize: 14,
    marginTop: Spacing.xs,
  },
  divider: {
    width: 1,
    marginHorizontal: Spacing.lg,
  },
});
