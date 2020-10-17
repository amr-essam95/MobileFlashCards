import React, { Component } from 'react'
import { View, FlatList, ScrollView  } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { addDeck, receiveDecks } from '../actions/decks'
import { getDecks, saveDeckTitle, deleteDeck, getDeck, addCardToDeck } from '../utils/helper'
import Deck from './Deck'
import { white, blue } from '../utils/colors'
import { ListItem } from 'react-native-elements'

class Decks extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        getDecks()
        .then((decks) => dispatch(receiveDecks(decks)))  
    }

    render() {
        const { decks } = this.props
        return (
            <View>
                <ScrollView style={{ backgroundColor: "white"}}>
                    {Object.keys(decks).map((title) => (
                        <ListItem key={title} bottomDivider>
                            <ListItem.Content>
                                <Deck title={title} navigation={this.props.navigation}/> 
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </ScrollView>
            </View>
            )
    }
}

function mapStateToProps (state) {
    decks = state
    return {
        decks,
    }
}

export default connect(mapStateToProps)(Decks)