// app/InstrumentSeeMore.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

const InstrumentSeeMore = () => {
    // Simulating data fetch
    const [loading, setLoading] = useState(true);
    const [instrument, setInstrument] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            const fetchedInstrument = {
                title: 'Stethoscope',
                uses: 'Listening to body sounds like heartbeats and breathing.',
                longDescription:
                    'A stethoscope is an acoustic medical device for auscultation, or listening to the internal sounds of an animal or human body. It is used for heart, lung, and other body sounds.',
                price: '$50',
                imageSource: { uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Stethoscope_2.jpg' },
            };
            setInstrument(fetchedInstrument);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={styles.loadingText}>Loading instrument details...</Text>
            </View>
        );
    }

    if (!instrument) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load instrument details. Please try again later.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={instrument.imageSource} style={styles.image} />
            <View style={styles.card}>
                <Text style={styles.title}>{instrument.title}</Text>
                <Text style={styles.sectionTitle}>Uses:</Text>
                <Text style={styles.uses}>{instrument.uses}</Text>
                <Text style={styles.sectionTitle}>Description:</Text>
                <Text style={styles.description}>{instrument.longDescription}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Price:</Text>
                    <Text style={styles.price}>{instrument.price}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
        marginBottom: 16,
        borderRadius: 8,
    },
    card: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#007bff',
        marginBottom: 8,
        marginTop: 16,
    },
    uses: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    priceLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#28a745',
    },
});

export default InstrumentSeeMore;
