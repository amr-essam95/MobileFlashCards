import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions/decks'
import { Input } from 'react-native-elements';
import { white, blue } from '../utils/colors'

class AddDeck extends Component {

    state = {
        title:'',
    }

    titleChanged = (text) => {
        this.setState({title:text})
    }

    addDeck = () => {
        if (this.state.title === '') {
            return;
        }
        const title = this.state.title
        const { dispatch } = this.props
        dispatch(handleAddDeck(title))
        .then(() => {
            this.setState({title:''})
            this.props.navigation.navigate('DeckPage', {title} )
        })
    }

    render() {
        const { decks } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.textTitle}>
                    What is the title of your new deck?
                </Text>
                <Input
                    placeholder='Title'
                    value={this.state.title}
                    onChangeText={this.titleChanged}
                    style={styles.textButton}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.addDeck}>
                    <Text style={styles.textButton}>Create Deck</Text>
                </TouchableOpacity>
            </View>
            )
    }
}

function mapStateToProps (decks) {
    return {
        decks,
    }
}

export default connect(mapStateToProps)(AddDeck)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginTop: 20,
      backgroundColor: white
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
    textTitle: {
        textAlign: 'center',
    }
})