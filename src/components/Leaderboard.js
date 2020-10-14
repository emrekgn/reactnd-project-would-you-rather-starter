import React, { Component } from 'react'
import { connect } from 'react-redux'
import { calcScore } from '../utils/helpers'
import { Card } from 'primereact/card'

class Leaderboard extends Component {
  userTemplate(user) {
    return (
        <div className="product-item">
            <div className="image-container">
                <img src={`${user.avatarURL}`} alt={user.name} />
            </div>
            <div className="product-list-detail">
                <h5 className="p-mb-2">{user.name}</h5>
                <i className="pi pi-question"></i>
                <span className="product-category">{user.questions.length + ' created questions'}</span>
                <i className="pi pi-check-square"></i>
                <span className="product-category">{user.questions.length + ' answered questions'}</span>
            </div>
            <div className="product-list-action">
                <h6 className="p-mb-2 p-badge p-badge-xl p-badge-sucess">{calcScore(user)}</h6>
            </div>
        </div>
    );
  }
  render() {
    return (
      <div className="card">
        { this.props.orderedUsers.map((user) => (
          <Card style={{ width: '25em', marginTop: '2em' }} 
                className="ui-card-shadow p-as-center">
            <div className="p-grid nested-grid">
              <div className="p-col-4">
                <img alt="Avatar" 
                    style={{ 'max-width': '100%', 'max-height':'100%' }}
                    src={user.avatarURL} />
              </div>
              <div className="p-col-8">
                  <div className="p-grid">
                    <div className="p-col-6">
                      <span className="p-text-nowrap p-text-bold">{user.name}</span>
                    </div>
                    <div className="p-col-6 p-d-flex p-ai-end">
                      <span className="p-text-nowrap p-ml-auto">Score</span>
                    </div>
                    <div className="p-col-6">
                      <p className="p-text-nowrap">
                        {'Answered questions: ' + user.questions.length}
                      </p>
                      <p className="p-text-nowrap">
                        {'Created questions: ' + Object.keys(user.answers).length}
                      </p>
                    </div>
                    <div className="p-col-6 p-d-flex p-ai-center">
                      <span className="p-badge p-badge-xl p-badge-primary p-ml-auto">{calcScore(user)}</span>
                    </div>
                  </div>
              </div>
            </div>
          </Card>
        )) }
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  const userIds = Object.keys(users).sort((a, b) => calcScore(users[b]) - calcScore(users[a]))
  return {
    orderedUsers: userIds.map(id => users[id])
  }
}

export default connect(mapStateToProps)(Leaderboard)