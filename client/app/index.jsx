import React from 'react'
import { Text, Image, Pressable, StyleSheet, View } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import { useRouter } from 'expo-router'
import { hp, wp } from '../helpers/common.js'
import { StatusBar } from 'expo-status-bar'
import theme from '../constants/theme.js'
import Button from '../components/Button.jsx'

const Index = () => {
    const router = useRouter();

    return (
      <ScreenWrapper bg="white">
        <StatusBar style="dark" />
        <View style={styles.container}>
            <Text style={styles.logo}>JalaShuddhi</Text>

            <View style={{ gap: 20 }}>
                <Text style={styles.title}>The proof your water is safe.</Text>
                <Text style={styles.punchline}>Let’s find out if your water’s good to drink — no guesswork, just facts.</Text>
            </View>

            <View style={styles.footer}>
                <Button
                    title='Lets Check' 
                    buttonStyle={{ marginHorizontal: wp(5) }}
                    onPress={() => router.push('homeScreen')}
                />
            </View>
        </View>
      </ScreenWrapper>
    )
}

export default Index

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: 'white',
      paddingHorizontal: wp(4)
  },
  logo: {
      alignSelf: 'center',
      fontSize: hp(7),
      fontWeight: theme.fonts.bold,
      color: theme.colors.primary
  },
  title: {
      fontSize: hp(3),
      textAlign: 'center',
      fontWeight: theme.fonts.medium
  },
  punchline: {
      textAlign: 'center',
      paddingHorizontal: wp(6),
      fontSize: hp(2)
  },
  footer: {
      gap: 30,
      width: '100%'
  },
  bottomTextContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5
  },
  loginText: {
      textAlign: 'center',
      fontSize: hp(2)
  },
  loginWord: {
      color: theme.colors.primaryDark,
      fontWeight: theme.fonts.semibold
  }
})