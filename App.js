
import { StackNavigator } from 'react-navigation';
import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer ,createSwitchNavigator} from 'react-navigation';
import PeopleScreen from './screens/People';
import colors from './theme/Colors';
import MainScreen from './screens/Main';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import DetailsScreen from './screens/Details';

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
          //color: '#ffffff'
      },
      headerTintColor: '#ffffff'
    }
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


