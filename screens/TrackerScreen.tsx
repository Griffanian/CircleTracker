import React from "react";
import { View, StyleSheet } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { CircleSummaryStats } from "@/components/CircleSummaryStats";
import { ThemedText } from "@/components/ThemedText";
import { useEventCountsForPeriod } from "@/hooks/useDataStore";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { MainTabParamList } from "@/navigation/MainTabNavigator";
import type { CircleType } from "@/stores/DataStore";
import type { NavigatorScreenParams } from "@react-navigation/native";
import type { HomeStackParamList } from "@/navigation/HomeStackNavigator";

type TrackerScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, "TrackerTab">;

export default function TrackerScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<TrackerScreenNavigationProp>();
  const counts7Days = useEventCountsForPeriod(7);
  const counts30Days = useEventCountsForPeriod(30);

  const handleLogEvent = (circleType: CircleType) => {
    navigation.navigate("HomeTab", {
      screen: "LogEvent",
      params: { circleType },
    } as any);
  };

  return (
    <ScreenScrollView>
      <View style={styles.container}>
        <ThemedText style={styles.title}>Your Progress</ThemedText>
        <ThemedText style={[styles.description, { color: theme.textSecondary }]}>
          Track your behaviors across different circles over time
        </ThemedText>

        <View style={styles.stats}>
          <CircleSummaryStats
            circleType="inner"
            count7Days={counts7Days.inner}
            count30Days={counts30Days.inner}
            onCirclePress={() => handleLogEvent("inner")}
            onPress7Days={() => navigation.navigate("HistoryTab", { circleFilter: "inner", daysFilter: 7 })}
            onPress30Days={() => navigation.navigate("HistoryTab", { circleFilter: "inner", daysFilter: 30 })}
          />
          <CircleSummaryStats
            circleType="middle"
            count7Days={counts7Days.middle}
            count30Days={counts30Days.middle}
            onCirclePress={() => handleLogEvent("middle")}
            onPress7Days={() => navigation.navigate("HistoryTab", { circleFilter: "middle", daysFilter: 7 })}
            onPress30Days={() => navigation.navigate("HistoryTab", { circleFilter: "middle", daysFilter: 30 })}
          />
          <CircleSummaryStats
            circleType="outer"
            count7Days={counts7Days.outer}
            count30Days={counts30Days.outer}
            onCirclePress={() => handleLogEvent("outer")}
            onPress7Days={() => navigation.navigate("HistoryTab", { circleFilter: "outer", daysFilter: 7 })}
            onPress30Days={() => navigation.navigate("HistoryTab", { circleFilter: "outer", daysFilter: 30 })}
          />
        </View>
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
  },
  stats: {
    gap: Spacing.md,
  },
});
