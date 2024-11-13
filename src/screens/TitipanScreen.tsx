// import React, {useEffect, useState} from 'react';
// import {View, Text, StyleSheet, FlatList, Button, Alert} from 'react-native';
// import {getTitipanDogs} from '../Api/dogApi';
// import {getTitipanCats} from '../Api/catApi';
// import {getTitipanRabbits} from '../Api/rabbitApi';
// import {deleteDog} from '../Api/titipanApi';
// import {deleteCat} from '../Api/titipanApi';
// import {deleteRabbit} from '../Api/titipanApi';

// interface TitipanAnimal {
//   id: string;
//   name: string;
//   type: string;
//   dateTaken: string;
// }

// const TitipanScreen = () => {
//   const [titipanList, setTitipanList] = useState<TitipanAnimal[]>([]);

//   const fetchTitipanAnimals = async () => {
//     try {
//       const [dogs, cats, rabbits] = await Promise.all([
//         getTitipanDogs(),
//         getTitipanCats(),
//         getTitipanRabbits(),
//       ]);
//       setTitipanList([...dogs, ...cats, ...rabbits]);
//     } catch (error) {
//       console.error('Error fetching titipan animals:', error);
//     }
//   };

//   const handleDeleteAnimal = async (id: string, type: string) => {
//     console.log('Deleting animal with ID:', id, 'and type:', type);

//     const confirmMessage =
//       type === 'dog'
//         ? 'hewan titipan dog'
//         : type === 'cat'
//         ? 'hewan titipan cat'
//         : 'hewan titipan rabbit';

//     Alert.alert(
//       'Konfirmasi',
//       `Apakah Anda yakin ingin menghapus data ${confirmMessage} ini?`,
//       [
//         {
//           text: 'Batal',
//           style: 'cancel',
//         },
//         {
//           text: 'Hapus',
//           onPress: async () => {
//             try {
//               console.log(`Deleting animal of type: ${type}`);
//               if (type === 'dog') {
//                 await deleteDog(id);
//               } else if (type === 'cat') {
//                 await deleteCat(id);
//               } else {
//                 await deleteRabbit(id);
//               }
//               fetchTitipanAnimals();
//             } catch (error) {
//               console.error(`Error deleting ${type}:`, error);
//             }
//           },
//           style: 'destructive',
//         },
//       ],
//     );
//   };

//   useEffect(() => {
//     fetchTitipanAnimals();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Daftar Hewan Titipan</Text>
//       {titipanList.length === 0 ? (
//         <Text style={styles.noDataText}>Tidak ada hewan titipan saat ini</Text>
//       ) : (
//         <FlatList
//           data={titipanList}
//           keyExtractor={item => item.id.toString()}
//           renderItem={({item}) => (
//             <View style={styles.animalItem}>
//               <Text style={styles.animalName}>Nama Pemilik: {item.name}</Text>
//               <Text>Jenis Hewan: {item.type}</Text>
//               <Text>Tanggal Pengambilan: {item.dateTaken}</Text>
//               <View style={styles.btnDelete}>
//                 <Button
//                   title="Hapus"
//                   onPress={() => handleDeleteAnimal(item.id, item.type)}
//                   color="#A0153E"
//                 />
//               </View>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, padding: 20, backgroundColor: '#F9F9F9'},
//   title: {fontSize: 18, fontWeight: 'bold', marginBottom: 20},
//   animalItem: {
//     padding: 15,
//     marginVertical: 8,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     elevation: 3,
//   },
//   btnDelete: {paddingTop: 14},
//   animalName: {fontSize: 16, fontWeight: 'bold'},
//   noDataText: {textAlign: 'center', color: '#888', marginTop: 20},
// });

// export default TitipanScreen;

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {getTitipanDogs} from '../Api/dogApi';
import {getTitipanCats} from '../Api/catApi';
import {getTitipanRabbits} from '../Api/rabbitApi';

interface TitipanAnimal {
  id: string;
  name: string;
  type: string;
  dateTaken: string;
  isExported?: boolean;
}

const TitipanScreen = () => {
  const [titipanList, setTitipanList] = useState<TitipanAnimal[]>([]);

  const fetchTitipanAnimals = async () => {
    try {
      const [dogs, cats, rabbits] = await Promise.all([
        getTitipanDogs(),
        getTitipanCats(),
        getTitipanRabbits(),
      ]);
      setTitipanList([...dogs, ...cats, ...rabbits]);
    } catch (error) {
      console.error('Error fetching titipan animals:', error);
    }
  };

  useEffect(() => {
    fetchTitipanAnimals();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Hewan Titipan</Text>
      {titipanList.length === 0 ? (
        <Text style={styles.noDataText}>Tidak ada hewan titipan saat ini</Text>
      ) : (
        <FlatList
          data={titipanList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.animalItem}>
              <Text style={styles.animalName}>Nama Pemilik: {item.name}</Text>
              <Text>Jenis Hewan: {item.type}</Text>
              <Text>Tanggal Pengambilan: {item.dateTaken}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#F9F9F9'},
  title: {fontSize: 18, fontWeight: 'bold', marginBottom: 20},
  animalItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 3,
  },
  animalName: {fontSize: 16, fontWeight: 'bold'},
  noDataText: {textAlign: 'center', color: '#888', marginTop: 20},
});

export default TitipanScreen;

