import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';
import {PermissionsProvider} from './src/context/PermissionsContext';

function App() {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>
  );
}

const AppState = ({children}: any) => {
  return <PermissionsProvider>{children}</PermissionsProvider>;
};

export default App;
