import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './reducers/User';
import users from './reducers/Users';
import event from './reducers/Event';
import userEvents from './reducers/UserEvents';
import restaurants from './reducers/Restaurants';
import ballot from './reducers/Ballot';

const reducer = combineReducers({user, users, event, userEvents, restaurants, ballot})
const middleware = applyMiddleware(thunkMiddleware)

const store = createStore(reducer, middleware)

export default store
export * from './reducers/User';
export * from './reducers/Users';
export * from './reducers/Event';
export * from './reducers/UserEvents';
export * from './reducers/Restaurants';
export * from './reducers/Ballot';
