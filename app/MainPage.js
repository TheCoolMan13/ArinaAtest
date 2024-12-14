import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Modal, Pressable, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // If using Expo
import InstrumentComponent from './components/InstrumentComponent';

const MainPage = () => {
    const [instruments, setInstruments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInstrument, setSelectedInstrument] = useState(null);  // Track selected instrument for modal
    const [newInstrument, setNewInstrument] = useState({
        title: '',
        description: '',
        imageSource: '',
        uses: '',
        price: '',
        longDescription: ''
    });  // New instrument data
    const [newInstrumentVisible, setNewInstrumentVisible] = useState(false);  // New state to control the "Add Instrument" modal visibility

    useEffect(() => {
        // Fetch instruments data from the backend API
        fetchInstruments();
    }, []);

    // Function to fetch the instruments from the backend
    const fetchInstruments = async () => {
        try {
            const response = await fetch('http://localhost:3000/instruments'); // Replace with your backend URL
            if (response.ok) {
                const data = await response.json();
                setInstruments(data);  // Set fetched data
            } else {
                console.error('Failed to fetch data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching instruments:', error);
        } finally {
            setLoading(false);  // Stop loading after fetch attempt
        }
    };

    const openModal = (instrument) => {
        setSelectedInstrument(instrument);
        //setModalVisible(true);
    };
    // Function to close the modal
    const closeModal = () => {
        setSelectedInstrument(null);  // Clear the selected instrument to close the modal
    };

    // Function to handle adding a new instrument
    const handleAddInstrument = async () => {
        try {
            const response = await fetch('http://localhost:3000/instruments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newInstrument),
            });
            if (response.ok) {
                Alert.alert('Success', 'Instrument added successfully');
                // Refresh the instrument list after adding
                fetchInstruments();
                setNewInstrument({
                    title: '',
                    description: '',
                    imageSource: '',
                    uses: '',
                    price: '',
                    longDescription: ''
                });
                setNewInstrumentVisible(false); // Close the modal after adding
            } else {
                Alert.alert('Error', 'Failed to add instrument');
            }
        } catch (error) {
            console.error('Error adding instrument:', error);
            Alert.alert('Error', 'Failed to add instrument');
        }
    };

    // Function to handle deleting an instrument
    const handleDeleteInstrument = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/instruments/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                Alert.alert('Success', 'Instrument deleted successfully');
                // Refresh the instrument list after deleting
                fetchInstruments();
            } else {
                Alert.alert('Error', 'Failed to delete instrument');
            }
        } catch (error) {
            console.error('Error deleting instrument:', error);
            Alert.alert('Error', 'Failed to delete instrument');
        }
    };

    // If data is still being fetched, show a loading spinner
    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Render the instruments using FlatList
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Medical Instruments</Text>

            {/* If there are no instruments, show this message */}
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

            {/* Add Button */}
            <TouchableOpacity style={styles.addButton} onPress={() => setNewInstrumentVisible(true)}>
                <Text style={styles.addButtonText}>Add Instrument</Text>
            </TouchableOpacity>

            {/* Modal for more information */}
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
                            {/* Back Button to close the modal */}
                            <TouchableOpacity onPress={closeModal} style={styles.backButton}>
                                <Text style={styles.backButtonText}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

            {/* Modal for adding a new instrument */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={newInstrumentVisible}
                onRequestClose={() => setNewInstrumentVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Instrument</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={newInstrument.title}
                            onChangeText={(text) => setNewInstrument({ ...newInstrument, title: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={newInstrument.description}
                            onChangeText={(text) => setNewInstrument({ ...newInstrument, description: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Image Source"
                            value={newInstrument.imageSource}
                            onChangeText={(text) => setNewInstrument({ ...newInstrument, imageSource: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Uses"
                            value={newInstrument.uses}
                            onChangeText={(text) => setNewInstrument({ ...newInstrument, uses: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            value={newInstrument.price}
                            onChangeText={(text) => setNewInstrument({ ...newInstrument, price: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Long Description"
                            value={newInstrument.longDescription}
                            onChangeText={(text) => setNewInstrument({ ...newInstrument, longDescription: text })}
                        />

                        {/* Add and Cancel Buttons */}
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
    instrumentCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        elevation: 2,
    },
    instrumentTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    instrumentDescription: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    deleteIcon: {
        marginTop: 10,
        alignSelf: 'flex-end',
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
    deleteIcon: {
        position: 'absolute',
        top: 10, // Adjust as needed to align with the top of the card
        right: 10, // Align with the right edge of the card
        width: 24,  // Set the width of the delete button to match the icon size
        height: 24,  // Set the height to match the icon size
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',  // Remove any background to avoid overlay
    },

    deleteButton: {
        padding: 5,  // Ensure there's no extra space around the icon
        backgroundColor: 'transparent',  // Make the background transparent so it only shows the icon
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
});

export default MainPage;
