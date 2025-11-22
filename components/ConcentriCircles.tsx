import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CircleType } from "@/stores/DataStore";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface ConcentriCirclesProps {
  onCirclePress: (circleType: CircleType) => void;
}

export function ConcentriCircles({ onCirclePress }: ConcentriCirclesProps) {
  const { theme } = useTheme();

  const circleSize = 280;
  const middleSize = 200;
  const innerSize = 120;

  return (
    
    <View style={[styles.container, { backgroundColor: theme.backgroundDefault }]}>
      <ThemedText style={[styles.instruction, { color: theme.textSecondary }]}>
        Tap a circle to log an event
      </ThemedText>
      <View style={styles.circlesContainer}>
        <Pressable
          onPress={() => onCirclePress("outer")}
          style={({ pressed }) => [
            styles.outerCircle,
            {
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              backgroundColor: theme.outerCircle,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >

          <View style={styles.outerLabel}>
            <ThemedText style={[styles.labelText, { color: "#FFFFFF" }]}>
              Outer
            </ThemedText>
          </View>

          <Pressable
            onPress={() => onCirclePress("middle")}
            style={({ pressed }) => [
              styles.middleCircle,
              {
                width: middleSize,
                height: middleSize,
                borderRadius: middleSize / 2,
                backgroundColor: theme.middleCircle,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <View style={styles.middleLabel}>
              <ThemedText style={[styles.labelText, { color: "#FFFFFF" }]}>
                Middle
              </ThemedText>
            </View>

            <Pressable
              onPress={() => onCirclePress("inner")}
              style={({ pressed }) => [
                styles.innerCircle,
                {
                  width: innerSize,
                  height: innerSize,
                  borderRadius: innerSize / 2,
                  backgroundColor: theme.innerCircle,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <ThemedText style={[styles.labelText, { color: "#FFFFFF" }]}>
                Inner
              </ThemedText>
            </Pressable>
          </Pressable>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    borderRadius: 12,
    alignItems: "center",
  },
  circlesContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Spacing.lg,
  },
  outerCircle: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  middleCircle: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  innerCircle: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  outerLabel: {
    position: "absolute",
    top: Spacing.lg,
  },
  middleLabel: {
    position: "absolute",
    top: Spacing.sm,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "600",
  },
  instruction: {
    fontSize: 14,
    marginTop: Spacing.md,
  },
});
