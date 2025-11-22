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
            Behaviours define your sobriety, they are things that you would not want
            to do. If you do them, most people consider that a slip and they reset
            their sobriety from there. They are things that you wish to never do.
          </ThemedText>
        </View>

        <View style={styles.explanationItem}>
          <View style={styles.labelRow}>
            <View style={[styles.dot, { backgroundColor: CircleColors.middle }]} />
            <ThemedText style={styles.circleLabel}>Middle Circle</ThemedText>
          </View>
          <ThemedText style={[styles.explanation, { color: theme.textSecondary }]}>
            Behaviours are things that are not fully breaking your sobriety but
            they're still kind of dodgy and you would rather not do them because
            they're a slippery slope.
          </ThemedText>
        </View>

        <View style={styles.explanationItem}>
          <View style={styles.labelRow}>
            <View style={[styles.dot, { backgroundColor: CircleColors.outer }]} />
            <ThemedText style={styles.circleLabel}>Outer Circle</ThemedText>
          </View>
          <ThemedText style={[styles.explanation, { color: theme.textSecondary }]}>
            Behaviours bring joy and happiness into your life. Examples include:
            going to the gym, talking to a friend, etc.
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
