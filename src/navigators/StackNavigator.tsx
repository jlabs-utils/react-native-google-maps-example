import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import {PermissionScreen} from '../screen/PermissionsScreen';
import {PermissionContext} from '../context/PermissionsContext';
import {LoadingScreen} from '../screen/LoadingScreen';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  const {permissions} = React.useContext(PermissionContext);

  if (permissions?.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {permissions?.locationStatus === 'granted' ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen name="PermissionStatus" component={PermissionScreen} />
      )}
    </Stack.Navigator>
  );
}

export default StackNavigator;
