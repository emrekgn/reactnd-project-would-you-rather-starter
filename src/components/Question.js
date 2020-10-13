import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'primereact/card'
import { formatQuestion, formatDate } from '../utils/helpers'
import { Button } from 'primereact/button'
import { withRouter } from 'react-router-dom'

class Question extends Component {
  toQuestionPage = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/questions/${id}`)
  }
  render() {
    const { question, summary } = this.props

    const header = (
      <div className="p-grid">
        <div className="p-col">
          <img alt="Avatar" src={question.avatar} />
        </div>
        <div className="p-col">
          <p className="p-text-bold">{question.username + ' has asked '}</p>
          <p className="p-text-light">{'on '+ formatDate(question.timestamp)}</p>
        </div>
      </div>
    );

    const footer = (
      <div>
        { summary ? (
          <span className="p-grid p-justify-end">
            <Button icon="pi pi-eye" 
                    className="p-button-rounded p-button-info p-button-outlined"
                    onClick={(e) => this.toQuestionPage(e, question.id)} />
          </span>
        ) : (
          <div>Show details</div>
        )      
        }
      </div>
    );

    return (
      <Card title="Would you rather?" 
            style={{ width: '25em', marginTop: '2em' }} 
            className="ui-card-shadow p-as-center" footer={footer} 
            header={header}>
        <p className="p-text-nowrap p-text-truncate" 
          style={{width: '10rem'}} >
          {question.optionOne.text + ' or ' + question.optionTwo.text}
        </p>
      </Card>
    )
  }
}

function mapStateToProps ({ questions, users }, props) {
  let { id } = props.id ? { id: props.id } : props.match.params
  const summary = props.summary ? props.summary : false
  const question = questions[id]
  return {
    question: formatQuestion(question, users[question.author]),
    summary,
  }
}

export default withRouter(connect(mapStateToProps)(Question))