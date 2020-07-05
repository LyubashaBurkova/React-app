import {combineReducers} from 'redux' 
import quizReducer from './quiz'
import createReducer from './create'
// import counter2 from './reducers/Counter2'
 
export default combineReducers({
    quiz: quizReducer,
    create: createReducer
    //counter1, counter2
})
