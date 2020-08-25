import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//Components
import Carousel from '../../components/Carousel'
import Enterprises from '../../components/Enterprises'

//Services
import { getEnterpriseWithFilters } from '../../services/getEnterpriseWithFilters'

//Styles
import './home.scss'

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            responseData: {},
            nomeEmpresa: '',
            isInputMode: false,
            isSearching: false,
            isSearched: false
        }
        this.searchEnterprise = this.searchEnterprise.bind(this);
    }
    nomeEmpresa = ''
    searchedEnterprise ={
        nomeEmpresa: '',
        tipoEmpresa: null
    }
    componentDidMount() {
        sessionStorage.removeItem('enterpriseTypeValue')
        sessionStorage.removeItem('selectedEnterpriseIndex');
    }
    handleSingout = (e) => {
        e.preventDefault();

        sessionStorage.clear();
        window.location.reload(false);
    }
    handleUserKeyDown = (e) => {
        this.nomeEmpresa = e.target.value

        if (e.keyCode === 13) {
            this.searchEnterprise(e);
        }
    }
    searchEnterprise = (e) => {
        this.searchedEnterprise ={
            nomeEmpresa: this.nomeEmpresa,
            tipoEmpresa: sessionStorage.getItem("enterpriseTypeValue")
        }
        
        if(e.keyCode === 13){
            this.getEnterprise(this.searchedEnterprise)
        }
        switch (e.target.value) {
            case "showInput":
                this.setState({
                    isInputMode: true
                });

                break;
            case "search":
                e.preventDefault();
                this.getEnterprise(this.searchedEnterprise)

                break;
            case "close":
                e.preventDefault();
                this.setState({
                    isInputMode: false
                });
                
                break;
            default:
                break;
        }        
    }
    getEnterprise = () => {
        this.setState({
            isSearching: true
        })
        getEnterpriseWithFilters(this.searchedEnterprise)
        .then ((result) =>{ 
            this.setState({
                responseData: result,
                isSearching: false,
                isSearched: true
            })
        });
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
                        <button 
                            className={ isInputMode ? "--hidden" : "navbar__sing-out"}
                            onClick={this.handleSingout}
                        />
                        <div className={ isInputMode ? "--hidden" : "navbar__logo"}/>
                        <button 
                            className="filter__button --search " 
                            value={isInputMode ? "search" : "showInput"}
                            onClick={this.searchEnterprise} 
                        />
                        <input 
                            className={ isInputMode ? "filter__search" : "--hidden"} 
                            name="nomeEmpresa" 
                            type="text" 
                            placeholder="Pesquisar" 
                            spellCheck="false" 
                            onKeyDown={this.handleUserKeyDown} 
                        />
                        <button 
                            className={ isInputMode ? "filter__button --close " : "--hidden"} 
                            value="close" 
                            onClick={this.searchEnterprise}
                        />
                    </div>
                </div>
                <Carousel />
                <Enterprises 
                    responseData={this.state.responseData} 
                    isSearching = {this.state.isSearching}
                    isSearched={this.state.isSearched}
                />
            </div>
        );
    }
}

export default Home