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

  const getTimeDisplay = (): { primary: string; secondary: string } => {
    if (!sobrietyStartDate) {
      return { primary: "0", secondary: "days" };
    }

    const now = new Date();
    const start = sobrietyStartDate;

    // Calculate how many complete years have passed
    let years = now.getFullYear() - start.getFullYear();
    
    // Create a date that represents the anniversary of the start date in the current year
    const thisYearAnniversary = new Date(start);
    thisYearAnniversary.setFullYear(now.getFullYear());
    
    // If we haven't reached this year's anniversary yet, subtract one year
    if (now < thisYearAnniversary) {
      years--;
    }

    // If we have at least one year, calculate days since last anniversary
    if (years > 0) {
      const lastAnniversary = new Date(start);
      lastAnniversary.setFullYear(start.getFullYear() + years);
      const daysAfterYears = Math.floor(
        (now.getTime() - lastAnniversary.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      const yearText = years === 1 ? "year" : "years";
      if (daysAfterYears === 0) {
        return { primary: years.toString(), secondary: yearText };
      }
      const dayText = daysAfterYears === 1 ? "day" : "days";
      return {
        primary: years.toString(),
        secondary: `${yearText} and ${daysAfterYears} ${dayText}`,
      };
    }

    // Less than a year - count months
    let months = 0;
    const tempDate = new Date(start);
    
    // Count how many complete months fit
    while (true) {
      const nextMonth = new Date(tempDate);
      const targetMonth = nextMonth.getMonth() + 1;
      const targetYear = targetMonth > 11 ? nextMonth.getFullYear() + 1 : nextMonth.getFullYear();
      const normalizedMonth = targetMonth > 11 ? 0 : targetMonth;
      
      // Get the last day of the target month
      const lastDayOfTargetMonth = new Date(targetYear, normalizedMonth + 1, 0).getDate();
      
      // Clamp the day to the last valid day of the target month
      const clampedDay = Math.min(tempDate.getDate(), lastDayOfTargetMonth);
      
      nextMonth.setFullYear(targetYear);
      nextMonth.setMonth(normalizedMonth);
      nextMonth.setDate(clampedDay);
      
      if (nextMonth > now) break;
      months++;
      tempDate.setTime(nextMonth.getTime());
    }

    if (months > 0) {
      // Calculate remaining days from the last complete month (using the clamped tempDate)
      const remainingDays = Math.floor(
        (now.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      const monthText = months === 1 ? "month" : "months";
      if (remainingDays === 0) {
        return { primary: months.toString(), secondary: monthText };
      }
      const dayText = remainingDays === 1 ? "day" : "days";
      return {
        primary: months.toString(),
        secondary: `${monthText} and ${remainingDays} ${dayText}`,
      };
    }

    // Less than a month - just show days
    const totalDays = days;
    const dayText = totalDays === 1 ? "day" : "days";
    return { primary: totalDays.toString(), secondary: dayText };
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
      <ThemedText style={[styles.count, { color: theme.success }]}>
        {timeDisplay.primary}
      </ThemedText>
      <ThemedText style={[styles.timeUnit, { color: theme.textSecondary }]}>
        {timeDisplay.secondary}
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
  timeUnit: {
    ...Typography.body,
    fontSize: 18,
    fontWeight: "500",
    marginTop: Spacing.xs,
  },
  sublabel: {
    ...Typography.body,
    marginTop: Spacing.md,
  },
});
