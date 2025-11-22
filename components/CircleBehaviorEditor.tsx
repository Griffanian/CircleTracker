import React, { useState } from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { BehaviorListItem } from "@/components/BehaviorListItem";
import { CircleType, Behavior } from "@/stores/DataStore";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface CircleBehaviorEditorProps {
  circleType: CircleType;
  behaviors: Behavior[];
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
}

export function CircleBehaviorEditor({
  circleType,
  behaviors,
  onAdd,
  onDelete,
}: CircleBehaviorEditorProps) {
  const { theme } = useTheme();
  const [behaviorName, setBehaviorName] = useState("");

  const handleAdd = () => {
    if (behaviorName.trim()) {
      onAdd(behaviorName.trim());
      setBehaviorName("");
    }
  };

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

  const getCircleTitle = () => {
    return circleType.charAt(0).toUpperCase() + circleType.slice(1) + " Circle";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={[styles.title, { color: getCircleColor() }]}>
          {getCircleTitle()}
        </ThemedText>
        <ThemedText style={[styles.count, { color: theme.textSecondary }]}>
          {behaviors.length} {behaviors.length === 1 ? "behavior" : "behaviors"}
        </ThemedText>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.backgroundDefault,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          placeholder={`Add ${circleType} circle behavior`}
          placeholderTextColor={theme.textSecondary}
          value={behaviorName}
          onChangeText={setBehaviorName}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <Pressable
          onPress={handleAdd}
          style={({ pressed }) => [
            styles.addButton,
            {
              backgroundColor: getCircleColor(),
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Feather name="plus" size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.list}>
        {behaviors.map((behavior) => (
          <View key={behavior.id} style={{ marginBottom: Spacing.sm }}>
            <BehaviorListItem behavior={behavior} onDelete={onDelete} />
          </View>
        ))}
      </View>

      {behaviors.length === 0 ? (
        <View style={styles.emptyState}>
          <ThemedText style={[styles.emptyText, { color: theme.textSecondary }]}>
            No behaviors added yet
          </ThemedText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.h4,
  },
  count: {
    ...Typography.small,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: Spacing.md,
  },
  input: {
    flex: 1,
    height: Spacing.inputHeight,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
    borderWidth: 1,
  },
  addButton: {
    width: Spacing.inputHeight,
    height: Spacing.inputHeight,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Spacing.sm,
  },
  list: {
    gap: Spacing.sm,
  },
  emptyState: {
    padding: Spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    ...Typography.small,
  },
});
