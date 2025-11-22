import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CircleType } from "@/stores/DataStore";
import { useTheme } from "@/hooks/useTheme";

interface CircleBadgeProps {
  circleType: CircleType;
  size?: number;
}

export function CircleBadge({ circleType, size = 24 }: CircleBadgeProps) {
  const { theme } = useTheme();

  const getColor = () => {
    switch (circleType) {
      case "inner":
        return theme.innerCircle;
      case "middle":
        return theme.middleCircle;
      case "outer":
        return theme.outerCircle;
    }
  };

  const getLabel = () => {
    return circleType.charAt(0).toUpperCase();
  };

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: getColor(),
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <ThemedText
        style={[
          styles.text,
          { fontSize: size * 0.5, color: "#FFFFFF" },
        ]}
      >
        {getLabel()}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
  },
});
