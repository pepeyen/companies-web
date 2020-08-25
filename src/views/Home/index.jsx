import React, { useState,useEffect } from 'react';
import { Redirect } from 'react-router-dom';

//Components
import Carousel from '../../components/Carousel'
import Enterprises from '../../components/Enterprises'

//Services
import { getEnterpriseWithFilters } from '../../services/getEnterpriseWithFilters'

//Styles
import './home.scss'

function Home() {
    const [responseData,setResponseData] = useState({});
    const [nomeEmpresa,setNomeEmpresa] = useState('');
    const [isInputMode,setIsInputMode] = useState(false);
    const [isSearching,setIsSearching] = useState(false);
    const [isSearched,setIsSearched] = useState(false);

    let searchedEnterprise = {
        nomeEmpresa: '',
        tipoEmpresa: null
    }

    useEffect(() => {
        sessionStorage.removeItem('enterpriseTypeValue');
        sessionStorage.removeItem('selectedEnterpriseIndex');
    },[]);

    const handleSingout = (e) => {
        e.preventDefault();

        sessionStorage.clear();
        window.location.reload(false);
    }
    const handleUserKeyDown = (e) => {
        setNomeEmpresa(e.target.value);

        if (e.keyCode === 13) {
            searchEnterprise(e);
        }
    }
    const searchEnterprise = (e) => {
        searchedEnterprise = {
            nomeEmpresa: nomeEmpresa,
            tipoEmpresa: sessionStorage.getItem("enterpriseTypeValue")
        }
        
        if(e.keyCode === 13){
            getEnterprise(searchedEnterprise)
        }

        switch (e.target.value) {
            case "showInput":
                setIsInputMode(true);

                break;
            case "search":
                e.preventDefault();
                getEnterprise(searchedEnterprise);

                break;
            case "close":
                e.preventDefault();
                setIsInputMode(false);

                break;
            default:
                break;
        }        
    }
    const getEnterprise = () => {
        setIsSearching(true);
        
        getEnterpriseWithFilters(searchedEnterprise)
        .then ((res) =>{ 
            setResponseData(res);
            setIsSearching(false);
            setIsSearched(true);
        });
    }

    if(!sessionStorage.getItem('isLoggedIn')){
        return(
            <Redirect to="/login"/>
        );
    }else{
        return(
            <div className="home">
                <div className="navbar">
                    <div className={isInputMode ? "navbar__input --input-mode" : "navbar__input"}>
                        <button 
                            className={isInputMode ? "--hidden" : "navbar__sing-out"}
                            onClick={handleSingout}
                        />
                        <div className={ isInputMode ? "--hidden" : "navbar__logo"}/>
                        <button 
                            className="filter__button --search " 
                            value={isInputMode ? "search" : "showInput"}
                            onClick={searchEnterprise} 
                        />
                        <input 
                            className={isInputMode ? "filter__search" : "--hidden"} 
                            name="nomeEmpresa" 
                            type="text" 
                            placeholder="Pesquisar" 
                            spellCheck="false" 
                            onKeyDown={handleUserKeyDown} 
                        />
                        <button 
                            className={isInputMode ? "filter__button --close " : "--hidden"} 
                            value="close" 
                            onClick={searchEnterprise}
                        />
                    </div>
                </div>
                <Carousel />
                <Enterprises 
                    responseData={responseData} 
                    isSearching = {isSearching}
                    isSearched={isSearched}
                />
            </div>
        );
    }
}

export default Home