import React, {Component} from 'react';
import { render } from '@testing-library/react';
import {NavLink} from 'react-router-dom'
import classes from './QuizList.module.css';
import axios from 'axios'

export default class QuizList extends Component {

    state = {
        quizes: []
    }

    renderQuiz(){
        return this.state.quizes.map(quiz =>{
            return(
                <li key={quiz.id}>
                    <NavLink 
                        to={'/quiz/' + quiz.id} 
                    >{quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try{
            const response = await axios.get('https://react-quiz-2910f.firebaseio.com/quizes.json') 
            const quizes = []

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })

            this.setState({
                quizes
            })
        } catch(e) {
            console.log(e)
        }        
    }   
    
    render(){
        return(
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    <ul>
                        {this.renderQuiz()}
                    </ul>
                </div>                
            </div>
        )
    }
}