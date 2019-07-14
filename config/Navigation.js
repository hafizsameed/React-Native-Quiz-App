import * as Routes from '../screens/index'
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

const AppNavigator = createStackNavigator({
    Start: {
        screen: Routes.Start
    },
    Cam: {
        screen: Routes.Cam
    }

})
const mainNavigator = createSwitchNavigator({
    Home: {
        screen: AppNavigator
    },
    Quiz: {
        screen: Routes.Quiz
    },
    Result: {
        screen: Routes.Result
    },




})

export default createAppContainer(mainNavigator);