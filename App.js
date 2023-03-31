
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text>서울</Text>

      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: "orange"
  },
  city : {

  }
});
