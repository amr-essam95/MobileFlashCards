import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD } from '../actions/decks'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
        return {
            ...state,
            ...action.decks,
        }
    case ADD_DECK :
        return {
            ...state,
            ...action.deck
        }
    case REMOVE_DECK :
        delete state[action.deckTitle]
        return {
            ...state,
        }
    case ADD_CARD :
        const question = action.question
        const answer = action.answer
        state[action.title].questions.push({question, answer})
        return {
            ...state
        }
    default :
      return state
  }
}

export default decks