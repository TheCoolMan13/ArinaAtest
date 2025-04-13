import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const InstrumentSeeMore = () => {
    // Hardcoded data for Syringe
    const image = require('../assets/syringe.png'); // Local image from assets folder
    const title = 'Syringe';
    const uses = 'Used for injecting liquids into the body or withdrawing fluids from the body.';
    const longDescription = 'A syringe is a medical instrument consisting of a plunger and a barrel. It is used to inject liquids into the body or draw fluids from the body. It is commonly used for vaccinations, medication administration, or blood sampling.';
    const price = '2.99';

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={image} style={styles.image} />
            <Text style={styles.title}>{title}</Text>

            <View style={styles.section}>
                <Text style={styles.label}>Uses</Text>
                <Text style={styles.text}>{uses}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.text}>{longDescription}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Price</Text>
                <Text style={styles.price}>${price}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F0F4F8', // Soft background color for the container
    },
    image: {
        width: '100%',
        height: 240,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#E5E7EB', // Light border color for image
        marginBottom: 20,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1E293B', // Darker title color
        marginBottom: 10,
    },
    section: {
        marginBottom: 25, // More space between sections
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 6,
    },
    text: {
        fontSize: 16,
        color: '#475569',
        lineHeight: 24,
        marginBottom: 8,
    },
    price: {
        fontSize: 22,
        fontWeight: '700',
        color: '#10B981', // Bright green color for price
        marginTop: 6,
    },
});

export default InstrumentSeeMore;
