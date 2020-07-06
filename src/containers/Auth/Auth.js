import React, {Component} from 'react'
import {connect} from 'react-redux'
import classes from './Auth.module.css';
import Button from '../../component/UI/Button/Button';
import Input from '../../component/UI/Input/Input';
import is from 'is_js';
import {auth} from '../../store/actions/auth'

class Auth extends Component {

  state={
    isFormValid: false,
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
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
    
  }

  registerHandler = () => {

    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )

  
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

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls, 
      isFormValid
    })
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
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>

                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                        Зарегистрироваться</Button>
                    </div>
                    
                </form>
            </div>
        </div>
        
    )
}
}

function mapDispatchToProps(dispatch){
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth);