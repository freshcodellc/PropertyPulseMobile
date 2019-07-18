import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import Comments from './screens/Comments';
import Provision from './screens/Provision';
import Question from './screens/Question';
import Success from './screens/Success';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createStackNavigator(
  { Home: Question, Comments: Comments, Success: Success },
  { headerMode: 'none', navigationOptions: { header: null } }
);
const AuthStack = createStackNavigator({ Provision: Provision });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
