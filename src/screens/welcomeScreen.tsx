// src/screens/WelcomeScreen.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/types';
import {useNavigation} from '@react-navigation/native';

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {}
      <Image
        source={require('../assets/icon/started.png')}
        style={styles.image}
      />

      {}
      <View style={styles.textStart}>
        <Text style={styles.text}>Titipkan Hewan Kamu Di</Text>
        <Text style={styles.title}>GOOD ANIMAL</Text>
      </View>
      {/* Button section */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.btnText}>Lets Go!!!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#219B9D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    elevation: 8,
  },
  textStart: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnText: {
    fontSize: 20,
  },
  btn: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 80,
  },
});
