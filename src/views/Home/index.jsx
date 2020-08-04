import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//Components
import Carousel from '../../components/Carousel'
import Enterprises from '../../components/Enterprises'

//Services
import { getEnterpriseWithFilters } from '../../services/GET/getEnterpriseWithFilters'

//Styles
import './home.scss'

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            responseData: {},
            nomeEmpresa: '',
            isInputMode: false,
            isSearched: false
        }
        this.handlerFilter = this.handlerFilter.bind(this);
    }
    nomeEmpresa = ''
    pesquisa ={
        nomeEmpresa: '',
        tipoEmpresa: null
    }
    componentDidMount() {
        sessionStorage.removeItem('enterpriseName')
        sessionStorage.removeItem('enterpriseTypeValue')
        sessionStorage.removeItem('selectedEnterpriseIndex');
    }
    handleUserKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handlerFilter(e);
        }
    }
    handlerUserInput = (e) => {
        this.nomeEmpresa = e.target.value
    }
    handlerFilter = (e) => {   
        this.pesquisa ={
            nomeEmpresa: this.nomeEmpresa,
            tipoEmpresa: sessionStorage.getItem("enterpriseTypeValue")
        }

        if(e.target.value === "search"){
            e.preventDefault();
            this.setState({
                isInputMode: true
            })
            getEnterpriseWithFilters(this.pesquisa)
            .then ((result) =>{ 
                this.setState({
                    responseData: result,
                    isSearched: true
                })
            });
    
            if(this.state.nomeEmpresa !== ''){
                sessionStorage.setItem('enterpriseName', this.state.nomeEmpresa)
            }
        }else{
            if(e.target.value === "close"){
                e.preventDefault();
                this.setState({
                    isInputMode: false
                }) 
            }
        }
    }
    render() {
        if(!sessionStorage.getItem('isLoggedIn')){
            return(
                <Redirect to="/login"/>
            );
        }
        let { isInputMode } = this.state
        return(
            <div className="home">
                <div className="navbar">
                    <div className={ isInputMode ? "navbar__input --input-mode" : "navbar__input"}>
                        <div className={ isInputMode ? "--hidden" : "navbar__logo"}/>
                        <button 
                            className="filter__button --search " 
                            value="search" 
                            onClick={this.handlerFilter} 
                        />
                        <input 
                            className={ isInputMode ? "filter__search" : "--hidden"} 
                            name="nomeEmpresa" 
                            type="text" 
                            placeholder="Pesquisar" 
                            spellCheck="false" 
                            onKeyDown={this.handleUserKeyDown} 
                            onChange={this.handlerUserInput}
                        />
                        <button 
                            className={ isInputMode ? "filter__button --close " : "--hidden"} 
                            value="close" 
                            onClick={this.handlerFilter}
                        />
                    </div>
                </div>
                <Carousel />
                <Enterprises 
                    responseData={this.state.responseData} 
                    isSearched={this.state.isSearched}
                />
            </div>
        );
    }
}

export default Home