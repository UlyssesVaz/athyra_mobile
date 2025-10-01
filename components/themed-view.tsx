// components/themed-view.tsx
import { Colors } from '@/constants/theme';
import { View, ViewProps, useColorScheme } from 'react-native';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return <View style={[{ backgroundColor: colors.background }, style]} {...otherProps} />;
}