import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "@/components/ThemedText";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { CircleBehaviorEditor } from "@/components/CircleBehaviorEditor";
import { useDataStore, useBehaviors } from "@/hooks/useDataStore";
import { CircleType } from "@/stores/DataStore";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { HomeStackParamList } from "@/navigation/HomeStackNavigator";

type OnboardingCirclesScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList, "OnboardingCircles">;
};

export default function OnboardingCirclesScreen({
  navigation,
}: OnboardingCirclesScreenProps) {
  const { theme } = useTheme();
  const store = useDataStore();

  const handleAddBehavior = (circleType: CircleType, name: string) => {
    console.log("[OnboardingScreen] Adding behavior:", circleType, name);
    store.addBehavior({ circleType, name });
  };

  const handleDeleteBehavior = (id: string) => {
    console.log("[OnboardingScreen] Deleting behavior:", id);
    store.deleteBehavior(id);
  };

  const handleFinish = () => {
    store.updatePreferences({ hasCompletedOnboarding: true });
    navigation.goBack();
  };

  const innerBehaviors = useBehaviors("inner");
  const middleBehaviors = useBehaviors("middle");
  const outerBehaviors = useBehaviors("outer");
  
  console.log("[OnboardingScreen] Render - behaviors count:", {
    inner: innerBehaviors.length,
    middle: middleBehaviors.length,
    outer: outerBehaviors.length
  });

  const canFinish =
    innerBehaviors.length > 0 ||
    middleBehaviors.length > 0 ||
    outerBehaviors.length > 0;

  return (
    <ScreenScrollView>
      <View style={styles.container}>
        <ThemedText style={styles.title}>Setup Your Circles</ThemedText>
        <ThemedText style={[styles.description, { color: theme.textSecondary }]}>
          Define behaviors for each circle. Inner circle represents behaviors to
          avoid, middle circle represents caution areas, and outer circle
          represents healthy behaviors.
        </ThemedText>

        <View style={styles.editors}>
          <CircleBehaviorEditor
            circleType="inner"
            behaviors={innerBehaviors}
            onAdd={(name) => handleAddBehavior("inner", name)}
            onDelete={handleDeleteBehavior}
          />
          <CircleBehaviorEditor
            circleType="middle"
            behaviors={middleBehaviors}
            onAdd={(name) => handleAddBehavior("middle", name)}
            onDelete={handleDeleteBehavior}
          />
          <CircleBehaviorEditor
            circleType="outer"
            behaviors={outerBehaviors}
            onAdd={(name) => handleAddBehavior("outer", name)}
            onDelete={handleDeleteBehavior}
          />
        </View>

        <Pressable
          onPress={handleFinish}
          disabled={!canFinish}
          style={({ pressed }) => [
            styles.finishButton,
            {
              backgroundColor: canFinish ? theme.primary : theme.border,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <ThemedText style={[styles.buttonText, { color: "#FFFFFF" }]}>
            {canFinish ? "Finish Setup" : "Add at least one behavior"}
          </ThemedText>
        </Pressable>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: 16,
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
  editors: {
    marginBottom: Spacing.xl,
  },
  finishButton: {
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.md,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
