import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Questions from './Questions'
import Question from './Question'
import AddQuestion from './AddQuestion'
import Leaderboard from './Leaderboard'
import Navbar from './Navbar'
import { handleInitialData } from '../actions/shared'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

const PageNotFound = ({ location }) => (
  <h3>404! This is not the page you're looking for: <code>{location.pathname}</code></h3>
)

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
            {this.props.loading === true 
              ? null
              : <div className="p-d-flex p-jc-center">
                  <Switch>
                    <Route path='/' exact component={Questions} />
                    <Route path='/questions/:id' component={Question} />
                    <Route path='/add' component={AddQuestion} />
                    <Route path='/leaderboard' component={Leaderboard} />
                    <Route component={PageNotFound} />
                  </Switch>
                </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)