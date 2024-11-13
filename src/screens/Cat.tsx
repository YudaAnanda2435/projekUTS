import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import {
  getCats,
  addCat,
  updateCat,
  deleteCat,
  sendCatToTitipan,
} from '../Api/catApi';

const Cat = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    type: 'Cat',
    owner: '',
    dateTaken: '',
  });
  const [CatList, setCatList] = useState<any[]>([]);
  const [editingCat, setEditingCat] = useState<any | null>(null);

  const fetchCats = async () => {
    try {
      const response = await getCats();
      setCatList(response);
    } catch (error) {
      console.error('Error fetching cats:', error);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleCreateCat = async () => {
    try {
      const response = await addCat(newAnimal);
      setCatList([...CatList, response]);
      setModalVisible(false);
      setNewAnimal({name: '', type: 'Cat', owner: '', dateTaken: ''});
    } catch (error) {
      console.error('Error creating cat:', error);
    }
  };

  const handleUpdateCat = async () => {
    if (editingCat) {
      try {
        const response = await updateCat(editingCat.id, newAnimal);
        setCatList(
          CatList.map(cat => (cat.id === editingCat.id ? response : cat)),
        );
        setModalVisible(false);
        setNewAnimal({name: '', type: 'Cat', owner: '', dateTaken: ''});
        setEditingCat(null);
      } catch (error) {
        console.error('Error updating cat:', error);
      }
    }
  };

  const handleDeleteCat = async (id: number) => {
    try {
      await deleteCat(id);
      setCatList(CatList.filter(cat => cat.id !== id));
    } catch (error) {
      console.error('Error deleting cat:', error);
    }
  };

  const handleSendToTitipan = async (cat: any) => {
    try {
      await sendCatToTitipan(cat);
      await deleteCat(cat.id);
      setCatList(CatList.filter(item => item.id !== cat.id));
    } catch (error) {
      console.error('Error sending cat to Titipan:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>
        Silahkan Masukkan Data Hewan Kamu Disini!
      </Text>
      {CatList.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Image
            source={require('../assets/icon/kucing1.png')}
            style={styles.noDataImage}
          />
          <Text style={styles.noDataText}>
            Belum ada data kucing. Silakan tambah data kucing baru.
          </Text>
        </View>
      ) : (
        <FlatList
          data={CatList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.animalItem}>
              <Text style={styles.animalName}>Nama Pemilik: {item.name}</Text>
              <Text>Kontak: {item.owner}</Text>
              <Text>Tanggal Pengambilan: {item.dateTaken}</Text>
              <View style={styles.btnEdit}>
                <Button
                  color="#557C56"
                  title="Edit"
                  onPress={() => {
                    setEditingCat(item);
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
                  onPress={() => handleDeleteCat(item.id)}
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
            {editingCat ? 'Edit Cat' : 'Tambah Cat'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nama Cat"
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
          {editingCat ? (
            <Button title="Update" onPress={handleUpdateCat} />
          ) : (
            <Button title="Simpan" onPress={handleCreateCat} />
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
      <View style={styles.btnCat}>
        <Button title="Tambah Cat" onPress={() => setModalVisible(true)} />
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
  btnCat: {marginTop: 10},
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

export default Cat;
