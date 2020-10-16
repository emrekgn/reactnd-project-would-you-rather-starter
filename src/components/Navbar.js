import React, { Component, Fragment } from 'react'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

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
  showConfirm = () => {
    this.toastBC.show({ severity: 'warn', sticky: true, content: (
        <div className="p-flex p-flex-column" style={{flex: '1'}}>
            <div className="p-text-center">
                <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                <h4>Are you sure?</h4>
                <p>Confirm to proceed</p>
            </div>
            <div className="p-grid p-fluid">
                <div className="p-col-6">
                    <Button type="button" 
                      label="Yes" 
                      className="p-button-success" 
                      onClick={this.handleLogout} />
                </div>
                <div className="p-col-6">
                    <Button type="button" 
                      label="No" 
                      className="p-button-secondary" 
                      onClick={() => this.toastBC.clear()} />
                </div>
            </div>
        </div>
    ) });
  }
  handleLogout = () => {
    const { dispatch } = this.props
    
    this.toastBC.clear()
    // Nullify auther user to mimic logout
    dispatch(setAuthedUser(null))
  }
  render () {
    const start = <img alt="logo" src="/logo.png" height="40" className="p-mr-2"></img>
    const end = this.props.username 
      && (
        <div className="p-grid p-align-center vertical-container p-justify-end">
          <div className="p-col">
            <span className="p-text-bold p-text-nowrap p-text-truncate">{'Hello, ' + this.props.username}</span>
          </div>
          <div className="p-col">
            <Button 
              icon="pi pi-power-off" 
              className="p-button-rounded p-button-danger p-button-outlined p-button-sm"
              onClick={this.showConfirm} />
          </div>
        </div>
      )

    return (
      <Fragment>
        <Toast ref={(el) => this.toastBC = el} position="bottom-center" />
        <Menubar model={this.items} start={start} end={end} />
      </Fragment>
    )
  }
}

export default withRouter(connect((state) =>
  ({
    username: state.authedUser !== null 
      ? state.users[state.authedUser].name 
      : null
  }))(Navbar))