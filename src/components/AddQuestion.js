import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class AddQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(optionOne, optionTwo))

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true,
    }))
  }
  render() {
    const { optionOne, optionTwo, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    const footer = (
      <Button 
        label="Submit" 
        icon="pi pi-check" 
        disabled={optionOne.length === 0 || optionTwo === 0} 
        onClick={this.handleSubmit} />
    )

    return (
      <Card 
        title="Create New Question" 
        subTitle="Would you rather..."
        style={{ width: '25rem', marginTop: '2em' }}
        footer={footer}>
          <div className="p-grid p-dir-col">
            <InputText 
              id="optionOne" 
              className="p-col p-mb-2" 
              value={optionOne} 
              onChange={(e) => this.setState({optionOne: e.target.value})} />
            <span className="p-col p-mb-2 p-text-center">or</span>
            <InputText 
              id="optionTwo" 
              className="p-col p-mb-2" 
              value={optionTwo} 
              onChange={(e) => this.setState({optionTwo: e.target.value})} />
          </div>
      </Card>
    )
  }
}

export default connect()(AddQuestion)