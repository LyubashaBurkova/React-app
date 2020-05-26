import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => {
    //console.log('props', props)
    return(
        <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span className={classes.Question}>
                <strong>2.</strong>&nbsp;
                {props.question}
            </span>
            <small>4 из 12</small>
        </p>
        <AnswersList 
            answers = {props.answers} 
            onAnswerClick = {props.onAnswerClick}
        />
    </div>
    )

}

export default ActiveQuiz;