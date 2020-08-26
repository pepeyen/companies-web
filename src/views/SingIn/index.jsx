import React, { useState,useEffect } from 'react';
import { Redirect } from 'react-router-dom';

//Styles
import './signIn.scss';

function SignIn() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [isPasswordHidden,setIsPasswordHidden] = useState(true);
    const [isUserLoggedIn,setIsUserLoggedIn] = useState(false);
    const [isLoginError,setIsLoginError] = useState(false);

    useEffect(() => {
        if(!sessionStorage.getItem('isLoggedIn')){
            sessionStorage.clear();
        }
    },[]);

    const handleUserInput = (e) => {
        switch (e.target.name) {
            case "email":
                setEmail(e.target.value);

                break;
            case "password":
                setPassword(e.target.value);
                
                break;
            default:
                break;
        }
    }
    const handleUserLogin = (e) => {
        if(e.keyCode === 13){
            handleLogin();
        }
    }
    const handlePasswordState = (e) => {
        e.preventDefault();

        if(isPasswordHidden === true){
            setIsPasswordHidden(false);
        }else{
            setIsPasswordHidden(true);
        }
    }
    const handleLogin = () => {
        setIsLoading(true);
        
        let userData = {
            email: email,
            password: password
        }

        postLogin(userData)
        .then((res) => {
            if(res.status === 200){
                sessionStorage.setItem('access-token', res.headers.get('access-token'));
                sessionStorage.setItem('client', res.headers.get('client'));
                sessionStorage.setItem('uid', res.headers.get('uid'));
                sessionStorage.setItem('isLoggedIn', true);

                setIsUserLoggedIn(true);
            }else{
                setIsLoginError(true);
            };
        });
    }
    const postLogin = (userData) => {
        return new Promise((resolve, reject) =>{        
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Access-Control-Allow-Origin", "*");
            let raw = JSON.stringify({"email": `${userData.email}`,"password": `${userData.password}`});
              
            let requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
        
            fetch(`${process.env.REACT_APP_API_PROXY}${process.env.REACT_APP_API_URL}/users/auth/sign_in`, requestOptions)
            .then((response) => {
                setIsLoading(false);
                resolve(response)
            })
            .catch((error) => {
                setIsLoading(false);
                setIsLoginError(true);
                reject(error)
            });
        });
    }

    if(sessionStorage.getItem('isLoggedIn') || isUserLoggedIn === true){
        return(
            <Redirect to="/home"/>
        );
    }else{
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
                            style={{borderBottom: isLoginError ? '.01vh solid #ff0f44' : '' }}
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
                                onChange={handleUserInput}
                                onKeyDown={handleUserLogin}
                            />
                            <div className={isLoginError ? 'sign-in__input-status' : 'sign-in__input-status --invisible' }>!</div>
                        </div>
                    </div>
                    <div className="sign-in__input-container">
                        <div 
                            className="sign-in__input" 
                            style={{borderBottom: isLoginError ? '.01vh solid #ff0f44' : '' }}
                        >
                            <label 
                                className="sign-in__input-label --password"
                                htmlFor="password" 
                            />
                            <input 
                                className="sign-in__input-password"  
                                name="password"                            
                                type={isPasswordHidden ? 'password' : 'text' }  
                                placeholder="Password" 
                                autoComplete="off" 
                                onChange={handleUserInput}
                                onKeyDown={handleUserLogin}
                            />
                            <button 
                                className={isLoginError ? '--hidden' : 'sign-in__input-reveal'} 
                                onClick={handlePasswordState}
                            />
                            <div className={isLoginError ? 'sign-in__input-status' : '--hidden' }>!</div>
                        </div>
                    </div>
                    <div className={isLoginError ? 'sign-in__input-feedback' : 'sign-in__input-feedback --invisible' }>
                        <p>Credenciais informadas são inválidas, tente novamente.</p>
                    </div>
                    <input 
                        className="sign-in__button"                    
                        type="button" 
                        value="ENTRAR" 
                        onClick={handleLogin}
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