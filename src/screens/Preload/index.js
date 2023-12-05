import React, {useEffect, useContext} from 'react';
import { Container, LoadingIcon } from './styles';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api'
import BarberLogo from '../../assets/barber.svg';

export default()=>{

    const navigation = useNavigation();
    const {dispatch: userDispatch} = useContext(UserContext);

    useEffect(()=>{
    
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if(token){
                let res = await Api.checkToken(token);
                if(res.token){
                    await AsyncStorage.setItem('token', res.token);
                    userDispatch({
                        type:'setAvatar',
                        payload:{
                            avatar: res.data.avatar
                        }
                    });

                    navigation.reset({
                        routes:[{name:'MainTab'}]
                    });
                }else{
                    alert("Error:"+res.error);
                }
            }
            else{
                navigation.navigate('SignIn');
            }
        }
        checkToken();

    },[])

    return(
        <Container>
            <BarberLogo width="100%" height="160"></BarberLogo>
            <LoadingIcon size="large" color="#fff"></LoadingIcon>
        </Container>
    );
}