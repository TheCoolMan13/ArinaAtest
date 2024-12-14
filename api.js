// api.js

import axios from 'axios';

// Your backend server URL
const API_URL = 'http://localhost:3000/instruments'; // Update to your actual server URL when in production

// Fetch instruments from the server
export const getInstruments = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching instruments:', error);
        throw error;
    }
};

// Add a new instrument to the server
export const addInstrument = async (newInstrument) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newInstrument),
        });

        if (!response.ok) {
            throw new Error('Failed to add instrument');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding instrument:', error);
        throw error;
    }
};


// Delete an instrument from the server by ID
export const deleteInstrument = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/instruments/${id}`, {
            method: 'DELETE', // Specify the HTTP method
        });

        if (!response.ok) {
            throw new Error('Failed to delete instrument');
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting instrument:', error);
        throw error;
    }
};
