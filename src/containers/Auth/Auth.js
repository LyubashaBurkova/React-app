import React, {Component} from 'react';
import { render } from '@testing-library/react';
import classes from './Auth.module.css';
import Button from '../../component/UI/Button/Button';
import Input from '../../component/UI/Input/Input'

export default class Auth extends Component {
    loginHandler = () => {

    }

    registerHandler = () => {

    }
    // submitHandler - отменяе стандартное поведение формы
    submitHandler = (event) => {
        event.preventDefault();
    }

    render(){
        return(
            <div className={classes.Auth}>
                <div>
                    <h1>Auth</h1>
                    
                    <from onSubmit={this.submitHandler} className={classes.AuthForm}>
                        <Input label="Email" type="" />
                        <Input label="Пароль" type="password" errorMessage={'Test'} />
                        <div>
                            <Button 
                                type="success"
                                onClick={this.loginHandler
                            }>
                                Войти
                            </Button>

                            <Button
                                type="primary"
                                onClick={this.registerHandler}
                            >
                            Зарегистрироваться</Button>
                        </div>
                        
                    </from>
                </div>
            </div>
            
        )
    }
}