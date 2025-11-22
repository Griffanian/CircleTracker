import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { CircleBadge } from "@/components/CircleBadge";
import { CircleType } from "@/stores/DataStore";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface QuickCircleLogButtonsProps {
  onLogPress: (circleType: CircleType) => void;
}

export function QuickCircleLogButtons({ onLogPress }: QuickCircleLogButtonsProps) {
  const { theme } = useTheme();

  const buttons: { circleType: CircleType; label: string; color: string }[] = [
    { circleType: "inner", label: "Inner", color: theme.innerCircle },
    { circleType: "middle", label: "Middle", color: theme.middleCircle },
    { circleType: "outer", label: "Outer", color: theme.outerCircle },
  ];

  return (
    <View style={styles.container}>
      {buttons.map((button) => (
        <Pressable
          key={button.circleType}
          onPress={() => onLogPress(button.circleType)}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: button.color,
              opacity: pressed ? 0.9 : 1,
            },
            Shadows.card,
          ]}
        >
          <CircleBadge circleType={button.circleType} size={32} />
          <ThemedText style={[styles.buttonText, { color: "#FFFFFF" }]}>
            Log {button.label}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  button: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: Spacing.sm,
  },
});
