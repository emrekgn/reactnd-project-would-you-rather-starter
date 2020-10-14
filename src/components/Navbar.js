import React, { Component } from 'react'
import { Menubar } from 'primereact/menubar'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        command: (e) => {
          this.props.history.push('/')
        }
      },
      {
        label: 'New Question',
        icon: 'pi pi-plus',
        command: (e) => {
          this.props.history.push('/add')
        }
      },
      {
        label: 'Leaderboard',
        icon: 'pi pi-list',
        command: (e) => {
          this.props.history.push('/leaderboard')
        }
      }
    ]
  }
  render () {
    const start = <img alt="logo" src="/logo.png" height="40" className="p-mr-2"></img>;
    const end = this.props.username 
      && <span className="p-text-bold">{'Hello, ' + this.props.username}</span>;

    return (
      <Menubar model={this.items} start={start} end={end} />
    )
  }
}

export default withRouter(connect((state) =>
  ({
    username: state.authedUser !== null 
      ? state.users[state.authedUser].name 
      : null
  }))(Navbar))