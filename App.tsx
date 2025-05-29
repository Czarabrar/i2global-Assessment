import React from 'react';
import {AppProvider} from './src/context/AppContext';
import {Text} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}
