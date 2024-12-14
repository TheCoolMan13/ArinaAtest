// app/MainPage.js
import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import InstrumentComponent from './components/InstrumentComponent';

const instruments = [
    {
        id: '1',
        title: 'Stethoscope',
        description: 'Used to listen to heart and lung sounds.',
        imageSource: require('../assets/stethoscope.png'), // Update the path to your image
    },
    {
        id: '2',
        title: 'Syringe',
        description: 'Used to inject fluids into the body.',
        imageSource: require('../assets/syringe.png'), // Update the path to your image
    },
];

const MainPage = () => {
    // app/MainPage.js
    const handlePress = (instrument) => {
        navigation.navigate('InstrumentSeeMore', { instrument });
    };


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Medical_symbol.png' }}
                />
                <Text style={styles.headerTitle}>Medical Instruments</Text>
            </View>

            {/* Subheading */}
            <Text style={styles.subheading}>
                Browse and learn about essential tools used by medical professionals.
            </Text>

            {/* Instrument List */}
            <FlatList
                data={instruments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <InstrumentComponent
                        title={item.title}
                        description={item.description}
                        imageSource={item.imageSource}
                        onPress={() => handlePress(item)}
                    />
                )}
            />

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Made with ❤️ for medical professionals</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Learn More</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subheading: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 16,
    },
    footer: {
        marginTop: 16,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MainPage;