import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'primereact/card'
import { RadioButton } from 'primereact/radiobutton'
import { formatQuestion, formatDate } from '../utils/helpers'
import { Button } from 'primereact/button'
import { withRouter } from 'react-router-dom'
import PageNotFound from './PageNotFound'
import { handleAddAnswer } from '../actions/questions'

class Question extends Component {
  state = {
    answered: this.props.question 
      && (this.props.question.optionOne.votes.includes(this.props.authedUser) 
      || this.props.question.optionTwo.votes.includes(this.props.authedUser)),
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

    dispatch(handleAddAnswer(question.id, answer))
    this.setState(() => ({
      answered: true
    }))
  }
  calcStats = (refOption, otherOption) => {
    const { question } = this.props
    const total = question[refOption].votes.length + question[otherOption].votes.length
    return {
      text: question[refOption].votes.length + ' of '  + total,
      percentage: question[refOption].votes.length / total * 100
    }
  }
  render() {
    const { question, summary, authedUser } = this.props
    const { answered, answer } = this.state

    if (!question) {
      // No question found! Question id might be invalid
      return <PageNotFound />
    }

    const optionOneStats = this.calcStats('optionOne', 'optionTwo')
    const optionTwoStats = this.calcStats('optionTwo', 'optionOne')

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
            <Button 
              icon="pi pi-eye" 
              className="p-button-rounded p-button-info p-button-outlined"
              onClick={(e) => this.toQuestionPage(e, question.id)} />
          </span>
          ) : (
            answered === false 
            &&  <Button 
                  label="Submit" 
                  icon="pi pi-check" 
                  disabled={answered || answer === null} 
                  onClick={this.handleSubmit} />
        )}
      </div>
    )

    return (
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
                  {answered === true && <span className="p-text-light p-ml-2">{optionOneStats.text + ' (' + optionOneStats.percentage + '%)'}</span>}
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
                  {answered === true && <span className="p-text-light p-ml-2">{optionTwoStats.text + ' (' + optionTwoStats.percentage + '%)'}</span>}
              </div>
            </div>
          )
        }
      </Card>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.id ? { id: props.id } : props.match.params
  const question = questions[id]
  /* We use a summary flag to indicate whether or not to show question details.
   * In summary view, there is only (wrapper/truncated) options text
   * On the other hand, options (as radio buttons) and a submit button are shown
   * in a detailed view.
  */
  const summary = props.summary ? props.summary : false

  console.log("Q:", question)
  console.log("id:", id)
  
  return {
    question: question 
      ? formatQuestion(question, users[question.author]) 
      : null,
    summary,
    authedUser,
  }
}

export default withRouter(connect(mapStateToProps)(Question))