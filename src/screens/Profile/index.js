import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Platform, RefreshControl, Alert } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';

import Api from '../../Api';

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  AvatarArea,
  Avatar,
  AvatarButton,
  AvatarIcon,
  UserInfoArea,
  UserInfoText,
  LogoutButton,
  LogoutButtonText,
} from './styles';

export default () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: null,
  });

  useEffect(() => {
    const loadUserInfo = async () => {
      setLoading(true);

      // Carrega as informações do usuário do AsyncStorage
      const userStorage = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(userStorage);

      if (parsedUser) {
        setUser(parsedUser);
      }

      setLoading(false);
    };

    loadUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      // Limpa os dados de autenticação no AsyncStorage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');

      // Redireciona para a tela de login ou outra tela inicial
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
      // Trate o erro conforme necessário
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);

    // Atualiza as informações do usuário
    const token = await AsyncStorage.getItem('token');
    const response = await Api.checkToken(token);

    if (response.error) {
      Alert.alert('Erro', response.error);
    } else {
      setUser(response.data);
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
    }

    setRefreshing(false);
  };

  const handleChooseAvatar = () => {
    // Opções de configuração para a escolha de imagem
    const options = {
      title: 'Escolha uma imagem',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Escolha de imagem cancelada');
      } else if (response.error) {
        console.error('Erro ao escolher imagem:', response.error);
      } else {
        // Atualiza o estado do usuário com a nova imagem
        setUser((prevUser) => ({ ...prevUser, avatar: response.uri }));
        // Aqui você pode enviar a imagem para o seu servidor ou fazer o que for necessário
      }
    });
  };

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>Seu Perfil</HeaderTitle>
        </HeaderArea>

        <AvatarArea>
          <AvatarButton onPress={handleChooseAvatar}>
            <Avatar source={{ uri: user.avatar }} />
            <AvatarIcon name="camera" size={24} />
          </AvatarButton>
        </AvatarArea>

        <UserInfoArea>
          <UserInfoText>Nome: {user.name}</UserInfoText>
          <UserInfoText>Email: {user.email}</UserInfoText>
        </UserInfoArea>

        <LogoutButton onPress={handleLogout}>
          <LogoutButtonText>Sair</LogoutButtonText>
        </LogoutButton>
      </Scroller>
    </Container>
  );
};
export { AvatarIcon };