import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Appointments from '../screens/Appointments';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

// createBottomTabNavigator - assim como o "createStackNavigator" organiza as tela que serão utilizadas, mas mantem elas
//na mesma tela, utilizando botões na parte inferior para se locomover entre elas.
export default () => {
    return(
    <Tab.Navigator 
    //tabBar - nessa parte é criado um componente "CustomTabBar" para configurar manualmente os botoes de navegação 
    //na parte inferior, o componente recebe e envia as props que serão utilizadas
    tabBar={props=><CustomTabBar {...props} />}
    initialRouteName="Home"
        screenOptions={{
            headerShown: false
        }}
    >
        <Tab.Screen name="Home" component={Home}></Tab.Screen>
        <Tab.Screen name="Search" component={Search}></Tab.Screen>
        <Tab.Screen name="Appointments" component={Appointments}></Tab.Screen>
        <Tab.Screen name="Favorites" component={Favorites}></Tab.Screen>
        <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
    </Tab.Navigator>
    );
    
}
