import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//Styles
import './login.scss'

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false, 
            isPasswordHidden: true,
            isUserLoggedIn: false,
            isLoginError: false
        }
        this.handlerLogin = this.handlerLogin.bind(this);
        this.handlerUserInput = this.handlerUserInput.bind(this);
    }
    componentDidMount() {
        if(!sessionStorage.getItem('isLoggedIn')){
            sessionStorage.clear()
        }
    }
    handlerUserInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handlerPasswordState = (e) => {
        e.preventDefault();
        
        if(this.state.isPasswordHidden === true){
            this.setState({
                isPasswordHidden: false
            });
        }else{
            this.setState({
                isPasswordHidden: true
            });

        }
    }
    handlerLogin = () => {
        this.setState({
            isLoading: true
        });
        this.postLogin(this.state).then ((result) => {
            if(result.status === 200){
                sessionStorage.setItem('access-token', result.headers.get('access-token'));
                sessionStorage.setItem('client', result.headers.get('client'));
                sessionStorage.setItem('uid', result.headers.get('uid'));
                sessionStorage.setItem('isLoggedIn', true);

                this.setState({
                    isUserLoggedIn: true
                })
            }else{
                this.setState({
                    isLoginError: true
                })
            };
        });
    }
    postLogin = (userData) => {
        return new Promise((resolve, reject) =>{        
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            let raw = JSON.stringify({"email": `${userData.email}`,"password": `${userData.password}`});
              
            let requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
        
            fetch("https://empresas.ioasys.com.br/api/v1/users/auth/sign_in", requestOptions)
            .then((response) => {
                this.setState({ isLoading: false });
                resolve(response)
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                reject(error)
            });
        });
    }
    render() {
        if(sessionStorage.getItem('isLoggedIn')){
            return(
                <Redirect to="/home"/>
            );
        }
        let { isLoading } = this.state;

        return(
            <div className = "login">
                
                <form className = {isLoading ? 'login__form --blured' : 'login__form' }>
                <div className = "login__logo"/>
                    <div className = "login__description-container">
                        <div className = "login__description">
                            <p className = "login__description-title">BEM-VINDO AO EMPRESAS</p>
                            <p className = "login__description-text">Lorem ipsum dolor sit amet, contetur adipiscing elit. Nunc accumsan.</p>
                        </div>
                    </div>
                    <div className = "login__form-input-container">
                        <div className = "login__form-input" style={{ borderBottom: this.state.isLoginError ? '.01vh solid #ff0f44' : '' }}>
                            <label htmlFor = "email" className = "login__form-label --email"/>
                            <input type="text" name="email" placeholder = "E-mail"  className = "login__form-email" autoComplete="off" onChange = {this.handlerUserInput}/>
                            <div className = {this.state.isLoginError ? 'login__form-input-status' : 'login__form-input-status --invisible' }>!</div>
                        </div>
                    </div>
                    <div className = "login__form-input-container">
                        <div className = "login__form-input" style={{ borderBottom: this.state.isLoginError ? '.01vh solid #ff0f44' : '' }}>
                            <label htmlFor = "password" className = "login__form-label --password"/>
                            <input type = {this.state.isPasswordHidden ? 'password' : 'text' }  name = "password" placeholder = "Senha" className = "login__form-password" autoComplete="off" onChange = {this.handlerUserInput}/>
                            <button className = {this.state.isLoginError ? '--hidden' : 'login__form-input-show'} onClick = {this.handlerPasswordState}/>
                            <div className = {this.state.isLoginError ? 'login__form-input-status' : '--hidden' }>!</div>
                        </div>
                    </div>
                    <div className = {this.state.isLoginError ? 'login__input-feedback' : 'login__input-feedback --invisible' }>
                        <p>Credenciais informadas são inválidas, tente novamente.</p>
                    </div>
                    <input type = "button" value = "ENTRAR" className = "login__button" onClick = {this.handlerLogin}/> 
                </form>
                
                {isLoading ? (
                    <div className="loader-modal">
                        <div className = "loader"/>
                    </div>  
                ) : (
                    ''
                )}
            </div>
        );
    }
}

export default Login