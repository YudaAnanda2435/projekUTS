// src/screens/Rabbit.tsx
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
  getRabbit,
  addRabbit,
  updateRabbit,
  deleteRabbit,
  sendRabbitToTitipan,
} from '../Api/rabbitApi';

const Rabbit = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newRabbit, setNewRabbit] = useState({
    name: '',
    type: 'Rabbit',
    owner: '',
    dateTaken: '',
  });
  const [rabbitList, setRabbitList] = useState<any[]>([]);
  const [editingRabbit, setEditingRabbit] = useState<any | null>(null);

  const fetchRabbits = async () => {
    try {
      const response = await getRabbit();
      setRabbitList(response);
    } catch (error) {
      console.error('Error fetching rabbits:', error);
    }
  };

  useEffect(() => {
    fetchRabbits();
  }, []);

  const handleCreateRabbit = async () => {
    try {
      const response = await addRabbit(newRabbit);
      setRabbitList([...rabbitList, response]);
      setModalVisible(false);
      setNewRabbit({name: '', type: 'Rabbit', owner: '', dateTaken: ''});
    } catch (error) {
      console.error('Error creating rabbit:', error);
    }
  };

  const handleUpdateRabbit = async () => {
    if (editingRabbit) {
      try {
        const response = await updateRabbit(editingRabbit.id, newRabbit);
        setRabbitList(
          rabbitList.map(rabbit =>
            rabbit.id === editingRabbit.id ? response : rabbit,
          ),
        );
        setModalVisible(false);
        setNewRabbit({name: '', type: 'Rabbit', owner: '', dateTaken: ''});
        setEditingRabbit(null);
      } catch (error) {
        console.error('Error updating rabbit:', error);
      }
    }
  };

  const handleDeleteRabbit = async (id: number) => {
    try {
      await deleteRabbit(id);
      setRabbitList(rabbitList.filter(rabbit => rabbit.id !== id));
    } catch (error) {
      console.error('Error deleting rabbit:', error);
    }
  };

  const handleSendToTitipan = async (rabbit: any) => {
    try {
      await sendRabbitToTitipan(rabbit);
      await deleteRabbit(rabbit.id);
      setRabbitList(rabbitList.filter(item => item.id !== rabbit.id));
    } catch (error) {
      console.error('Error sending rabbit to Titipan:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>
        Silahkan Masukkan Data Hewan Kamu Disini!
      </Text>
      {rabbitList.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Image
            source={require('../assets/icon/rabbit2.png')}
            style={styles.noDataImage}
          />
          <Text style={styles.noDataText}>Belum ada data Rabbit</Text>
        </View>
      ) : (
        <FlatList
          data={rabbitList}
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
                    setEditingRabbit(item);
                    setNewRabbit({
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
                  onPress={() => handleDeleteRabbit(item.id)}
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
            {editingRabbit ? 'Edit Rabbit' : 'Tambah Rabbit'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nama Pemilik"
            value={newRabbit.name}
            onChangeText={text => setNewRabbit({...newRabbit, name: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Kontak Aktif"
            value={newRabbit.owner}
            onChangeText={text => setNewRabbit({...newRabbit, owner: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Tanggal Pengambilan"
            value={newRabbit.dateTaken}
            onChangeText={text => setNewRabbit({...newRabbit, dateTaken: text})}
          />
          {editingRabbit ? (
            <Button title="Update" onPress={handleUpdateRabbit} />
          ) : (
            <Button title="Simpan" onPress={handleCreateRabbit} />
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
        <Button title="Tambah Rabbit" onPress={() => setModalVisible(true)} />
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
  titipan: {paddingTop: 10},
  cancelBtn: {paddingTop: 10},
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

export default Rabbit;
