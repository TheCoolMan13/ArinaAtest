import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, FlatList, ActivityIndicator,
    TouchableOpacity, Modal, TextInput, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Optional, not currently used
import { useNavigation } from '@react-navigation/native'; // ✅ Import navigation hook
import InstrumentComponent from './components/InstrumentComponent';

const MainPage = () => {
    const navigation = useNavigation(); // ✅ Use navigation

    const [instruments, setInstruments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInstrument, setSelectedInstrument] = useState(null);
    const [newInstrument, setNewInstrument] = useState({
        title: '',
        description: '',
        imageSource: '',
        uses: '',
        price: '',
        longDescription: ''
    });
    const [newInstrumentVisible, setNewInstrumentVisible] = useState(false);

    useEffect(() => {
        fetchInstruments();
    }, []);

    const fetchInstruments = async () => {
        try {
            const response = await fetch('http://localhost:3000/instruments');
            if (response.ok) {
                const data = await response.json();
                setInstruments(data);
            } else {
                console.error('Failed to fetch data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching instruments:', error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (instrument) => {
        setSelectedInstrument(instrument);
    };

    const closeModal = () => {
        setSelectedInstrument(null);
    };

    const handleSeeMoreInformation = () => {
        if (!selectedInstrument) return;
        navigation.navigate('InstrumentSeeMore', { instrument: selectedInstrument }); // ✅ Navigate correctly
    };

    const handleAddInstrument = async () => {
        try {
            const response = await fetch('http://localhost:3000/instruments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newInstrument),
            });
            if (response.ok) {
                Alert.alert('Success', 'Instrument added successfully');
                fetchInstruments();
                setNewInstrument({
                    title: '',
                    description: '',
                    imageSource: '',
                    uses: '',
                    price: '',
                    longDescription: ''
                });
                setNewInstrumentVisible(false);
            } else {
                Alert.alert('Error', 'Failed to add instrument');
            }
        } catch (error) {
            console.error('Error adding instrument:', error);
            Alert.alert('Error', 'Failed to add instrument');
        }
    };

    const handleDeleteInstrument = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/instruments/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                Alert.alert('Success', 'Instrument deleted successfully');
                fetchInstruments();
            } else {
                Alert.alert('Error', 'Failed to delete instrument');
            }
        } catch (error) {
            console.error('Error deleting instrument:', error);
            Alert.alert('Error', 'Failed to delete instrument');
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Medical Instruments</Text>

            {instruments.length === 0 ? (
                <Text style={styles.emptyMessage}>No instruments available</Text>
            ) : (
                <FlatList
                    data={instruments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <InstrumentComponent
                            title={item.title}
                            description={item.description}
                            imageSource={{ uri: item.imageSource }}
                            onPress={() => openModal(item)}
                            onDelete={() => handleDeleteInstrument(item.id)}
                        />
                    )}
                />
            )}

            <TouchableOpacity style={styles.addButton} onPress={() => setNewInstrumentVisible(true)}>
                <Text style={styles.addButtonText}>Add Instrument</Text>
            </TouchableOpacity>

            {selectedInstrument && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!selectedInstrument}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedInstrument.title}</Text>
                            <Text style={styles.modalDescription}>{selectedInstrument.longDescription}</Text>
                            <Text style={styles.modalDetails}>Uses: {selectedInstrument.uses}</Text>
                            <Text style={styles.modalDetails}>Price: ${selectedInstrument.price}</Text>

                            <TouchableOpacity onPress={handleSeeMoreInformation} style={styles.seeMoreButton}>
                                <Text style={styles.seeMoreButtonText}>See More Informations</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={closeModal} style={styles.backButton}>
                                <Text style={styles.backButtonText}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={newInstrumentVisible}
                onRequestClose={() => setNewInstrumentVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Instrument</Text>

                        {['title', 'description', 'imageSource', 'uses', 'price', 'longDescription'].map((field) => (
                            <TextInput
                                key={field}
                                style={styles.input}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={newInstrument[field]}
                                onChangeText={(text) => setNewInstrument({ ...newInstrument, [field]: text })}
                            />
                        ))}

                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity style={styles.addButton} onPress={handleAddInstrument}>
                                <Text style={styles.addButtonText}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setNewInstrumentVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 15,
        backgroundColor: '#f4f7f9',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2E7D32',
        textAlign: 'center',
        marginVertical: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessage: {
        fontSize: 18,
        textAlign: 'center',
        color: '#888',
        marginTop: 20,
    },
    addButton: {
        backgroundColor: '#2E7D32',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    addButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 20,
        backgroundColor: '#e0e0e0',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    cancelButton: {
        marginVertical: 10,
        backgroundColor: '#e0e0e0',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    modalDescription: {
        fontSize: 16,
        color: '#555',
        marginTop: 10,
        textAlign: 'center',
    },
    modalDetails: {
        fontSize: 14,
        color: '#555',
        marginVertical: 5,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    seeMoreButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    seeMoreButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default MainPage;
