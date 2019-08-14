import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation'

import AuthLoading from './screens/AuthLoadingScreen'
import Comments from './screens/CommentsScreen'
import Provision from './screens/ProvisionScreen'
import Question from './screens/QuestionScreen'
import Success from './screens/SuccessScreen'

const AppStack = createStackNavigator(
  {
    Home: Question,
    Comments,
    Success
  },
  {
    headerMode: 'none'
  }
)

const AuthStack = createStackNavigator(
  {
    Provision
  },
  {
    headerMode: 'none'
  }
)

const SwitchNavigator = createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
    AuthLoading
  },
  {
    headerMode: 'none',
    initialRouteName: 'AuthLoading'
  }
)

export default createAppContainer(SwitchNavigator)
