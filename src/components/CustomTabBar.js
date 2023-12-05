import React, { useContext } from 'react';
import styled from 'styled-components/native';

import { UserContext } from '../contexts/UserContext';

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';


const TabArea = styled.View`
    height: 60px;
    background-color: #4FADBE;
    flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 35px;
    border: 3px solid #4FADBE;
    margin-top: -20px;
`;
const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius:12px;
`;


export default ({state, navigation})=>{

    //utilizado para pegar as informações do perfil do usuário "avatar"
    const { state:user } = useContext(UserContext);

    //Controla para qual tela para botão irá redirecionar
    const goTo =(screenName)=>{
        navigation.navigate(screenName);
    }

    return(
        <TabArea>
            <TabItem onPress={()=>goTo('Home')}>
                {/* style - utiliza o state para saber se a tela esta ou não selecionada, se estizer, o estilo faz a 
                cor do icone ficar mais clara */}
                <HomeIcon style={{opacity: state.index===0? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"></HomeIcon>
            </TabItem>
            <TabItem onPress={()=>goTo('Search')}>
                <SearchIcon style={{opacity: state.index===1? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"></SearchIcon>
            </TabItem>
            <TabItemCenter onPress={()=>goTo('Appointments')}>
                <TodayIcon width="32" height="32" fill="#4FADBE"></TodayIcon>
            </TabItemCenter>
            <TabItem onPress={()=>goTo('Favorites')}> 
                <FavoriteIcon style={{opacity: state.index===3? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"></FavoriteIcon>
            </TabItem>
            <TabItem onPress={()=>goTo('Profile')}>
                {user.avatar != ''?
                    <AvatarIcon source={{uri: user.avatar}}/>
                    :
                    <AccountIcon style={{opacity: state.index===4? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"></AccountIcon>
                }   
            </TabItem>
        </TabArea>
    );
}