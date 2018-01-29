import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger }from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './reducers/User'

const reducer = combineReducers({user})
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})))

const store = createStore(reducer, middleware)

export default store