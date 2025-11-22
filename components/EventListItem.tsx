import React, { useState } from "react";
import { View, StyleSheet, Pressable, Alert, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { CircleBadge } from "@/components/CircleBadge";
import { Event, Behavior } from "@/stores/DataStore";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface EventListItemProps {
  event: Event;
  behavior: Behavior | undefined;
  onDelete: (eventId: string) => void;
}

export function EventListItem({ event, behavior, onDelete }: EventListItemProps) {
  const { theme } = useTheme();
  const [showNote, setShowNote] = useState(false);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleDelete = () => {
    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to delete this event?")) {
        onDelete(event.id);
      }
    } else{
      Alert.alert(
        "Delete Event",
        "Are you sure you want to delete this event?",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Delete", 
            style: "destructive",
            onPress: () => onDelete(event.id)
          },
        ]
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.leftContent}>
          <CircleBadge circleType={event.circleType} size={28} />
          <View style={styles.info}>
            <ThemedText style={styles.behaviorName}>
              {behavior?.name || "Unknown Behavior"}
            </ThemedText>
            <ThemedText style={[styles.time, { color: theme.textSecondary }]}>
              {formatTime(event.timestamp)}
            </ThemedText>
          </View>
        </View>
        <View style={styles.actionButtons}>
          {event.note ? (
            <Pressable
              onPress={() => setShowNote(!showNote)}
              style={({ pressed }) => [
                styles.actionButton,
                { opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <Feather
                name={showNote ? "chevron-up" : "file-text"}
                size={18}
                color={theme.textSecondary}
              />
            </Pressable>
          ) : null}
          <Pressable
            onPress={handleDelete}
            style={({ pressed }) => [
              styles.actionButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Feather
              name="trash-2"
              size={18}
              color={theme.textSecondary}
            />
          </Pressable>
        </View>
      </View>
      {showNote && event.note ? (
        <View style={[styles.noteContainer, { borderTopColor: theme.border }]}>
          <ThemedText style={[styles.note, { color: theme.textSecondary }]}>
            {event.note}
          </ThemedText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.md,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  info: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  behaviorName: {
    fontSize: 16,
    fontWeight: "500",
  },
  time: {
    fontSize: 14,
    marginTop: Spacing.xs,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: Spacing.sm,
  },
  noteContainer: {
    padding: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
  },
  note: {
    fontSize: 14,
    fontStyle: "italic",
  },
});
