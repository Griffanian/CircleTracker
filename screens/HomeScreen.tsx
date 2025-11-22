import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { DaysSinceInnerWidget } from "@/components/DaysSinceInnerWidget";
import { ConcentriCircles } from "@/components/ConcentriCircles";
import { TodaySummary } from "@/components/TodaySummary";
import { useDataStore } from "@/hooks/useDataStore";
import { CircleType } from "@/stores/DataStore";
import { Spacing } from "@/constants/theme";
import { HomeStackParamList } from "@/navigation/HomeStackNavigator";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const store = useDataStore();

  useEffect(() => {
    const preferences = store.getPreferences();
    if (!preferences.hasCompletedOnboarding) {
      navigation.navigate("OnboardingCircles");
    }
  }, []);

  const handleLogPress = (circleType: CircleType) => {
    navigation.navigate("LogEvent", { circleType });
  };

  const preferences = store.getPreferences();
  const lastInnerEvent = store.getLastInnerEvent();
  const todayCounts = store.getTodayEventCounts();

  return (
    <ScreenScrollView>
      <View style={styles.container}>
        <ConcentriCircles onCirclePress={handleLogPress} />
        <TodaySummary counts={todayCounts} />
        <DaysSinceInnerWidget
          lastInnerEvent={lastInnerEvent}
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
});
