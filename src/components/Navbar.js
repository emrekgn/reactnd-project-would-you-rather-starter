import React, { Fragment, useRef } from 'react'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { withRouter, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

const Navbar = (props) => {
  const toastBC = useRef(null)
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: (e) => {
        handleRedirect('/')
      }
    },
    {
      label: 'New Question',
      icon: 'pi pi-plus',
      command: (e) => {
        handleRedirect('/add')
      }
    },
    {
      label: 'Leaderboard',
      icon: 'pi pi-list',
      command: (e) => {
        handleRedirect('/leaderboard')
      }
    }
  ]
  const history = useHistory()
  const handleRedirect = (redirect) => {
    history.push(redirect)
  }
  const showConfirm = () => {
    toastBC.current.show({ severity: 'warn', sticky: true, content: (
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
                      onClick={handleLogout} />
                </div>
                <div className="p-col-6">
                    <Button type="button" 
                      label="No" 
                      className="p-button-secondary" 
                      onClick={() => toastBC.current.clear()} />
                </div>
            </div>
        </div>
    ) });
  }
  const handleLogout = () => {
    const { dispatch } = props
    
    toastBC.current.clear()
    // Nullify auther user to mimic logout
    dispatch(setAuthedUser(null))
  }
  const getLogo = () => {
    return (
      <img alt="logo" src="/logo.png" height="40" className="p-mr-2"></img>
    )
  }
  const getUsername = () => {
    return props.username !== null 
      ? (
        <div className="p-grid p-align-center vertical-container p-justify-end">
          <div className="p-col">
            <span className="p-text-bold p-text-nowrap p-text-truncate">{'Hello, ' + props.username}</span>
          </div>
          <div className="p-col">
            <Button 
              icon="pi pi-power-off" 
              className="p-button-rounded p-button-danger p-button-outlined p-button-sm"
              onClick={showConfirm} />
          </div>
        </div>
      ) : null
  }
  return (
    <Fragment>
      <Toast ref={toastBC} position="bottom-center" />
      <Menubar model={items} start={getLogo} end={getUsername} />
    </Fragment>
  )
}

export default withRouter(connect((state) =>
  ({
    username: state.authedUser !== null 
      ? state.users[state.authedUser].name 
      : null
  }))(Navbar))