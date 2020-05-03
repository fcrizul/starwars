import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth';
import colors from '../theme/Colors';

export default class MainScreen extends React.Component {
  componentDidMount() {
    auth().onAuthStateChanged(user => {
      setTimeout(() => { this.props.navigation.replace(user ? 'People' : 'Login'); }, 1000);
    })
  }

  static navigationOptions = {
    headerShown: false
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading</Text>
        <ActivityIndicator size="large" color={colors.fontColor} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor
  },
  text: {
    color: colors.fontColor,
  }
})