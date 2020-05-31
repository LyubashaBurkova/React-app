import React, {Component} from 'react';
import { render } from '@testing-library/react';
import {NavLink} from 'react-router-dom'
import classes from './QuizList.module.css';

export default class QuizList extends Component {

    renderQuiz(){
        return [1, 2, 3].map((quiz, index) =>{
            return(
                <li key={index}>
                    <NavLink 
                        to={'/quiz/' + quiz} 
                    >Test {quiz}
                    </NavLink>
                </li>
            )
        })
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