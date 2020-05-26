import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../component/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
    state = {
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswer: 2,
                answers: [
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зеленый', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHendler = (answerId) => {
        console.log('answerId:', answerId)
    }  

    render() {
        return(
            <div className={classes.Quiz}>                
                <div  className={classes.QuizWrapper}> 
                <h1>Ответьте на все вопросы</h1>
                    <ActiveQuiz 
                    answers = {this.state.quiz[0].answers}
                    question = {this.state.quiz[0].question}
                    onAnswerClick = {this.onAnswerClickHendler}
                    />                    
                </div>
            </div>
        )
    }
}

export default Quiz;