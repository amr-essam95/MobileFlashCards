import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { addDeck, receiveDecks } from '../actions/decks'
import { getDecks, saveDeckTitle, deleteDeck, getDeck, addCardToDeck } from '../utils/helper'
import TextButton from './TextButton'
import { Card } from 'react-native-elements'
import { white } from '../utils/colors'

class Deck extends Component {

    onDeckPress = () => {
        const {navigation, title, state} = this.props
        navigation.navigate('DeckPage', {title:title} )
    }

    render() {
        const { state, title } = this.props
        const deck = state[title]
        return (
            <View>
                <TouchableOpacity
                    onPress={this.onDeckPress}>
                    <View>
                        <Text>{title}</Text>
                        <Text>{deck.questions.length} cards</Text>
                    </View>
                </TouchableOpacity>
            </View>
            )
    }
}

function mapStateToProps (state, {title, navigation}) {
    return {
        state,
        title,
        navigation
    }
}

export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    row: {
        alignItems: 'center',
    },
})