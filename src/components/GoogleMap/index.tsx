import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
// import {Marker} from 'react-native-maps';
import {useLocation} from '../../hooks/useLocation';
import {LoadingScreen} from '../../screen/LoadingScreen';
import {Location} from '../../interfaces/appInterfaces';
import {Fab} from './Fab';

const GoogleMap = () => {
  const {
    hasLocation,
    initialPosiiton,
    userLocation,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
    routeLines,
  } = useLocation();

  const mapViewRef = useRef<MapView>();
  const followingRef = useRef<boolean>(true);

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, [followUserLocation, stopFollowUserLocation]);

  useEffect(() => {
    if (!followingRef.current) {
      return;
    }
    const {latitude, longitude} = userLocation;
    setCameraPosition({latitude, longitude});
  }, [userLocation]);

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();
    setCameraPosition({latitude, longitude});
    followingRef.current = true;
  };

  const setCameraPosition = ({latitude, longitude}: Location) => {
    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  };

  const toggleFollowing = () => {
    followingRef.current = !followingRef.current;
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <View style={{flex: 1}}>
        <MapView
          ref={el => (mapViewRef.current = el!)}
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          initialRegion={{
            latitude: initialPosiiton!.latitude,
            longitude: initialPosiiton!.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onTouchStart={toggleFollowing}>
          <Polyline
            coordinates={routeLines}
            strokeColor="red"
            strokeWidth={3}
          />
          {/* <Marker
            image={require('path_marker.png')}
            coordinate={{
              latitude: 0,
              longitude: 0,
            }}
            title="title"
            description="description"
          /> */}
        </MapView>
      </View>
      <Fab
        iconName="GO"
        onPress={centerPosition}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
        }}
      />
    </>
  );
};

export default GoogleMap;
