import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';
import 'react-native-gesture-handler';

import UserContextProvider from './src/contexts/UserContext';

export default ()=>{
  return(
    <UserContextProvider>
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
    </UserContextProvider>
  );
}