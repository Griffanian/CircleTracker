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

  const getTimeDisplay = (): string => {
    if (!sobrietyStartDate) {
      return "0d";
    }

    const now = new Date();
    const start = sobrietyStartDate;

    // Calculate year/month/day differences
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      // Get days in the previous month
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    // Build the compact display string
    const parts = [];
    if (years > 0) parts.push(`${years}y`);
    if (months > 0) parts.push(`${months}m`);
    if (days > 0 || parts.length === 0) parts.push(`${days}d`);

    return parts.join(" ");
  };

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

  const timeDisplay = getTimeDisplay();

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
      <ThemedText style={[styles.compactTime, { color: theme.success }]}>
        {timeDisplay}
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
  compactTime: {
    ...Typography.h1,
    fontSize: 48,
    fontWeight: "700",
    letterSpacing: 2,
  },
  sublabel: {
    ...Typography.body,
    marginTop: Spacing.md,
  },
});
