import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import OnboardingCirclesScreen from "@/screens/OnboardingCirclesScreen";
import LogEventModal from "@/screens/LogEventModal";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

type CircleType = "inner" | "middle" | "outer";

export type HomeStackParamList = {
  Home: undefined;
  OnboardingCircles: undefined;
  LogEvent: { circleType: CircleType };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Circles" />,
        }}
      />
      <Stack.Screen
        name="OnboardingCircles"
        component={OnboardingCirclesScreen}
        options={{
          headerTitle: "Setup Your Circles",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="LogEvent"
        component={LogEventModal}
        options={{
          headerTitle: "Log Event",
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}
