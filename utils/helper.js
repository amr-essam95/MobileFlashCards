import React from 'react'
import { AsyncStorage } from 'react-native';
import { View, StyleSheet } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { red, orange, blue, lightPurp, pink, white } from './colors'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const styles = StyleSheet.create({
    iconContainer: {
      padding: 5,
      borderRadius: 8,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20
    },
})


const STORAGE_KEY = "mflashCards:1";
const NOTIFICATION_KEY = "flashCardsNotifications:1"

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  
  function createNotification () {
    return {
      title: 'Time for quiz!',
      body: "👋 don't forget to take a quiz today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }
  
  export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }

export function setDummyData() {
    return {
        React: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event'
            }
          ]
        },
        JavaScript: {
          title: 'JavaScript',
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
          ]
        }
    }
}

export function getDecks() {
    return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
        return results === null
        ? setDummyData()
        : JSON.parse(results)
    })
}

export function saveDeckTitle(title) {
    const body = {title, "questions":[]}
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [title]: body
    }))
    .then(() => {
        return {
            [title]: body
        }
    })
}

export function deleteDeck(title) {
    return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        data[title] = undefined
        delete data[title]
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    })
}

export function getDeck(title) {
    return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        return data[title]
    })
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        if (data[title] !== undefined) {
            data[title]['questions'].push(card)
        }
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        .then(() => {
            return data
        })
    })
}