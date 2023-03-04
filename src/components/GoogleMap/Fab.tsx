import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
} from 'react-native';

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Fab = ({iconName, onPress, style = {}}: Props) => {
  return (
    <View style={{...(style as any)}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.blueButton}>
        <Text style={styles.iconText}>{iconName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  blueButton: {
    zIndex: 999,
    height: 50,
    width: 50,
    backgroundColor: 'blue',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  iconText: {
    color: 'white',
    fontSize: 20,
  },
});
