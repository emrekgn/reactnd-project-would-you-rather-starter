import React from 'react'
import { connect } from 'react-redux'
import { TabView, TabPanel } from 'primereact/tabview'
import Question from './Question'

const Questions = ({answeredQuestions, unansweredQuestions}) => {
  return (
    <div>
      <TabView>
        <TabPanel header="Unanswered Questions">
          { unansweredQuestions.map((question) => (
            <Question key={question.id} id={question.id} summary={true} />
          )) }
        </TabPanel>
        <TabPanel header="Answered Questions">
          { answeredQuestions.map((question) => (
            <Question key={question.id} id={question.id} summary={true} />
          )) }
        </TabPanel>
      </TabView>
    </div>
  )
}

function mapStateToProps({ authedUser, questions, users}) {
  const answeredIdArr = users[authedUser].answers !== null ? Object.keys(users[authedUser].answers) : null
  const answeredQuestions = answeredIdArr !== null 
    ? Object.entries(questions).filter(([qid, q]) => answeredIdArr.includes(qid)).map(([qid, q]) => q).sort((a, b) => b.timestamp - a.timestamp)
    : []
  const unansweredQuestions = answeredIdArr !== null 
    ? Object.entries(questions).filter(([qid, q]) => !answeredIdArr.includes(qid)).map(([qid, q]) => q).sort((a, b) => b.timestamp - a.timestamp)
    : Object.values(questions)

  return {
    answeredQuestions,
    unansweredQuestions,
  }
}

export default connect(mapStateToProps)(Questions)