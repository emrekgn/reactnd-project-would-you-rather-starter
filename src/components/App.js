import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Questions from './Questions'
import Question from './Question'
import AddQuestion from './AddQuestion'
import Leaderboard from './Leaderboard'
import Navbar from './Navbar'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import PageNotFound from './PageNotFound'
import { handleInitialData } from '../actions/shared'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Navbar />
            <div className="p-d-flex p-jc-center">
              <Switch>
                <Route path='/login' component={Login} />
                <PrivateRoute authed={this.props.authed} path='/' exact component={Questions} />
                <PrivateRoute authed={this.props.authed} path='/questions/:id' component={Question} />
                <PrivateRoute authed={this.props.authed} path='/add' component={AddQuestion} />
                <PrivateRoute authed={this.props.authed} path='/leaderboard' component={Leaderboard} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authed: authedUser !== null,
  }
}

export default connect(mapStateToProps)(App)