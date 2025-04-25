import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';

export default function ResultModal({ visible, result, onClose }) {
    const animationSource =
        result === 'Safe'
            ? require('../assets/animations/celebration.json')
            : require('../assets/animations/warning.json');

    const resultText =
        result === 'Safe' ? 'Water is Safe to Drink!' : 'Unsafe – Avoid Drinking';

    const resultColor = result === 'Safe' ? '#2ecc71' : '#e74c3c';

    return (
        <Modal
            isVisible={visible}
            backdropOpacity={0.2}
            animationIn="zoomIn"
            animationOut="zoomOut"
            onBackdropPress={onClose}
            backdropTransitionOutTiming={0}
            style={styles.modal}
        >
            <View style={styles.container}>
                <LottieView
                    source={animationSource}
                    autoPlay
                    loop={false}
                    style={styles.animation}
                />
                <View style={styles.textContainer}>
                    <Text style={[styles.text, { color: resultColor }]}>{resultText}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.button}>
                        <Text style={styles.buttonText}>Dismiss</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: 300,
        height: 300,
    },
    textContainer: {
        position: 'absolute',
        bottom: '20%',
        alignItems: 'center',
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#ffffffcc',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
});
