import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import homeReducer, {homeActions} from '../pages/Home/homeSlice';
import baseURL from '../component/baseUrl';
import apiKey from '../component/apiKey';
import Geolocation from '@react-native-community/geolocation';

export default function HomeScreen() {
  const [latitude, setLatitude] = useState(6.5139443);
  const [longitude, setLongitude] = useState(80.2302281);
  const [time, setTime] = useState('00.00.00');
  const [date, setDate] = useState('dd.mm.yyyy');

  const kelvin = 273.15;
  const {weatherDetails} = useSelector(state => state.homeReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    refresh();
    Geolocation.getCurrentPosition(info => {
      setLatitude(info?.coords?.latitude);
      setLongitude(info?.coords?.longitude);
    });
  }, []);

  const refresh = () => {
    getCurrentTime();
    getDate();
    getWeather();
  };
  const getWeather = async () => {
    await axios
      .get(`${baseURL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      .then(response => {
        if (response.status === 200) {
          const temp = response?.data?.main?.temp;
          let temperture = (temp - kelvin).toFixed(2);
          dispatch(homeActions.weatherDetailsSuccess(temperture));
        }
      })
      .catch(error => {
        Alert.alert('error', error);
      });
  };

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    let currentDate = `${month}/${date}/${year}`;
    setDate(currentDate);
  }
  const getCurrentTime = () => {
    let today = new Date();
    let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
    let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
    let time = hours + ':' + minutes + ':' + seconds;
    setTime(time);
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.img}>
        <Image style={styles.img} source={require('../assets/sun.png')} />
      </View>
      <View style={styles.refreshBtnView}>
        <TouchableOpacity onPress={refresh} style={styles.refreshBtn}>
          <Image
            style={{width: 40, height: 40}}
            source={require('../assets/refresh1.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.weatherDetails}>
        <View style={styles.dateView}>
          <View style={styles.nameView}>
            <Text style={styles.date}>Latitude</Text>
          </View>
          <View style={styles.dataView}>
            <Text style={styles.date}>{latitude.toFixed(8)}</Text>
          </View>
        </View>
        <View style={styles.dateView}>
          <View style={styles.nameView}>
            <Text style={styles.date}>Longitude</Text>
          </View>
          <View style={styles.dataView}>
            <Text style={styles.date}>{longitude.toFixed(8)}</Text>
          </View>
        </View>
        <View style={styles.dateView}>
          <View style={styles.nameView}>
            <Text style={styles.date}>Date</Text>
          </View>
          <View style={styles.dataView}>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <View style={styles.timeView}>
          <View style={styles.nameView}>
            <Text style={styles.date}>Time</Text>
          </View>
          <View style={styles.dataView}>
            <Text style={styles.date}>{time}</Text>
          </View>
        </View>
        <View style={styles.tempView}>
          <View style={styles.nameView}>
            <Text style={styles.temp}>Temp</Text>
          </View>
          <View style={styles.celsiusView}>
            <Text style={styles.celsius}>
              {weatherDetails}
              <Text style={{fontSize: 80}}> °C</Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    height: '100%',
    backgroundColor: '#50daf2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  img: {
    width: '20%',
    height: '30%',
    alignItems: 'center',
    marginBottom: '10%',
  },
  weatherDetails: {
    marginTop: '10%',
    height: '50%',
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'rgba(55,61,71,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateView: {
    marginTop: 10,
    width: '100%',
    height: '10%',
    paddingLeft: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  nameView: {width: '20%'},
  dataView: {width: '80%', alignItems: 'center'},
  timeView: {
    marginTop: 10,
    width: '100%',
    height: '10%',
    paddingLeft: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tempView: {
    marginTop: 10,
    width: '100%',
    height: '40%',
    paddingLeft: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  date: {
    color: '#fff',
    fontSize: 18,
  },
  temp: {
    color: '#fff',
    fontSize: 18,
  },
  celsiusView: {
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  celsius: {
    color: '#fff',
    fontSize: 100,
  },
  refreshBtnView: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshBtn: {
    width: 50,
    height: 50,
  },
  img: {
    width: 200,
    height: 200,
  },
});
