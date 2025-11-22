import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { DaysSinceInnerWidget } from "@/components/DaysSinceInnerWidget";
import { ConcentriCircles } from "@/components/ConcentriCircles";
import { TodaySummary } from "@/components/TodaySummary";
import { ThemedText } from "@/components/ThemedText";
import { useTodayEventCounts, usePreferences } from "@/hooks/useDataStore";
import { CircleType } from "@/stores/DataStore";
import { Spacing } from "@/constants/theme";
import { HomeStackParamList } from "@/navigation/HomeStackNavigator";
import { useTheme } from "@/hooks/useTheme";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const todayCounts = useTodayEventCounts();
  const preferences = usePreferences();
  const { theme } = useTheme();

  useEffect(() => {
    if (!preferences.hasCompletedOnboarding) {
      navigation.navigate("OnboardingCircles");
    }
  }, [preferences.hasCompletedOnboarding, navigation]);

  const handleLogPress = (circleType: CircleType) => {
    navigation.navigate("LogEvent", { circleType });
  };

  const handleTodaySummaryPress = (circleType: CircleType) => {
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate("HistoryTab", { circleFilter: circleType });
    }
  };

  return (
    <ScreenScrollView>
      <View style={styles.container}>

        <ConcentriCircles onCirclePress={handleLogPress} />
        <TodaySummary counts={todayCounts} onCirclePress={handleTodaySummaryPress} />
        <DaysSinceInnerWidget
          sobrietyStartDate={preferences.sobrietyStartDate}
          show={preferences.showDaysSinceInner}
        />
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  instruction: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
});
