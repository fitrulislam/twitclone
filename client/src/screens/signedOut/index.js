import { createStackNavigator } from 'react-navigation';

import LoginScreen from './Login';
import RegisterScreen from './Register';

export default createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      header: null
    },
  }
);