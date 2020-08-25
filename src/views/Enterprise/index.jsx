import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

//Serivces
import { getEnterpriseWithIndex } from '../../services/getEnterpriseWithIndex'

//Styles
import './enterprise.scss'

function Enterprise() {
    const [enterprise,setEnterprise] = useState({});

    useEffect(() => {
        if(sessionStorage.getItem('isLoggedIn')){
            getEnterpriseInfo()
        }
    },[])

    const getEnterpriseInfo = () => {
        let selectedEnterpriseIndex = sessionStorage.getItem('selectedEnterpriseIndex');

        getEnterpriseWithIndex(selectedEnterpriseIndex)
        .then((res) => {
            setEnterprise(res.enterprise);
        });
    }

    if(!sessionStorage.getItem('isLoggedIn')){
        return(
            <Redirect to="/login"/>
        );
    }else{
        return(
            <div className="result">
                <div className="result__navbar">
                    <Link 
                        className="result__backtrack" 
                        to="/home"
                    />
                    <div className="result__enterprise-name">{enterprise.enterprise_name}</div>
                </div>
                <div className="result__description">
                    <div className="result__description-thumbnail">
                        <span>{enterprise.enterprise_name}</span>
                    </div>
                    <div className="result__description-text">
                        <p>{enterprise.description}</p>
                    </div>
                </div>
            </div>
        ); 
    }
}
export default Enterprise