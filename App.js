import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/decks'
import middleware from './middleware/index'
import { receiveDecks } from './actions/decks'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import DeckPage from './components/DeckPage'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { setLocalNotification, clearLocalNotification } from './utils/helper'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { purple, white } from './utils/colors'
import Constants from 'expo-constants'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

function FlashCardsStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function DecksNavigation () {
  return (
      <Stack.Navigator initialRouteName="Decks">
          <Stack.Screen name="Decks" component={Decks} />
          <Stack.Screen name="DeckPage" component={DeckPage} />
          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="Quiz" component={Quiz} />
      </Stack.Navigator>
  )
}

export default class App extends React.Component {

  componentDidMount() {
    clearLocalNotification()
    setLocalNotification()
  }
  
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={styles.container}>
          <FlashCardsStatusBar backgroundColor={white} />
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Decks" component={DecksNavigation} options={{ title: 'Decks' }} />
              <Tab.Screen name="AddDeck" component={AddDeck} options={{ title: 'AddDeck' }} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});
