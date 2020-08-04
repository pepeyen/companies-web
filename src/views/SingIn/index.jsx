import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//Styles
import './signIn.scss'

class SignIn extends Component{
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
        this.handleLogin = this.handleLogin.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }
    componentDidMount() {
        if(!sessionStorage.getItem('isLoggedIn')){
            sessionStorage.clear()
        }
    }
    handleUserInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handlePasswordState = (e) => {
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
    handleLogin = () => {
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
            <div className="sign-in">
                <form className={isLoading ? 'sign-in__form --blured' : 'sign-in__form' }>
                    <div className="sign-in__logo"/>
                    <div className="sign-in__description-container">
                        <div className="sign-in__description">
                            <div className="sign-in__description-title">
                                <p>BEM-VINDO AO EMPRESAS</p>
                            </div>
                            <div className="sign-in__description-text">
                                <p>Lorem ipsum dolor sit amet, contetur adipiscing elit. Nunc accumsan.</p>
                            </div>
                        </div>
                    </div>
                    <div className="sign-in__input-container">
                        <div 
                            className="sign-in__input" 
                            style={{ borderBottom: this.state.isLoginError ? '.01vh solid #ff0f44' : '' }}
                        >
                            <label 
                                className="sign-in__input-label --email"
                                htmlFor="email" 
                            />
                            <input 
                                className="sign-in__input-email"
                                name="email"
                                type="text" 
                                placeholder="E-mail"  
                                autoComplete="off" 
                                onChange={this.handleUserInput}
                            />
                            <div className={this.state.isLoginError ? 'sign-in__input-status' : 'sign-in__input-status --invisible' }>!</div>
                        </div>
                    </div>
                    <div className="sign-in__input-container">
                        <div 
                            className="sign-in__input" 
                            style={{ borderBottom: this.state.isLoginError ? '.01vh solid #ff0f44' : '' }}
                        >
                            <label 
                                className="sign-in__input-label --password"
                                htmlFor="password" 
                            />
                            <input 
                                className="sign-in__input-password"  
                                name="password"                            
                                type={this.state.isPasswordHidden ? 'password' : 'text' }  
                                placeholder="Password" 
                                autoComplete="off" 
                                onChange={this.handleUserInput}
                            />
                            <button 
                                className={this.state.isLoginError ? '--hidden' : 'sign-in__input-reveal'} 
                                onClick={this.handlePasswordState}
                            />
                            <div className={this.state.isLoginError ? 'sign-in__input-status' : '--hidden' }>!</div>
                        </div>
                    </div>
                    <div className={this.state.isLoginError ? 'sign-in__input-feedback' : 'sign-in__input-feedback --invisible' }>
                        <p>Credenciais informadas são inválidas, tente novamente.</p>
                    </div>
                    <input 
                        className="sign-in__button"                    
                        type="button" 
                        value="ENTRAR" 
                        onClick={this.handleLogin}
                    /> 
                </form>
                
                {isLoading ? (
                    <div className="sign-in__loader">
                        <div className="sign-in__loader-spinner"/>
                    </div>  
                ) : (
                    ''
                )}
            </div>
        );
    }
}

export default SignIn