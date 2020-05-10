
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import auth from '@react-native-firebase/auth';
import colors from '../theme/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
import Snackbar from 'react-native-snackbar';

export default class SignUpScreen extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
    spinner: false
  }

  handleSignUp = () => {
    if (this.state.email.trim() != "" && this.state.password.trim() != "") {
      this.setState({
        spinner: true
      })
      auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          Snackbar.dismiss()
          this.props.navigation.replace('Main')
        })
        .catch(error => {
          this.setState({ spinner: false }, () => {
            //https://www.npmjs.com/package/react-native-loading-spinner-overlay
            setTimeout(() => {
              Snackbar.show({
                text: error.message,
                backgroundColor: "#FF0000",
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                  text: 'OK',
                  textColor: 'white'
                }
              });
            }, 100);
          })
        }
        )
    }
  }
  static navigationOptions = {
    headerShown: false
  }
  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          color={colors.accentColor}
          overlayColor={colors.overlayColor}
        />
        <Text style={styles.text}>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          placeholderTextColor="#bfbfbf"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#bfbfbf"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={{ margin: 16, marginBottom: 36 }}>
          <Button title="Sign Up" onPress={this.handleSignUp} />
        </View>
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.replace('Login')}
          color="grey"
        />
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
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 16,
    color: colors.fontColor,
  },
  text: {
    color: colors.fontColor,
    fontSize: 28
  }
})