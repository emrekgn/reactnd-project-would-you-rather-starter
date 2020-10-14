import { saveAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading)

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
    .then((question => dispatch(addQuestion(question))))
    .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer,
  }
}

export function handleAddAnswer (qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const info = {
      authedUser,
      qid,
      answer,
    }

    return saveAnswer(info).then(() => dispatch(addAnswer(info)))
  }
}
