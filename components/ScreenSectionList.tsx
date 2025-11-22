import React from "react";
import { SectionList, SectionListProps, StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { useScreenInsets } from "@/hooks/useScreenInsets";
import { Spacing } from "@/constants/theme";

export function ScreenSectionList<ItemT, SectionT = any>({
  contentContainerStyle,
  style,
  stickySectionHeadersEnabled = true,
  ...sectionListProps
}: SectionListProps<ItemT, SectionT>) {
  const { theme } = useTheme();
  const { paddingTop, paddingBottom, scrollInsetBottom } = useScreenInsets();

  return (
    <SectionList
      style={[
        styles.container,
        { backgroundColor: theme.backgroundRoot },
        style,
      ]}
      contentContainerStyle={[
        {
          paddingTop,
          paddingBottom,
        },
        styles.contentContainer,
        contentContainerStyle,
      ]}
      scrollIndicatorInsets={{ bottom: scrollInsetBottom }}
      stickySectionHeadersEnabled={stickySectionHeadersEnabled}
      {...sectionListProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.xl,
  },
});
