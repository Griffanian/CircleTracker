import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Spacing, BorderRadius, Typography, Shadows } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface DaysSinceInnerWidgetProps {
  sobrietyStartDate: Date | null;
  show: boolean;
}

export function DaysSinceInnerWidget({
  sobrietyStartDate,
  show,
}: DaysSinceInnerWidgetProps) {
  const { theme } = useTheme();

  if (!show) {
    return null;
  }

  const getDaysSince = (): number => {
    if (!sobrietyStartDate) {
      return 0;
    }
    const now = new Date();
    const diff = now.getTime() - sobrietyStartDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const days = getDaysSince();

  const getMessage = (): string => {
    if (!sobrietyStartDate) return "Set your start date in onboarding";
    if (days === 0) return "Your journey begins today";
    if (days === 1) return "One day at a time";
    if (days < 7) return "Each day is a victory";
    if (days < 30) return "Building a strong foundation";
    if (days < 90) return "Momentum is growing";
    if (days < 365) return "Remarkable progress";
    return "Living in freedom";
  };

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
        {getMessage()}
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
