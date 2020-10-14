export function formatQuestion (question, user) {
  const { name, avatarURL } = user

  return {
    ...question,
    username: name,
    avatar: avatarURL,
  }
}

export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function calcScore (user) {
  return user.questions.length + Object.keys(user.answers).length
}
