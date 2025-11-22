import React from "react";
import { View, StyleSheet, Switch, Pressable } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useDataStore } from "@/hooks/useDataStore";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

export default function SettingsScreen() {
  const { theme } = useTheme();
  const store = useDataStore();
  const navigation = useNavigation();
  const preferences = store.getPreferences();

  const handleToggleShowDays = (value: boolean) => {
    store.updatePreferences({ showDaysSinceInner: value });
  };

  const handleEditCircles = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: "HomeTab",
        params: {
          screen: "OnboardingCircles",
        },
      })
    );
  };

  return (
    <ScreenScrollView>
      <View style={styles.container}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Display Preferences</ThemedText>
          <View
            style={[
              styles.setting,
              {
                backgroundColor: theme.backgroundDefault,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.settingInfo}>
              <ThemedText style={styles.settingLabel}>
                Show Days Since Inner Circle
              </ThemedText>
              <ThemedText
                style={[styles.settingDescription, { color: theme.textSecondary }]}
              >
                Display counter on home screen
              </ThemedText>
            </View>
            <Switch
              value={preferences.showDaysSinceInner}
              onValueChange={handleToggleShowDays}
              trackColor={{ false: theme.border, true: theme.success }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Circles Management</ThemedText>
          <Pressable
            onPress={handleEditCircles}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: theme.backgroundDefault,
                borderColor: theme.border,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <ThemedText style={styles.buttonText}>Edit Circle Behaviors</ThemedText>
          </Pressable>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>About</ThemedText>
          <View
            style={[
              styles.infoCard,
              {
                backgroundColor: theme.backgroundDefault,
                borderColor: theme.border,
              },
            ]}
          >
            <ThemedText style={styles.appName}>Circles</ThemedText>
            <ThemedText style={[styles.version, { color: theme.textSecondary }]}>
              Version 1.0.0
            </ThemedText>
            <ThemedText
              style={[styles.description, { color: theme.textSecondary }]}
            >
              A behavioral tracking app to help you monitor and improve your
              habits across inner, middle, and outer circles.
            </ThemedText>
          </View>
        </View>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  setting: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  settingInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingDescription: {
    fontSize: 14,
    marginTop: Spacing.xs,
  },
  button: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  infoCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },
  version: {
    fontSize: 14,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
