import React from 'react';
import {View} from 'react-native';
import GoogleMap from '../../components/GoogleMap';

const MapScreen = () => {
  return (
    <View style={{flex: 1}}>
      <GoogleMap />
    </View>
  );
};

export default MapScreen;
