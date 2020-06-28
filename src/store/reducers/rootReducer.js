import {combineReducers} from 'redux'
 
import quizReducer from './quiz'
// import counter2 from './reducers/Counter2'
 
export default combineReducers({
    quiz: quizReducer
    //counter1, counter2
})
