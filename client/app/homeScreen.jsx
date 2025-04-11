import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
    const [inputs, setInputs] = useState({
        ph: '',
        Hardness: '',
        Solids: '',
        Chloramines: '',
        Sulfate: '',
        Conductivity: '',
        Organic_carbon: '',
        Trihalomethanes: '',
        Turbidity: '',
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleInputChange = (name, value) => {
        setInputs({ ...inputs, [name]: value });
    };

    const validateInputs = () => {
        return Object.values(inputs).every((value) => {
            const num = parseFloat(value);
            return value !== '' && !isNaN(num);
        });
    };

    const checkWaterSafety = async () => {
        if (!validateInputs()) {
            Alert.alert('Error', 'Please fill all fields with valid numbers.');
            return;
        }
        setLoading(true);
        console.log('Request payload:', {
            features: Object.values(inputs).map((value) => parseFloat(value)),
        });
    
        try {
            const response = await axios.post(
                'http://10.24.78.93:5000/predict', // Replace with your backend IP
                { features: Object.values(inputs).map((value) => parseFloat(value)) },
                { timeout: 10000 }
            );
            console.log('Server response:', response.data);
            const prediction = response.data.prediction === 1 ? 'Safe' : 'Unsafe';
            console.log('Prediction:', prediction);
            setResult(prediction);
        } catch (error) {
            console.error('Request failed:', error.message);
            if (error.response) {
                console.error('Server error response:', error.response.data);
            } else if (error.code === 'ECONNABORTED') {
                console.error('Request timed out');
            }
            Alert.alert('Error', `Failed to get prediction: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Water Quality Checker</Text>
                <Text style={styles.headerSubtitle}>Enter parameters to check water safety.</Text>
            </View>
            {[
                { label: 'pH', name: 'ph' },
                { label: 'Hardness (mg/L)', name: 'Hardness' },
                { label: 'Solids (ppm)', name: 'Solids' },
                { label: 'Chloramines (ppm)', name: 'Chloramines' },
                { label: 'Sulfate (mg/L)', name: 'Sulfate' },
                { label: 'Conductivity (μS/cm)', name: 'Conductivity' },
                { label: 'Organic Carbon (ppm)', name: 'Organic_carbon' },
                { label: 'Trihalomethanes (μg/L)', name: 'Trihalomethanes' },
                { label: 'Turbidity (NTU)', name: 'Turbidity' },
            ].map((field) => (
                <View key={field.name} style={styles.inputContainer}>
                    <Text style={styles.label}>{field.label}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={`Enter ${field.label}`}
                        keyboardType="numeric"
                        value={inputs[field.name]}
                        onChangeText={(value) => handleInputChange(field.name, value)}
                    />
                </View>
            ))}
            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={checkWaterSafety}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Check Water Safety</Text>
                )}
            </TouchableOpacity>
            {result && (
                <View style={[styles.resultContainer, result === 'Safe' ? styles.resultSafe : styles.resultUnsafe]}>
                    <Text style={styles.resultText}>
                        The water is <Text style={styles.resultHighlight}>{result}</Text> to drink.
                    </Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: '#f0f4f8' },
    header: { alignItems: 'center', marginBottom: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#1a3c34' },
    headerSubtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 5 },
    inputContainer: { marginBottom: 15 },
    label: { fontSize: 16, fontWeight: '600', color: '#1a3c34', marginBottom: 5 },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    button: {
        backgroundColor: '#1a3c34',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonDisabled: { backgroundColor: '#a0a0a0' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    resultContainer: { marginTop: 20, padding: 15, borderRadius: 10, alignItems: 'center' },
    resultSafe: { backgroundColor: '#e6f4ea', borderColor: '#28a745', borderWidth: 1 },
    resultUnsafe: { backgroundColor: '#f8d7da', borderColor: '#dc3545', borderWidth: 1 },
    resultText: { fontSize: 18, color: '#333' },
    resultHighlight: { fontWeight: 'bold', color: '#1a3c34' },
});