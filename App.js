import { useEffect, useState } from "react";
import {ActivityIndicator, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';
const{width:SCREEN_SIZE} = Dimensions.get('window');
const API_KEY = 'ada9dd1179f6c3988f52c7bf3044574a';

const icons = {
  Clouds : "cloudy",
  Clear : "day-sunny",
  Thunderstorm : "lighning",
  Drizzle : "rain",
  Rain : "umbrella",
  Snow : "snow",
  Mist : "fog",
  Smoke : "fog",
  Haze : "fog",
  Dust : "fog",
  Fog : "fog",
  Sand : "fog",
  Dust : "fog",
  Ash : "fog",
  Squall : "fog",
  Tornado : "fog"
}

export default function App() {
  const [city, setCity] = useState('Loading....');
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
  
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if(!granted) {
      setOk(false);
    }
    const latitude = 37.56980;
    const longitude = 126.97296;
    //const {latitude, longitude} = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, accuracy: Location.Accuracy.Highest, timeout: 10000});
    //const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
    const location = await Location.reverseGeocodeAsync({ latitude , longitude}, {useGoogleMaps: false});
    setCity(location[0].district);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`);
    const json = await response.json();
    setDays(
      json.list.filter((weather) => {

        if (weather.dt_txt.includes("12:00:00")) {
          
        return weather;
        }
      })
    )

  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled 
        contentContainerStyle={styles.weather}
      >
        
        {days.length === 0 ? (<View style={{...styles.day, alignItems : "center"}}>
          <ActivityIndicator color="white" style={{}} />  
        </View>) : (
          days.map((day, index) => 
          <View key={index} style={styles.day}>
            <Text style={styles.tinyDay}>{day.dt_txt.substring(0, 10)}</Text>
            <View style={{flexDirection : "row", alignItems : "flex-start", justifyContent: "space-between", width : "90%"}}>
              <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1) }</Text>
              <Fontisto name={icons[day.weather[0].main]} size={68} color="white" />
            </View>
            <Text style={styles.desctiption}>{day.weather[0].main}</Text>
            <Text style={styles.tinyText}>{day.weather[0].description}</Text>
          </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize :68,
    fontWeight : '500',
    color : 'white',
  },
  day: {
    width: SCREEN_SIZE,
    alignItems : 'flex-start',
  },
  temp: {
    marginTop: 30,
    fontSize: 118,
    color : 'white',
    marginLeft : 10,
  },
  desctiption: {
    marginTop: -20,
    fontSize: 40,
    color : 'white',
    marginLeft : 10,
  },
  tinyText: {
    fontSize: 20,
    color : 'white',
    marginLeft : 10,
  },
  tinyDay: {
    marginLeft : 10,
    marginTop: 20,
    fontSize: 20,
    color : 'white',
  }
});
