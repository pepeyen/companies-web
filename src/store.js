import { applyMiddleware,createStore } from 'redux';
import logger from 'redux-logger';
import searchReducer from './reducers'
     
const middleWare = applyMiddleware(logger)

export default createStore(searchReducer, middleWare)