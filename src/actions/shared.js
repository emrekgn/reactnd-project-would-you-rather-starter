import { getInitialData } from '../utils/api'
import { receiveQuestions } from '../actions/questions'
import { receiveUsers } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

// TODO add login page and related action, reducer
const AUTHED_ID = 'tylermcginnis'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
    .then(({users, questions}) => {
      console.log("USER: ", users)
      console.log("QUESTIONS: ", questions)
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
      dispatch(setAuthedUser(AUTHED_ID))
      dispatch(hideLoading())
    })
  }
}
