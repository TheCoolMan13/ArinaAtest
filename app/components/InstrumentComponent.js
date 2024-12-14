import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Import the delete icon from Ionicons

const InstrumentComponent = ({ title, description, imageSource, onPress, onDelete }) => {
    // Function to return the correct image based on the instrument title
    const getImageSource = (title) => {
        if (title === 'Stethoscope') {
            return require('../../assets/stethoscope.png');
        } else if (title === 'Syringe') {
            return require('../../assets/syringe.png');
        } else {
            return require('../../assets/default.png');
        }
    };

    // Get the image source based on the passed title
    const image = getImageSource(title);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.innerContainer}>
                <Image source={image} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </TouchableOpacity>

            {/* Delete Icon */}
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        overflow: 'hidden',
        position: 'relative', // Ensures that the delete button is positioned correctly
    },
    innerContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        margin: 8,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'transparent',
    },
});

export default InstrumentComponent;
