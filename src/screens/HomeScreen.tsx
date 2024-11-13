import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/types';

// Define navigation types for HomeScreen
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Sample animal data for navigation
const dogData = {
  name: 'Doggo',
  image: 'dog-image.png',
  description: 'A friendly dog.',
  type: 'Dog',
  owner: 'John Doe',
  dateTaken: '2024-11-11',
};

const catData = {
  name: 'Whiskers',
  image: 'cat-image.png',
  description: 'A playful cat.',
  type: 'Cat',
  owner: 'Jane Doe',
  dateTaken: '2024-11-11',
};

const rabbitData = {
  name: 'Floppy',
  image: 'rabbit-image.png',
  description: 'A cute rabbit.',
  type: 'Rabbit',
  owner: 'Alice Doe',
  dateTaken: '2024-11-11',
};


  return (
    <ScrollView style={styles.container}>
      {/* Banner Image */}
      <Image
        source={require('../assets/icon/heading.png')}
        style={styles.inves}
      />
      <Text style={styles.title}>
        Selamat Datang Di Rumah Hewan! {'\n'} 🐈🐕🐇
      </Text>

      {/* Dog Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dog Animal Data</Text>
        <View style={styles.imageRow}>
          <Image
            source={require('../assets/icon/dog1.png')}
            style={styles.image}
          />
          <Image
            source={require('../assets/icon/dog2.png')}
            style={styles.image}
          />
          <Image
            source={require('../assets/icon/dog3.png')}
            style={styles.image}
          />
        </View>
        <Button
          title="Manage"
          onPress={() => navigation.navigate('Dog', {animal: dogData})}
          color="#219B9D"
        />
      </View>

      {/* Cat Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cat Animal Data</Text>
        <View style={styles.imageRow}>
          <Image
            source={require('../assets/icon/kucing1.png')}
            style={styles.image}
          />
          <Image
            source={require('../assets/icon/kucing2.png')}
            style={styles.image}
          />
          <Image
            source={require('../assets/icon/kucing3.png')}
            style={styles.image}
          />
        </View>
        <Button
          title="Manage"
          onPress={() => navigation.navigate('Cat', {animal: catData})}
          color="#219B9D"
        />
      </View>

      {/* Rabbit Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rabbit Animal Data</Text>
        <View style={styles.imageRow}>
          <Image
            source={require('../assets/icon/rabbit1.png')}
            style={styles.image}
          />
          <Image
            source={require('../assets/icon/rabbit2.png')}
            style={styles.image}
          />
          <Image
            source={require('../assets/icon/rabbit3.png')}
            style={styles.image}
          />
        </View>
        <Button
          title="Manage"
          onPress={() => navigation.navigate('Rabbit', {animal: rabbitData})}
          color="#219B9D"
        />
      </View>

      {/* Footer Navigation */}
      <View style={styles.imageRowSmall}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../assets/icon/Unhome.png')}
            style={styles.smallImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../assets/icon/menu.png')}
            style={styles.smallImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Titipan')}>
          <Image
            source={require('../assets/icon/menu.png')}
            style={styles.smallImage}
          />
        </TouchableOpacity>
      </View>

      {/* Padding at the bottom for spacing */}
      <View style={styles.paddingBottom}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#E9EED9'},
  inves: {width: '100%', height: 120, borderRadius: 10, marginBottom: 20, elevation: 10, objectFit: 'cover'},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {marginVertical: 10},
  sectionTitle: {fontSize: 16, marginBottom: 5, fontWeight: '600'},
  imageRow: {
    flexDirection: 'row', // Arrange images horizontally
    justifyContent: 'space-between',
    marginBottom: 10,
    elevation: 8,
  },
  imageRowSmall: {
    flexDirection: 'row', // Arrange small images horizontally
    justifyContent: 'space-around',
    marginBottom: 4,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    elevation: 8,
  },
  smallImage: {
    width: 24, // Smaller size for bottom images
    height: 24,
    borderRadius: 0,
  },
  paddingBottom: {
    paddingBottom: 30, // Add bottom padding for spacing
  },
});

export default HomeScreen;
