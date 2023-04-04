import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';

const{width:SCREEN_SIZE} = Dimensions.get('window');

export default function App() {
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async () => {
    
    const local = await Location.requestForegroundPermissionsAsync();
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if(!granted) {
      setOk(false);
    }
    console.log(local);

    const userLocation = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, accuracy: Location.Accuracy.Highest, timeout: 10000});
    console.log(userLocation);
    console.log('?');
  };

  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled 
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desctiption}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desctiption}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desctiption}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desctiption}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato'
  },
  city : {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityName : {
    fontSize :68,
    fontWeight : '500',
  },
  weather : {
  },
  day : {
    width: SCREEN_SIZE,
    alignItems : 'center',
  },
  temp : {
    marginTop: 50,
    fontSize: 168,
  },
  desctiption : {
    marginTop: -50,
    fontSize: 60,
  }
});
