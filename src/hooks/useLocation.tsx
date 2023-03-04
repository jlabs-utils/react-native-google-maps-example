import {useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Location} from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState<boolean>(false);
  const [initialPosiiton, setInitialPosition] = useState<Location>();
  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [routeLines, setrouteLines] = useState<Array<Location>>([]);

  const watchIdRef = useRef<number>();
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getCurrentLocation().then(location => {
      if (!isMounted.current) {
        return;
      }
      setInitialPosition(location);
      setUserLocation(location);
      setrouteLines(routes => [...routes, location]);
      setHasLocation(true);
    });
  }, [routeLines]);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        err => reject({err}),
        {enableHighAccuracy: true},
      );
    });
  };

  const followUserLocation = () => {
    watchIdRef.current = Geolocation.watchPosition(
      ({coords}) => {
        if (!isMounted.current) {
          return;
        }
        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        setUserLocation(location);
        setrouteLines(routes => [...routes, location]);
      },
      err => console.log({err}),
      {enableHighAccuracy: true, distanceFilter: 10},
    );
  };

  const stopFollowUserLocation = () => {
    if (watchIdRef.current) {
      Geolocation.clearWatch(watchIdRef.current);
    }
  };

  return {
    hasLocation,
    initialPosiiton,
    userLocation,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
    routeLines,
  };
};
