import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../component/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
    state = {
        activeQestion: 0,
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
        console.log('answerId:', answerId);
        this.setState({
            activeQestion: this.state.activeQestion + 1
        })
    }  

    render() {
        return(
            <div className={classes.Quiz}>                
                <div  className={classes.QuizWrapper}> 
                <h1>Ответьте на все вопросы</h1>
                    <ActiveQuiz 
                    answers = {this.state.quiz[this.state.activeQestion].answers}
                    question = {this.state.quiz[this.state.activeQestion].question}
                    onAnswerClick = {this.onAnswerClickHendler}
                    quizLength={this.state.quiz.length}
                    answerNumber={this.state.activeQestion + 1}
                    />                    
                </div>
            </div>
        )
    }
}

export default Quiz;