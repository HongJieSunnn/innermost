import { createStore } from 'redux';
import rootReducer from '../reducers'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {}

const store = createStore(
  rootReducer,
  initialState,
)

export default store;