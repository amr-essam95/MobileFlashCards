import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { handleAddCard } from '../actions/decks'
import { Input } from 'react-native-elements';
import { white, blue } from '../utils/colors'

class AddCard extends Component {

    state = {
        question:'',
        answer:''
    }

    questionChanged = (question) => {
        this.setState({question})
    }

    answerChanged = (answer) => {
        this.setState({answer})
    }

    addCard = () => {
        if (this.state.question === '' || this.state.answer === '') {
            return;
        }
        const { title } = this.props.route.params
        const { dispatch } = this.props
        dispatch(handleAddCard(title, this.state.question, this.state.answer))
        .then(() => {
            this.setState({question:'', answer:''})
            this.props.navigation.navigate('DeckPage', {title:title} )
        })
        
    }

    render() {
        const { decks } = this.props
        return (
            <View style={styles.container}>
                <Input
                    placeholder='Question'
                    value={this.state.question}
                    onChangeText={this.questionChanged}
                />
                <Input
                    placeholder='Answer'
                    value={this.state.answer}
                    onChangeText={this.answerChanged}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.addCard}>
                    <Text style={styles.textButton}>Submit</Text>
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

export default connect(mapStateToProps)(AddCard)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginTop: 20,
      backgroundColor: white
    },
    button: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        color:blue
    },
    textButton: {
        textAlign: 'center',
        color:blue
    }
})