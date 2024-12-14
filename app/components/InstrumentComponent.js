// app/components/InstrumentComponent.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const InstrumentComponent = ({ title, description, imageSource, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
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
});

export default InstrumentComponent;
