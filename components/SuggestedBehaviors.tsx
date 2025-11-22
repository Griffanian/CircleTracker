import React from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CircleType } from "@/stores/DataStore";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface SuggestedBehaviorsProps {
  circleType: CircleType;
  onSelect: (behaviorName: string) => void;
}

const SUGGESTIONS: Record<CircleType, string[]> = {
  inner: [
    "Using substances",
    "Acting out sexually",
    "Gambling",
    "Lying",
    "Stealing",
    "Physical violence",
  ],
  middle: [
    "Excessive social media",
    "Spending too much time alone",
    "Skipping meals",
    "Staying up too late",
    "Avoiding responsibilities",
    "Risky environments",
  ],
  outer: [
    "Exercise",
    "Meditation",
    "Calling a friend",
    "Attending meetings",
    "Reading",
    "Journaling",
    "Healthy eating",
    "Getting enough sleep",
  ],
};

export function SuggestedBehaviors({
  circleType,
  onSelect,
}: SuggestedBehaviorsProps) {
  const { theme } = useTheme();
  const suggestions = SUGGESTIONS[circleType];

  const getCircleColor = () => {
    switch (circleType) {
      case "inner":
        return theme.innerCircle;
      case "middle":
        return theme.middleCircle;
      case "outer":
        return theme.outerCircle;
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText style={[styles.title, { color: theme.textSecondary }]}>
        Suggested behaviors
      </ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {suggestions.map((suggestion, index) => (
          <Pressable
            key={index}
            onPress={() => onSelect(suggestion)}
            style={({ pressed }) => [
              styles.chip,
              {
                borderColor: getCircleColor(),
                opacity: pressed ? 0.6 : 1,
              },
            ]}
          >
            <ThemedText style={[styles.chipText, { color: getCircleColor() }]}>
              {suggestion}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: Spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  scrollContent: {
    gap: Spacing.sm,
    paddingRight: Spacing.lg,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
