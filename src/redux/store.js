import { createStore, compose, applyMiddleware } from 'redux'
import { connectRouter } from 'connected-react-router'
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const rootReducerWithRouter = connectRouter(window.history)(rootReducer)

const store = createStore(rootReducerWithRouter, initialState, composeEnhancers(applyMiddleware(reduxThunk)))

export default store
