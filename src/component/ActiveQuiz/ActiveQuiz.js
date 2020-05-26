import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span className={classes.Question}>
                <strong>2.</strong>&nbsp;
                Как дела?
            </span>
            <smal>4 из 12</smal>
        </p>
        <AnswersList answers = {props.answers}></AnswersList>
    </div>
)

export default ActiveQuiz;