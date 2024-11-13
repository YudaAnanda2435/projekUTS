// // src/screens/QuizScreen.tsx
// import React from 'react';
// import {View, Text, Button, StyleSheet} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {RootStackParamList} from '../Navigation/types'; // Impor tipe RootStackParamList

// type QuizScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>;

// const QuizScreen = () => {
//   const navigation = useNavigation<QuizScreenNavigationProp>();

//   const startQuiz = (category: string) => {
//     navigation.navigate('QuizDetail', {category});
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Wah Hebat, Belajar Dengan Siapa Kamu Hari Ini?
//       </Text>
//       <View style={styles.buttonContainer}>
//         <Button title="Plants" onPress={() => startQuiz('Plants')} />
//       </View>
//       <View style={styles.buttonContainer}>
//         <Button title="Animals" onPress={() => startQuiz('Animals')} />
//       </View>
//       <View style={styles.buttonContainer}>
//         <Button title="Weather" onPress={() => startQuiz('Weather')} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, padding: 20, backgroundColor: '#F0E68C'},
//   title: {fontSize: 18, fontWeight: 'bold', marginBottom: 20},
//   buttonContainer: {marginVertical: 10},
// });

// export default QuizScreen;
