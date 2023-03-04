import React, {useState, createContext, useEffect, useCallback} from 'react';
import {AppState, Platform} from 'react-native';
import {
  PermissionStatus,
  request,
  PERMISSIONS,
  check,
  openSettings,
} from 'react-native-permissions';

export interface PermissionState {
  locationStatus: PermissionStatus;
}

export const permissionInitialState: PermissionState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions?: PermissionState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({children}: any) => {
  const [permissions, setPermissions] = useState(permissionInitialState);

  const getPermissionName = () => {
    const name =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    return name;
  };

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    permissionStatus = await request(getPermissionName());

    if (permissionStatus === 'blocked') {
      openSettings();
    }

    setPermissions({
      ...permissions,
      locationStatus: permissionStatus,
    });
  };

  const checkLocationPermission = useCallback(async () => {
    let permissionStatus: PermissionStatus;

    permissionStatus = await check(getPermissionName());

    setPermissions({
      ...permissions,
      locationStatus: permissionStatus,
    });
  }, [permissions]);

  useEffect(() => {
    checkLocationPermission();

    AppState.addEventListener('change', state => {
      console.log(state);
      if (state !== 'active') {
        return;
      }
      checkLocationPermission();
    });
  }, [checkLocationPermission]);

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        askLocationPermission,
        checkLocationPermission,
      }}>
      {children}
    </PermissionContext.Provider>
  );
};
