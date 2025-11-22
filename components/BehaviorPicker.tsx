import React from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Behavior, CircleType } from "@/stores/DataStore";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface BehaviorPickerProps {
  circleType: CircleType;
  behaviors: Behavior[];
  selectedBehaviorId: string | null;
  onSelect: (behaviorId: string) => void;
}

export function BehaviorPicker({
  circleType,
  behaviors,
  selectedBehaviorId,
  onSelect,
}: BehaviorPickerProps) {
  const { theme } = useTheme();

  if (behaviors.length === 0) {
    return (
      <View style={styles.emptyState}>
        <ThemedText style={[styles.emptyText, { color: theme.textSecondary }]}>
          No behaviors defined for this circle yet.
        </ThemedText>
        <ThemedText style={[styles.emptyHint, { color: theme.textSecondary }]}>
          Add behaviors in Settings first.
        </ThemedText>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {behaviors.map((behavior) => (
        <Pressable
          key={behavior.id}
          onPress={() => onSelect(behavior.id)}
          style={({ pressed }) => [
            styles.option,
            {
              backgroundColor:
                selectedBehaviorId === behavior.id
                  ? theme.backgroundSecondary
                  : theme.backgroundDefault,
              borderColor: theme.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <ThemedText style={styles.optionText}>{behavior.name}</ThemedText>
          {behavior.description ? (
            <ThemedText
              style={[styles.description, { color: theme.textSecondary }]}
            >
              {behavior.description}
            </ThemedText>
          ) : null}
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
  },
  option: {
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    marginTop: Spacing.xs,
  },
  emptyState: {
    padding: Spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
  emptyHint: {
    fontSize: 14,
    marginTop: Spacing.sm,
    textAlign: "center",
  },
});
