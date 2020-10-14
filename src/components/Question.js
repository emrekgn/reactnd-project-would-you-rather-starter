import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Card } from 'primereact/card'
import { RadioButton } from 'primereact/radiobutton'
import { formatQuestion, formatDate } from '../utils/helpers'
import { Button } from 'primereact/button'
import { withRouter } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import { handleAddAnswer } from '../actions/questions'

class Question extends Component {
  state = {
    answered: this.props.question.optionOne.votes.includes(this.props.authedUser) 
      || this.props.question.optionTwo.votes.includes(this.props.authedUser),
    answer: null,
  }
  toQuestionPage = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/questions/${id}`)
  }
  handleChange = (e) => {
    this.setState(() => ({
      answer: e.target.value
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { answer } = this.state
    const { dispatch, question } = this.props

    if (answer === null) {
      this.toastBR.show({
        severity:'error', 
        summary: 'Error', 
        detail:'Please select an option', 
        life: 3000
      })
    } else {
      dispatch(handleAddAnswer(question.id, answer))
      this.setState(() => ({
        answered: true
      }))
    }
  }
  render() {
    const { question, summary, authedUser } = this.props
    const { answered } = this.state

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
    )

    const footer = (
      <div>
        { summary ? (
          <span className="p-grid p-justify-end">
            <Button icon="pi pi-eye" 
              className="p-button-rounded p-button-info p-button-outlined"
              onClick={(e) => this.toQuestionPage(e, question.id)} />
          </span>
          ) : (
            <Button label="Submit" icon="pi pi-check" disabled={answered} />
        )}
      </div>
    )

    return (
      <Fragment>
        <Toast ref={(el) => this.toastBR = el} position="bottom-right" />
        <Card title="Would you rather?" 
              style={{ width: '25em', marginTop: '2em' }} 
              className="ui-card-shadow p-as-center" footer={footer} 
              header={header}>
            {
              summary ? (
                <p className="p-text-nowrap p-text-truncate" 
                  style={{width: '10rem'}} >
                  {question.optionOne.text + ' or ' + question.optionTwo.text}
                </p>
              ) : (
                <div>
                  <div className="p-field-radiobutton">
                      <RadioButton 
                        inputId="optionOne" 
                        name="optionOne" 
                        value="optionOne" 
                        checked={question.optionOne.votes.includes(authedUser)}
                        disabled={answered}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="optionOne">{question.optionOne.text}</label>
                  </div>
                  <div className="p-field-radiobutton">
                      <RadioButton 
                        inputId="optionTwo" 
                        name="optionTwo" 
                        value="optionTwo" 
                        checked={question.optionTwo.votes.includes(authedUser)} 
                        disabled={answered}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="optionTwo">{question.optionTwo.text}</label>
                  </div>
                </div>
              )
            }
        </Card>
      </Fragment>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  let { id } = props.id ? { id: props.id } : props.match.params
  const summary = props.summary ? props.summary : false
  const question = questions[id]
  
  return {
    question: formatQuestion(question, users[question.author]),
    summary,
    authedUser,
  }
}

export default withRouter(connect(mapStateToProps)(Question))