import React from 'react';
import {StyleSheet, Text, Pressable, ViewStyle, TextStyle} from 'react-native';

interface Props {
  onPress: () => void;
}

export function DemoButton({ onPress, children, }: React.PropsWithChildren<Props>) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.container,]}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

interface Styles {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    minWidth: '45%',
    maxWidth: '100%',
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor:'#F39800'
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
});
