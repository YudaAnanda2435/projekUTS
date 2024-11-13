// src/screens/Dog.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import {
  getDogs,
  addDog,
  updateDog,
  deleteDog,
  sendDogToTitipan,
} from '../Api/dogApi';

interface Dog {
  id: string;
  name: string;
  type: string;
  owner: string;
  dateTaken: string;
}

const DogScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    type: 'Dog',
    owner: '',
    dateTaken: '',
  });
  const [dogList, setDogList] = useState<Dog[]>([]);
  const [editingDog, setEditingDog] = useState<Dog | null>(null);

  const fetchDogs = async () => {
    try {
      const response = await getDogs();
      setDogList(response);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const handleCreateDog = async () => {
    try {
      const response = await addDog(newAnimal);
      setDogList([...dogList, response]);
      setModalVisible(false);
      setNewAnimal({name: '', type: 'Dog', owner: '', dateTaken: ''});
    } catch (error) {
      console.error('Error creating dog:', error);
    }
  };

  const handleUpdateDog = async () => {
    if (editingDog) {
      try {
        const response = await updateDog(editingDog.id, newAnimal);
        setDogList(
          dogList.map(dog => (dog.id === editingDog.id ? response : dog)),
        );
        setModalVisible(false);
        setNewAnimal({name: '', type: 'Dog', owner: '', dateTaken: ''});
        setEditingDog(null);
      } catch (error) {
        console.error('Error updating dog:', error);
      }
    }
  };

  const handleDeleteDog = async (id: string) => {
    try {
      await deleteDog(id);
      setDogList(dogList.filter(dog => dog.id !== id));
    } catch (error) {
      console.error('Error deleting dog:', error);
    }
  };

  const handleSendToTitipan = async (dog: Dog) => {
    try {
      await sendDogToTitipan(dog);

      await deleteDog(dog.id);

      setDogList(dogList.filter(item => item.id !== dog.id));
    } catch (error) {
      console.error('Error sending dog to titipan:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>
        Silahkan Masukkan Data Hewan Kamu Disini!
      </Text>
      {dogList.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Image
            source={require('../assets/icon/dog1.png')}
            style={styles.noDataImage}
          />
          <Text style={styles.noDataText}>Belum ada data Dog</Text>
        </View>
      ) : (
        <FlatList
          data={dogList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.animalItem}>
              <Text style={styles.animalName}>Nama Pemilik: {item.name}</Text>
              <Text>Kontak : {item.owner}</Text>
              <Text>Tanggal Pengambilan: {item.dateTaken}</Text>
              <View style={styles.btnEdit}>
                <Button
                  color="#557C56"
                  title="Edit"
                  onPress={() => {
                    setEditingDog(item);
                    setNewAnimal({
                      name: item.name,
                      type: item.type,
                      owner: item.owner,
                      dateTaken: item.dateTaken,
                    });
                    setModalVisible(true);
                  }}
                />
              </View>
              <View style={styles.btnDelete}>
                <Button
                  title="Delete"
                  onPress={() => handleDeleteDog(item.id)}
                  color="#A0153E"
                />
              </View>
              <View style={styles.titipan}>
                <Button
                  title="Send to Titipan"
                  onPress={() => handleSendToTitipan(item)}
                  color="#FABC3F"
                />
              </View>
            </View>
          )}
        />
      )}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {editingDog ? 'Edit Dog' : 'Tambah Dog'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nama Pemilik"
            value={newAnimal.name}
            onChangeText={text => setNewAnimal({...newAnimal, name: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Kontak Aktif"
            value={newAnimal.owner}
            onChangeText={text => setNewAnimal({...newAnimal, owner: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Tanggal Pengambilan"
            value={newAnimal.dateTaken}
            onChangeText={text => setNewAnimal({...newAnimal, dateTaken: text})}
          />
          {editingDog ? (
            <Button title="Update" onPress={handleUpdateDog} />
          ) : (
            <Button title="Simpan" onPress={handleCreateDog} />
          )}
          <View style={styles.cancelBtn}>
            <Button
              title="Batal"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      <View style={styles.btnDog}>
        <Button title="Tambah Dog" onPress={() => setModalVisible(true)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#F0E68C'},
  animalItem: {
    marginTop: 20,
    padding: 30,
    marginBottom: 15,
    backgroundColor: '#FFFACD',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 1},
    elevation: 3,
  },
  titipan: {
    paddingTop: 10,
  },
  cancelBtn: {
    paddingTop: 10,
  },
  animalName: {fontSize: 16, fontWeight: 'bold', color: '#5A5A5A'},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FAFAD2',
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  btnDog: {marginTop: 10},
  btnEdit: {marginTop: 10, backgroundColor: '#557C56'},
  btnDelete: {marginTop: 10, backgroundColor: '#A0153E'},
  judul: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  noDataContainer: {alignItems: 'center', marginTop: 50},
  noDataImage: {width: 100, height: 100, resizeMode: 'contain'},
  noDataText: {fontSize: 16, color: '#888', marginTop: 10},
});

export default DogScreen;
