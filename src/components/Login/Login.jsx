import React from 'react'
import styleLogin from './Login.module.css'
import { Form, Field } from 'react-final-form'
import { RequiredInput } from '../Common/FormControls/FormComponents'
import { required } from '../../utilits/validators'
import { connect } from 'react-redux'
import { loginThunkCreator } from './../../redux/authReducer';
import { Navigate } from 'react-router-dom'

const Login = (props) => {

    const onSubmit = (formData) => {
        props.loginThunkCreator(formData.login, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <Navigate to={'/profile/' + props.userId} />
    }

    return (
        <div className={styleLogin.login}>
            <div className={styleLogin.login__inner}>
                <div className={styleLogin.login__top}>
                    Log In
                </div>
                {props.errorMessage ? <div className={styleLogin.errorMessage}>{props.errorMessage}</div> : null }
                <LoginForm onSubmit={onSubmit} />
            </div>
        </div>
    )
}

const LoginForm = (props) => {
    return (
        <Form onSubmit={formData => props.onSubmit(formData)}>
            {( { handleSubmit} ) => (
            <form className={styleLogin.login__form} onSubmit={handleSubmit}>
                <div>
                    <div>
                        <Field validate={required} name={'login'} component={RequiredInput} />
                    </div>
                    <div>
                        <Field validate={required} name={'password'} component={RequiredInput}  />
                    </div>
                    <div className={styleLogin.login__rememberMe}>
                        <Field type={'checkbox'} name={'rememberMe'} component={'input'} /> 
                        <div>Remember me</div>
                    </div>
                    <div className={styleLogin.login__button_container}>
                        <button className={styleLogin.login__button}>Log In</button>
                    </div>
                </div>
            </form>
            )}
        </Form>
    )
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
        userId: state.authReducer.data ? state.authReducer.data.id : null,
        errorMessage: state.authReducer.errorMessage
    }
}

let LoginContainer = connect(mapStateToProps, { loginThunkCreator })(Login)

export default LoginContainer