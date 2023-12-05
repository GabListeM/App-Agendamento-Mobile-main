import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Preload from '../screens/Preload';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import MainTab from '../stacks/MainTab';

const Stack = createStackNavigator();

//createStackNavigator organiza as telas que seram usadas na aplicação
export default () => {
    return(
        <Stack.Navigator
        // screenOptions - reita a barra superior caso não esteja nos parametros do seu aplicativo
        // initialRouteName - indica qual tela será exibida primeiro
        initialRouteName="Preload"
        screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen name="Preload" component={Preload}></Stack.Screen>
            <Stack.Screen name="SignIn" component={Signin}></Stack.Screen>
            <Stack.Screen name="SignUp" component={Signup}></Stack.Screen>
            <Stack.Screen name="MainTab" component={MainTab}></Stack.Screen>
        </Stack.Navigator>
    );
    
}