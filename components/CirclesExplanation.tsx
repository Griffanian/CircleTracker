import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Spacing, CircleColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

export function CirclesExplanation() {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.diagramContainer}>
        <View style={[styles.outerCircle, { borderColor: CircleColors.outer }]}>
          <View style={[styles.middleCircle, { borderColor: CircleColors.middle }]}>
            <View style={[styles.innerCircle, { borderColor: CircleColors.inner }]}>
              <ThemedText style={styles.innerLabel}>Inner</ThemedText>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.explanations}>
        <View style={styles.explanationItem}>
          <View style={styles.labelRow}>
            <View style={[styles.dot, { backgroundColor: CircleColors.inner }]} />
            <ThemedText style={styles.circleLabel}>Inner Circle</ThemedText>
          </View>
          <ThemedText style={[styles.explanation, { color: theme.textSecondary }]}>
            Actions that clearly cross your personal boundaries or violate commitments you’ve made to yourself. 
            These are the behaviours you’re trying to reduce or eliminate because they lead to negative outcomes or move you away from who you want to be.
          </ThemedText>
        </View>

        <View style={styles.explanationItem}>
          <View style={styles.labelRow}>
            <View style={[styles.dot, { backgroundColor: CircleColors.middle }]} />
            <ThemedText style={styles.circleLabel}>Middle Circle</ThemedText>
          </View>
          <ThemedText style={[styles.explanation, { color: theme.textSecondary }]}>
            Actions, situations, or patterns that increase vulnerability or move you closer to behaviours you want to avoid.
            They aren’t inherently “bad,” but they act as early warning signs or indicators that you may not be aligned with your intentions.
          </ThemedText>
        </View>

        <View style={styles.explanationItem}>
          <View style={styles.labelRow}>
            <View style={[styles.dot, { backgroundColor: CircleColors.outer }]} />
            <ThemedText style={styles.circleLabel}>Outer Circle</ThemedText>
          </View>
          <ThemedText style={[styles.explanation, { color: theme.textSecondary }]}>
            Actions that support your wellbeing, values, and long-term goals.
            These behaviours move you in the direction you want to grow. They strengthen resilience, create connection, and improve your overall quality of life.
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.xl,
  },
  diagramContainer: {
    alignItems: "center",
    paddingVertical: Spacing.lg,
  },
  outerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  middleCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  innerLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  explanations: {
    gap: Spacing.lg,
  },
  explanationItem: {
    gap: Spacing.sm,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  circleLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  explanation: {
    fontSize: 15,
    lineHeight: 22,
  },
});
