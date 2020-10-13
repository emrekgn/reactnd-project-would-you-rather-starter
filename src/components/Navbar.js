import React, { Component } from 'react'
import { TabMenu } from 'primereact/tabmenu'
import { withRouter } from 'react-router-dom'

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
    return (
      <TabMenu model={this.items} />
    )
  }
}

export default withRouter(Navbar)