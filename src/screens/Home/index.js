import React,{useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/core';

import { Platform, RefreshControl } from 'react-native';
// import {request, PERMISSIONS} from 'react-native-permissions';
//import Geolocation from '@react-native-community/geolocation';

import * as Location from 'expo-location';

import Api from '../../Api'

import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTittle,
    SearchBottom,

    LocationArea,
    LocationInput,
    LocationFinder,
    ListArea,

    LoadingIcon
} from './styles';

import BarberItem from '../../components/BarberItem'

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

export default () =>{

    const navigation = useNavigation();
    const [locationText, setLocationText] = useState();
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const [location, setLocation] = useState(null);

    const [refreshing, setRefreshing] = useState(false)


    const handleLocationFinder = async ()=>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        setLoading(true);
        setLocationText("");
        setList([]);
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        getBarbers();
    }

    const getBarbers = async ()=>{
        setLoading(true);
        setList([]);
        console.log(location)
        let lat = null;
        let lng = null;
        if(location){
            lat= location.coords.latitude;
            lng= location.coords.longitude;
        }


        
        let res = await Api.getBarbers(lat,lng, locationText);
        // console.log(res)
        if(res.error ==''){
            if(res.loc){
                setLocationText(res.loc);
            }
            setList(res.data);
        } else {
            alert("Erro: " + res.error)
        }

        setLoading(false);
    }
    useEffect(()=>{
        getBarbers();
    },[])

    const onRefresh = ()=>{
        setLoading(false);
        getBarbers();
    }
    const handleLocationSearch =()=>{
        setLocation({});
        getBarbers();
    }

    return(
        <Container>
            <Scroller refreshControl={
            <RefreshControl 
                refreshing={refreshing}
                onRefresh={onRefresh}
            ></RefreshControl>}>
                <HeaderArea>
                    <HeaderTittle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTittle>
                    <SearchBottom onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#ffffff"></SearchIcon>
                    </SearchBottom>
                </HeaderArea>

                <LocationArea>
                    <LocationInput

                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                        onEndEditing={handleLocationSearch}

                    ></LocationInput>
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="26" height="26" fill="#ffffff"></MyLocationIcon>
                    </LocationFinder>
                </LocationArea>

                {loading && 
                    <LoadingIcon size="large" color="#ffffff"></LoadingIcon>
                }
                <ListArea>
                    {list.map((item, k)=>(
                        <BarberItem key={k} data={item}></BarberItem>
                    ))}
                </ListArea>


            </Scroller>
        </Container>
    );
}