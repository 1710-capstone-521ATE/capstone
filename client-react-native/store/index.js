import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './reducers/User';
import users from './reducers/Users';

const reducer = combineReducers({user, users})
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})))

const store = createStore(reducer, middleware)

export default store
export * from './reducers/User';
export * from './reducers/Users';
