import axios from '../../axios/axios-quiz'
import {
    CREATE_QUIZ_QUESTION,
    RESERT_QUIZ_CREATION
} from './actionTypes'


export function createQuizQuestion (item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function finishCreteQuiz () {
    return async (dispatch, getState) => {
        await axios.post('/quizes.json', getState().create.quiz)
        dispatch(resertQuizCreation())
    }    
}

export function resertQuizCreation() {
    return {
        type: RESERT_QUIZ_CREATION
    }
}