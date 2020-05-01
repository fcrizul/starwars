
import { StackNavigator } from 'react-navigation';
import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer ,createSwitchNavigator} from 'react-navigation';


import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import PeopleScreen from './screens/People';
import colors from './theme/Colors';
import MainScreen from './screens/Main';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';



class HomeScreen extends React.Component {
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Details: DetailsScreen,

    Main : MainScreen,
    Login: LoginScreen,
    SignUp : SignUpScreen,
    People: {
      screen: PeopleScreen,
      navigationOptions: {
        title: 'Star wars characters',
    },
    }
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      headerStyle: {
          backgroundColor: colors.barColor,
          elevation: 4,
          shadowOpacity: 0
      },
      headerTitleStyle: {
          fontWeight: "500",
          color: '#ffffff'
      }
    }
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


