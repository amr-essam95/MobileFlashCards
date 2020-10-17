import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { addDeck, receiveDecks } from '../actions/decks'
import { getDecks, saveDeckTitle, deleteDeck, getDeck, addCardToDeck } from '../utils/helper'
import { Input } from 'react-native-elements';
import { white, blue, green, red } from '../utils/colors'
import TextButton from './TextButton'

class Quiz extends Component {

    state = {
        currentQuestion: 0,
        showQuestion: true,
        score: 0
    }

    startOver = () => {
        this.setState({
            currentQuestion: 0,
            showQuestion: true,
            score: 0
        })
    }

    returnToDeck = () => {
        this.setState({
            currentQuestion: 0,
            showQuestion: true,
            score: 0
        })
        const { title } = this.props.route.params
        this.props.navigation.navigate('DeckPage', {title})
    }

    answerPressed = () => {
        this.setState({showQuestion: false})
    }

    questionPressed = () => {
        this.setState({showQuestion: true})
    }

    answerCorrect = () => {
        const score = this.state.score + 1
        const currentQuestion = this.state.currentQuestion + 1
        this.setState({score, currentQuestion})
    }

    answerIncorrect = () => {
        const currentQuestion = this.state.currentQuestion + 1
        this.setState({currentQuestion})
    }

    render() {
        const { decks } = this.props
        const { title } = this.props.route.params
        const deck = decks[title]

        if (deck === undefined || deck.questions === undefined) {
            return (<View></View>)
        }
        if (deck.questions.length === 0) {
            return (
                <View style={styles.errorContainer}>
                    <Text>
                        Sorry, you cannot take a quiz because there are no cards in the deck.
                    </Text>
                </View>
            )
        }
        if (this.state.currentQuestion > (deck.questions.length - 1)) {
            return (
                <View style={styles.container}>
                    <Text>Total Number of Questions {deck.questions.length}</Text>
                    <Text>Correctly Answered Question {this.state.score}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.startOver}>
                        <Text style={styles.textButton}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.returnToDeck}>
                        <Text style={styles.textButton}>Back To Deck</Text>
                    </TouchableOpacity>
                </View>
            )

        }

        const displayedQuestion = deck.questions[this.state.currentQuestion]
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Text>{this.state.currentQuestion + 1}/{deck.questions.length}</Text>
                </View>
                <View>
                    <Text style={styles.question}>
                        {this.state.showQuestion === true? 
                        displayedQuestion.question:
                        displayedQuestion.answer}
                    </Text>
                </View>
                <TextButton onPress={this.state.showQuestion === true? this.answerPressed : this.questionPressed} style={{color:blue, fontSize:20}}>
                    {this.state.showQuestion === true? 'Answer': 'Question'}
                </TextButton>
                <View>
                    <TouchableOpacity
                        style={styles.correctButton}
                        onPress={this.answerCorrect}>
                        <Text style={styles.textButton}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.incorrectButton}
                        onPress={this.answerIncorrect}>
                        <Text style={styles.textButton}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps (decks) {
    return {
        decks,
    }
}

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    errorContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftContainer: {
        flexDirection: 'row',
        backgroundColor: white,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    },
    question: {
        marginTop:20,
        fontSize: 30,
    },
    correctButton: {
        margin:10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderColor:green,
        backgroundColor: white,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
    },
    incorrectButton: {
        margin:10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderColor:red,
        backgroundColor: white,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
    },
    textButton: {
        textAlign: 'center',
        color:blue
    },
    button: {
        margin:10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderColor:blue,
        backgroundColor: white,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
    }

})