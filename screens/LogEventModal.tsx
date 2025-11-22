import React, { useState } from "react";
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "@/components/ThemedText";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";
import { BehaviorPicker } from "@/components/BehaviorPicker";
import { CircleBadge } from "@/components/CircleBadge";
import { useDataStore } from "@/hooks/useDataStore";
import { CircleType } from "@/stores/DataStore";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { HomeStackParamList } from "@/navigation/HomeStackNavigator";

type LogEventModalProps = {
  route: {
    params: {
      circleType: CircleType;
    };
  };
  navigation: NativeStackNavigationProp<HomeStackParamList, "LogEvent">;
};

export default function LogEventModal({ route, navigation }: LogEventModalProps) {
  const { circleType } = route.params;
  const { theme } = useTheme();
  const store = useDataStore();
  const [selectedBehaviorId, setSelectedBehaviorId] = useState<string | null>(
    null
  );
  const [note, setNote] = useState("");

  const behaviors = store.getBehaviors(circleType);

  const handleSave = () => {
    if (selectedBehaviorId) {
      store.addEvent({
        behaviorId: selectedBehaviorId,
        circleType,
        note: note.trim() || undefined,
      });
      navigation.goBack();
    }
  };

  const getCircleLabel = () => {
    return circleType.charAt(0).toUpperCase() + circleType.slice(1);
  };

  return (
    <ScreenKeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <CircleBadge circleType={circleType} size={40} />
          <ThemedText style={styles.title}>Log {getCircleLabel()} Event</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Select Behavior</ThemedText>
          <BehaviorPicker
            circleType={circleType}
            behaviors={behaviors}
            selectedBehaviorId={selectedBehaviorId}
            onSelect={setSelectedBehaviorId}
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Note (Optional)</ThemedText>
          <TextInput
            style={[
              styles.noteInput,
              {
                backgroundColor: theme.backgroundDefault,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            placeholder="Add any details or context..."
            placeholderTextColor={theme.textSecondary}
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <Pressable
          onPress={handleSave}
          disabled={!selectedBehaviorId}
          style={({ pressed }) => [
            styles.saveButton,
            {
              backgroundColor: selectedBehaviorId ? theme.primary : theme.border,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <ThemedText style={[styles.buttonText, { color: "#FFFFFF" }]}>
            Save Event
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.cancelButton,
            {
              borderColor: theme.border,
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <ThemedText style={{ color: theme.text }}>Cancel</ThemedText>
        </Pressable>
      </View>
    </ScreenKeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginLeft: Spacing.md,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  noteInput: {
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    fontSize: 16,
    borderWidth: 1,
    minHeight: 100,
  },
  saveButton: {
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  cancelButton: {
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
