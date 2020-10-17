import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { handleRemoveDeck } from '../actions/decks'
import TextButton from './TextButton'
import { Card } from 'react-native-elements'
import { white, blue } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helper'

class DeckPage extends Component {

    goToAddCard = () => {
        const { title } = this.props.route.params
        this.props.navigation.navigate('AddCard', {title})
    }

    goToStartQuiz = () => {
        const { title } = this.props.route.params
        clearLocalNotification()
        .then(setLocalNotification)
        this.props.navigation.navigate('Quiz', {title})
    }

    deleteButtonPressed = () => {
        const { title } = this.props.route.params
        const { dispatch } = this.props
        dispatch(handleRemoveDeck(title))
        .then(() => {
            this.props.navigation.navigate('Decks')
        })
    }

    render() {
        const { title } = this.props.route.params
        const { state } = this.props
        const deck = state[title]
        if (deck === undefined) {
            return (
                <View></View>
            )
        }
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.titleText}>{deck.title}</Text>
                    <Text style={styles.numberText}>{deck.questions.length} cards</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.goToAddCard}>
                        <Text style={styles.textButton}>Add Card</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.goToStartQuiz}>
                        <Text style={styles.textButton}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextButton onPress={this.deleteButtonPressed} style={{color:blue}}>Delete Deck</TextButton>
                </View>
            </View>
        )
    }
}

function mapStateToProps (state) {
    return {
        state,
    }
}

export default connect(mapStateToProps)(DeckPage)

const styles = StyleSheet.create({
    titleText: {
      fontSize: 20,
      textAlign: 'center'  
    },
    numberText: {
      fontSize: 15,
      textAlign: 'center'
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: white,
      justifyContent: 'space-around',
      alignItems: 'center'

    },
    center: {
        textAlign: 'center',
    },
    button: {
        backgroundColor: white,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
    },
    textButton: {
        textAlign: 'center',
    },
})