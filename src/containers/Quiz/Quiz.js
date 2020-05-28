import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../component/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../component/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {
    state = {
        results:{},//{[id]: 'success' 'error'}
        isFinished: false,
        activeQestion: 0,
        answerState: null,//{[id]: 'success' 'error'}
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswer: 2,
                id: 1,
                answers: [
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зеленый', id: 4}
                ]
            },
            {
                question: 'В каком году основали Санкт-Петербург?',
                rightAnswer: 3,
                id: 2,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1702', id: 2},
                    {text: '1703', id: 3},
                    {text: '1803', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHendler = (answerId) => {
        //при правильном ответе можно успеть нажать на элемент во время переключения вопроса
        if (this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]; //вытаскиваем значение ключа
            if (this.state.answerState[key] === 'success'){
                return 
            }
        }

        //question - вопрос на котором находимся
        const question = this.state.quiz[this.state.activeQestion];
        //results - объект в котором собирается инфа по всем вопросам
        const results = this.state.results;

        if (question.rightAnswer === answerId){
            if (!results[question.id]){
                results[question.id]='success';
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()){                    
                    this.setState({
                        isFinished: true
                    })
                }else{
                    this.setState({
                        activeQestion: this.state.activeQestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000);
            
        }else{
            results[question.id] ='error';

            this.setState({
                answerState: {[answerId]: 'error'},
                results,//results: results ключ значение совпадает
            })
        }
        
    }  

    isQuizFinished(){
        return this.state.activeQestion + 1 === this.state.quiz.length
    }

    //мы передаем функцию в дочерний компонент
    //либо bind, либо стрелочная функция
    onRetryHandler = () => {
        this.setState({
            activeQestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return(
            <div className={classes.Quiz}>                
                <div  className={classes.QuizWrapper}> 
                <h1>Ответьте на все вопросы</h1>
                {
                    this.state.isFinished
                    ? <FinishedQuiz 
                        results={this.state.results}
                        quiz={this.state.quiz}   
                        onRetry={this.onRetryHandler}                  
                       />
                    : <ActiveQuiz 
                        answers = {this.state.quiz[this.state.activeQestion].answers}
                        question = {this.state.quiz[this.state.activeQestion].question}
                        onAnswerClick = {this.onAnswerClickHendler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQestion + 1}
                        state={this.state.answerState}
                      />  
                }
                                  
                </div>
            </div>
        )
    }
}

export default Quiz;