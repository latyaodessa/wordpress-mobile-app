import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from "./src/screens/HomeScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import {Ionicons} from '@expo/vector-icons';
import {createStackNavigator} from "@react-navigation/stack";
import WpPostDetails from './src/screens/WpPostDetails';
import ContactScreen from './src/screens/ContactScreen';
import {CombinedDarkTheme} from './src/utils/AppConstants';
import {AppContextProvider} from './src/AppContext';


const RootStack = createStackNavigator();
const CategoriesStackNavigator = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
      <RootStack.Navigator>
        <RootStack.Screen name={"Blog"} component={HomeScreen}/>
        <RootStack.Screen name={"Details"} component={WpPostDetails}/>
      </RootStack.Navigator>
  )
}

const CategoriesStack = () => {
  return (
      <CategoriesStackNavigator.Navigator>
        <CategoriesStackNavigator.Screen name={"Categories"}   component={CategoriesScreen}/>
        <CategoriesStackNavigator.Screen name={"Blog"} component={HomeScreen}/>
        <CategoriesStackNavigator.Screen name={"Details"} component={WpPostDetails}/>
      </CategoriesStackNavigator.Navigator>
  )
}

const InfoStack = () => {
  return (
      <RootStack.Navigator>
        <RootStack.Screen name={"Info"} component={ContactScreen}/>
      </RootStack.Navigator>
  )
}


export default function App() {


  return (
      <PaperProvider theme={CombinedDarkTheme}>
        <NavigationContainer theme={CombinedDarkTheme}>
          <AppContextProvider>
            <Tab.Navigator>
              <Tab.Screen options={{
                tabBarLabel: "Blog",
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="newspaper-outline" size={size} color={color}/>)
              }} name="Blog" component={HomeStack}/>
              <Tab.Screen
                  options={{
                    tabBarLabel: "Categories",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="list" size={size} color={color}/>)
                  }}

                  name="Categories" component={CategoriesStack}/>
              <Tab.Screen
                  options={{
                    tabBarLabel: "Information",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="information" size={size} color={color}/>)
                  }}

                  name="Info" component={InfoStack}/>
            </Tab.Navigator>
          </AppContextProvider>
        </NavigationContainer>
      </PaperProvider>
  );
}

