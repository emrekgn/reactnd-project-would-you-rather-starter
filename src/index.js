import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from './store/configureStore'
import ReactLoading from 'react-loading'

const { persistor, store } = configureStore()

ReactDOM.render(
<Provider store={store}>
  <PersistGate
    loading={<ReactLoading />}
    persistor={persistor} >
    <App />
  </PersistGate>
</Provider>, 
document.getElementById('root'))