import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Behavior } from "@/stores/DataStore";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface BehaviorListItemProps {
  behavior: Behavior;
  onDelete: (id: string) => void;
}

export function BehaviorListItem({ behavior, onDelete }: BehaviorListItemProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.content}>
        <ThemedText style={styles.name}>{behavior.name}</ThemedText>
        {behavior.description ? (
          <ThemedText
            style={[styles.description, { color: theme.textSecondary }]}
          >
            {behavior.description}
          </ThemedText>
        ) : null}
      </View>
      <Pressable
        onPress={() => onDelete(behavior.id)}
        style={({ pressed }) => [
          styles.deleteButton,
          { opacity: pressed ? 0.6 : 1 },
        ]}
      >
        <Feather name="trash-2" size={18} color={theme.textSecondary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  content: {
    flex: 1,
    marginRight: Spacing.md,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    marginTop: Spacing.xs,
  },
  deleteButton: {
    padding: Spacing.sm,
  },
});
