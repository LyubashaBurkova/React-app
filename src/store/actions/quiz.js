import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZES_START, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZ_SUCCESS, 
  QUIZ_SET_STATE, 
  FINISH_QUIZ, 
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  FETCH_QUIZES_ERROR
} from './actionTypes'

export function fetchQuizes(){
    return async dispatch => {

        dispatch(fetchQuizesStart())

        try{
            const response = await axios.get('https://react-quiz-2910f.firebaseio.com/quizes.json') 
            const quizes = []
            
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))

        } catch(e) {
            dispatch(fetchQuizesError(e))
        }  
    }
}

export function fetchQuizById(quizId){
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data         
            dispatch(fetchFetchQuizSuccess(quiz))            
          } catch (e) {
            dispatch(fetchQuizesError(e))
          }
    }
}

export function fetchQuizesStart(){
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes){
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchFetchQuizSuccess(quiz){
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function quizAnswerClick(answerId){
    return (dispatch, getState) => {
      const state = getState().quiz
       
    if (state.answerState){
        const key = Object.keys(state.answerState)[0]; //вытаскиваем значение ключа
        if (state.answerState[key] === 'success'){
          return
        }
      }
  
      const question = state.quiz[state.activeQuestion]
      const results = state.results
  
      if (question.rightAnswerId === answerId) {
        if (!results[question.id]) {
          results[question.id] = 'success'
        }

        dispatch(quizSetState({[answerId]: 'success'}, results))
        // this.setState({
        //   answerState: {[answerId]: 'success'},
        //   results
        // });
  
        const timeout = window.setTimeout(() => {
          if (isQuizFinished(state)){
            dispatch(finishQuiz())

          }else{
            dispatch(quizNextQuestion(state.activeQuestion + 1))
            // this.setState({
            //   activeQuestion: this.state.activeQuestion + 1,
            //   answerState: null
            // })
          }
  
          window.clearTimeout(timeout)
        }, 1000);
  
      }else{
        results[question.id] ='error';
        
        dispatch(quizSetState({[answerId]: 'error'}, results))
        // this.setState({
        //   answerState: {[answerId]: 'error'},
        //   results,//results: results ключ значение совпадает
        // })
      }
    }
}

export function quizSetState(answerState, results){
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
} 

export function finishQuiz(){
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQuestion(number){
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

export function isQuizFinished(state){
  return state.activeQuestion + 1 === state.quiz.length
}

export function retryQuiz(){
  return {
    type: QUIZ_RETRY
  }
}

export function fetchQuizesError(e){
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}
