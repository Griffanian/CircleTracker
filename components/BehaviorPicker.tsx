import React, { useState } from "react";
import { View, StyleSheet, Pressable, ScrollView, TextInput, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Behavior, CircleType } from "@/stores/DataStore";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface BehaviorPickerProps {
  circleType: CircleType;
  behaviors: Behavior[];
  selectedBehaviorId: string | null;
  onSelect: (behaviorId: string) => void;
  onCreateCustom?: (name: string) => void;
  onDelete?: (id: string) => void;
}

export function BehaviorPicker({
  behaviors,
  selectedBehaviorId,
  onSelect,
  onCreateCustom,
  onDelete,
}: BehaviorPickerProps) {
  const { theme } = useTheme();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customBehaviorName, setCustomBehaviorName] = useState("");

  const handleCreateCustom = () => {
    if (customBehaviorName.trim() && onCreateCustom) {
      onCreateCustom(customBehaviorName.trim());
      setCustomBehaviorName("");
      setShowCustomInput(false);
    }
  };

  return (
    <View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {behaviors.map((behavior) => (
          <View
            key={behavior.id}
            style={[
              styles.option,
              {
                backgroundColor:
                  selectedBehaviorId === behavior.id
                    ? theme.backgroundSecondary
                    : theme.backgroundDefault,
                borderColor: theme.border,
              },
            ]}
          >
            <Pressable
              onPress={() => onSelect(behavior.id)}
              style={({ pressed }) => [
                { flex: 1, opacity: pressed ? 0.7 : 1 },
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

            {/** Delete button shown when `onDelete` prop is provided */}
            {typeof onDelete === "function" ? (
              <Pressable
                onPress={() => onDelete(behavior.id)}
                style={({ pressed }) => [
                  styles.deleteButton,
                  { opacity: pressed ? 0.6 : 1 },
                ]}
              >
                <Feather name="trash-2" size={18} color={theme.textSecondary} />
              </Pressable>
            ) : null}
          </View>
        ))}

        {onCreateCustom ? (
          showCustomInput ? (
            <View
              style={[
                styles.customContainer,
                {
                  backgroundColor: theme.backgroundDefault,
                  borderColor: theme.border,
                },
              ]}
            >
              <TextInput
                style={[
                  styles.customInput,
                  {
                    backgroundColor: theme.backgroundSecondary,
                    color: theme.text,
                    borderColor: theme.border,
                  },
                ]}
                placeholder="Enter behavior name..."
                placeholderTextColor={theme.textSecondary}
                value={customBehaviorName}
                onChangeText={setCustomBehaviorName}
                onSubmitEditing={handleCreateCustom}
                autoFocus
                returnKeyType="done"
              />
              <View style={styles.customActions}>
                <Pressable
                  onPress={handleCreateCustom}
                  disabled={!customBehaviorName.trim()}
                  style={({ pressed }) => [
                    styles.customButton,
                    {
                      backgroundColor: customBehaviorName.trim()
                        ? theme.primary
                        : theme.border,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <ThemedText
                    style={[styles.customButtonText, { color: "#FFFFFF" }]}
                  >
                    Add
                  </ThemedText>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setShowCustomInput(false);
                    setCustomBehaviorName("");
                  }}
                  style={({ pressed }) => [
                    styles.customButton,
                    {
                      backgroundColor: theme.backgroundSecondary,
                      opacity: pressed ? 0.6 : 1,
                    },
                  ]}
                >
                  <ThemedText style={styles.customButtonText}>Cancel</ThemedText>
                </Pressable>
              </View>
            </View>
          ) : (
            <Pressable
              onPress={() => setShowCustomInput(true)}
              style={({ pressed }) => [
                styles.customButton,
                styles.addCustomButton,
                {
                  borderColor: theme.border,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Feather name="plus" size={18} color={theme.text} />
              <ThemedText style={styles.addCustomText}>
                Add Custom Behavior
              </ThemedText>
            </Pressable>
          )
        ) : null}
      </ScrollView>

      {behaviors.length === 0 && !onCreateCustom ? (
        <View style={styles.emptyState}>
          <ThemedText style={[styles.emptyText, { color: theme.textSecondary }]}>
            No behaviors defined for this circle yet.
          </ThemedText>
          <ThemedText style={[styles.emptyHint, { color: theme.textSecondary }]}>
            Add behaviors in Settings first.
          </ThemedText>
        </View>
      ) : null}
    </View>
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
    flexDirection: "row",
    alignItems: "flex-start",
  },
  deleteButton: {
    marginLeft: Spacing.sm,
    padding: 6,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    marginTop: Spacing.xs,
  },
  customContainer: {
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  customInput: {
    height: Spacing.inputHeight,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  customActions: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  customButton: {
    height: 40,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
  },
  addCustomButton: {
    flexDirection: "row",
    gap: Spacing.sm,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  customButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  addCustomText: {
    fontSize: 14,
    fontWeight: "500",
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
