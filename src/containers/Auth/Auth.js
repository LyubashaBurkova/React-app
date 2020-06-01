import React, {Component} from 'react';
import { render } from '@testing-library/react';
import classes from './Auth.module.css';
import Button from '../../component/UI/Button/Button';
import Input from '../../component/UI/Input/Input';
import is from 'is_js';


// function validateEmail(email) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

export default class Auth extends Component {

    state={
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false, 
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false, 
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {

    }

    registerHandler = () => {

    }
    // submitHandler - отменяе стандартное поведение формы
    submitHandler = (event) => {
        event.preventDefault();
    }

    validateControl(value, validation){
        if(!validation){
            return true
        }

        let isvalid = true
        
        if (validation.required){
            isvalid = value.trim() !== '' && isvalid
        }

        if (validation.email){
            
            // isvalid = validateEmail(value) && isvalid
            isvalid = is.email(value) && isvalid
        }

        if (validation.minLength){
            isvalid = value.length >= validation.minLength && isvalid
        }

        return isvalid
    }

    onChangeHandler=(event, controlName)=>{
         const formControls = {...this.state.formControls}//spred - для создания независимых объектов
         const control = {...formControls[controlName]}

         control.value = event.target.value
         control.touched = true
         control.valid = this.validateControl(control.value, control.validation)
         formControls[controlName] = control

         this.setState({
            formControls
         })

         console.log('shouldValidate = ',control.validation)
    }

    renderInputs(){
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                // shouldValidate={!!control.validation}   !! это перевод к булевому значению           
                <Input 
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage ={control.errorMessage}
                    shouldValidate ={!!control.validation}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render(){
        return(
            <div className={classes.Auth}>
                <div>
                    <h1>Auth</h1>
                    
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        { this.renderInputs()}
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
                        
                    </form>
                </div>
            </div>
            
        )
    }
}