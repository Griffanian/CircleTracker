import React from "react";
import { View, StyleSheet } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { CircleSummaryStats } from "@/components/CircleSummaryStats";
import { ThemedText } from "@/components/ThemedText";
import { useDataStore } from "@/hooks/useDataStore";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

export default function TrackerScreen() {
  const { theme } = useTheme();
  const store = useDataStore();

  const counts7Days = store.getEventCountsForPeriod(7);
  const counts30Days = store.getEventCountsForPeriod(30);

  return (
    <ScreenScrollView>
      <View style={styles.container}>
        <ThemedText style={styles.title}>Your Progress</ThemedText>
        <ThemedText style={[styles.description, { color: theme.textSecondary }]}>
          Track your behaviors across different circles over time
        </ThemedText>

        <View style={styles.stats}>
          <CircleSummaryStats
            circleType="inner"
            count7Days={counts7Days.inner}
            count30Days={counts30Days.inner}
          />
          <CircleSummaryStats
            circleType="middle"
            count7Days={counts7Days.middle}
            count30Days={counts30Days.middle}
          />
          <CircleSummaryStats
            circleType="outer"
            count7Days={counts7Days.outer}
            count30Days={counts30Days.outer}
          />
        </View>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: 16,
    marginBottom: Spacing.xl,
  },
  stats: {
    gap: Spacing.md,
  },
});
