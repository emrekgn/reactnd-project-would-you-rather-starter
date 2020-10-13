import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION } from '../actions/questions'

export default function users(state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users,
      }
    case ADD_QUESTION :
      const { authedUser, id } = action.question

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          questions: state[authedUser].questions.concat([id])
        }
      }
    default:
      return state
  }
}