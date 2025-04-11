import { MaterialIcons } from '@expo/vector-icons'
import React, { Component } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import theme from '../constants/theme'

const BackButton = ({size=36, router}) => {
    return (
      <Pressable onPress={() => router.back()} style={styles.button}>
        <MaterialIcons name='keyboard-arrow-left' size={size} color={theme.colors.primaryDark}/>
      </Pressable>
    )
}

export default BackButton

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: theme.colors.primaryLight
    }
})