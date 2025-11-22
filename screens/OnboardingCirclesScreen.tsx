import React, { useState } from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "@/components/ThemedText";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { CircleBehaviorEditor } from "@/components/CircleBehaviorEditor";
import { CirclesExplanation } from "@/components/CirclesExplanation";
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
  
  const preferences = store.getPreferences();
  const [sobrietyDate, setSobrietyDate] = useState<Date | null>(
    preferences.sobrietyStartDate
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddBehavior = (circleType: CircleType, name: string) => {
    store.addBehavior({ circleType, name });
  };

  const handleDeleteBehavior = (id: string) => {
    store.deleteBehavior(id);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setSobrietyDate(selectedDate);
    }
  };

  const handleFinish = () => {
    store.updatePreferences({ 
      hasCompletedOnboarding: true,
      sobrietyStartDate: sobrietyDate,
    });
    navigation.goBack();
  };

  const innerBehaviors = useBehaviors("inner");
  const middleBehaviors = useBehaviors("middle");
  const outerBehaviors = useBehaviors("outer");

  const canFinish =
    innerBehaviors.length > 0 ||
    middleBehaviors.length > 0 ||
    outerBehaviors.length > 0;

  return (
    <ScreenScrollView>
      <View style={styles.container}>
        <ThemedText style={styles.welcomeTitle}>
          Welcome! {"\n"}
          Congratulations on taking this next step towards controlling
          your behaviour.
        </ThemedText>

        <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
          This app is based on The Three Circles from 12-Step programs. Many
          of us who have walked the steps have found this to be a very useful tool for noticing patterns and
          controlling our behaviours.
        </ThemedText>

        <ThemedText style={styles.CirclesTitle}>
          The Three Circles
        </ThemedText>

        <CirclesExplanation />

        <View style={styles.divider} />

        <ThemedText style={styles.title}>Setup Your Circles</ThemedText>
        <ThemedText style={[styles.description, { color: theme.textSecondary }]}>
          Add behaviors for each circle to personalize your tracking.
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
        <ThemedText style={styles.title}>Start Date</ThemedText>
        <ThemedText style={[styles.description, { color: theme.textSecondary }]}>
          When did you start your journey? This is optional but helps you track how far you've already come.
        </ThemedText>

        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={({ pressed }) => [
            styles.dateButton,
            {
              backgroundColor: theme.backgroundDefault,
              borderColor: theme.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <ThemedText style={{ color: sobrietyDate ? theme.text : theme.textSecondary }}>
            {sobrietyDate
              ? sobrietyDate.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Select a date (optional)"}
          </ThemedText>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={sobrietyDate || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}

        <View style={styles.divider} />

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
            {canFinish ? "Get Started" : "Add at least one behavior"}
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
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 32,
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  CirclesTitle: {
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 32,
    marginBottom: Spacing.md,
    textAlign: "center",

  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: Spacing.xl,
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
  dateButton: {
    height: 48,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    justifyContent: "center",
    marginBottom: Spacing.md,
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
