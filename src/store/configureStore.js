import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from '../reducers'
import middleware from '../middleware'

const persistConfig = {
  key: 'root',
  storage,
  //whitelist: ['authedUser'] // only authedUser will be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer, middleware)
  let persistor = persistStore(store)
  return { store, persistor }
}
