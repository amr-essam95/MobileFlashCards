import { saveDeckTitle, deleteDeck, addCardToDeck } from '../utils/helper'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function handleAddDeck(title) {
  return (dispatch) => {

    return saveDeckTitle(title)
    .then((deck) => {
        dispatch(addDeck(deck))
    })
  }
}

function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck: deck,
  }
}

export function handleRemoveDeck(title) {
  return (dispatch) => {

    return deleteDeck(title)
    .then(() => {
        dispatch(removeDeck(title))
    })
  }
}

export function removeDeck(deckTitle) {
  return {
      type: REMOVE_DECK,
      deckTitle
  }
}

export function handleAddCard(title, question, answer) {
  return (dispatch) => {

    return addCardToDeck(title, {
      question,
      answer,
    })
    .then((deck) => {
        dispatch(addCard(title, question, answer))
    })
  }
}

function addCard(title, question, answer) {
  return {
      type: ADD_CARD,
      title,
      question,
      answer
  }
}