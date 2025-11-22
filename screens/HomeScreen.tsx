import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { DaysSinceInnerWidget } from "@/components/DaysSinceInnerWidget";
import { SobrietyDurationWidget } from "@/components/SobrietyDurationWidget";
import { ConcentriCircles } from "@/components/ConcentriCircles";
import { TodaySummary } from "@/components/TodaySummary";
import { useDataStore, useTodayEventCounts, useLastInnerEvent } from "@/hooks/useDataStore";
import { CircleType } from "@/stores/DataStore";
import { Spacing } from "@/constants/theme";
import { HomeStackParamList } from "@/navigation/HomeStackNavigator";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const store = useDataStore();
  const todayCounts = useTodayEventCounts();
  const lastInnerEvent = useLastInnerEvent();

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

  return (
    <ScreenScrollView>
      <View style={styles.container}>
        <ConcentriCircles onCirclePress={handleLogPress} />
        <TodaySummary counts={todayCounts} />
        <SobrietyDurationWidget sobrietyStartDate={preferences.sobrietyStartDate} />
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
