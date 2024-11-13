// // src/screens/MenuScreen.tsx

// import React from 'react';
// import {View, Text, Button, StyleSheet} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {RootStackParamList} from '../navigation/types';

// type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

// const MenuScreen = () => {
//   const navigation = useNavigation<MenuScreenNavigationProp>();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Pilih Penjelajahan Kamu</Text>

//       <Button
//         title="Explore Animals"
//         onPress={() => navigation.navigate('Cat')}
//       />
//       <Button
//         title="Explore Plants"
//         onPress={() => navigation.navigate('PlantsScreen')}
//       />
//       <Button
//         title="Explore Weather"
//         onPress={() => navigation.navigate('WeatherScreen')}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F3E5AB',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
// });

// export default MenuScreen;
