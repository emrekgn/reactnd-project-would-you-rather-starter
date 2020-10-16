import React, { Component } from 'react'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  state = {
    selectedUser: null,
    toHome: false,
  }
  selectedUserTemplate = (option, props) => {
    if (option) {
        return (
            <div className="user-option">
                <img alt={option.name} src={option.avatarURL} />
                <div>{option.name}</div>
            </div>
        )
    }

    return (
        <span>
            {props.placeholder}
        </span>
    )
  }
  userOptionTemplate = (option) => {
    return (
        <div className="user-option">
            <img alt={option.name} src={option.avatarURL} />
            <div>{option.name}</div>
        </div>
    )
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { selectedUser } = this.state
    const { dispatch } = this.props

    dispatch(setAuthedUser(selectedUser.id))
    this.setState(() => ({
      selectedUser: null,
      toHome: true,
    }))
  }
  render() {
    const footer = (
      <div className="p-grid p-justify-center">
        <Button 
          label="Login" 
          icon="pi pi-check" 
          disabled={this.state.selectedUser === null} 
          className="p-col-4"
          onClick={this.handleSubmit} />
      </div>
    )

    if (this.state.toHome === true) {
      const { redirectTo } = this.props
      return <Redirect to={redirectTo !== null ? redirectTo : '/'} />
    }

    return (
      <Card 
        title="Welcome to the Would You Rather App!" 
        subTitle="Please login to continue"
        style={{ width: '25rem', marginTop: '2em' }}
        footer={footer}
      >
        <div className="p-grid">  
          <Dropdown 
            value={this.state.selectedUser} 
            options={this.props.users} 
            onChange={(e) => this.setState({ selectedUser: e.value })} 
            optionLabel="name" 
            placeholder="Select a User"
            className="p-col"
            valueTemplate={this.selectedUserTemplate} 
            itemTemplate={this.userOptionTemplate} />
        </div>
      </Card> 
    )
  }
}

function mapStateToProps ({ users }, props) {
  const { location } = props

  return {
    users: Object.values(users),
    redirectTo: location !== null ? location.state.from.pathname : null
  }
}

export default connect(mapStateToProps)(Login)