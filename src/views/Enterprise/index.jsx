import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';

//Serivces
import { getEnterpriseWithIndex } from '../../services/GET/getEnterpriseWithIndex'

//Styles
import './enterprise.scss'

class Enterprise extends Component{
    constructor(props){
        super(props);
        this.state = {
            enterprise: {}
        }
    }
    componentDidMount() {
        if(sessionStorage.getItem('isLoggedIn')){
            this.gerEnterpriseInfo()
        }
    }
    gerEnterpriseInfo = () => {
        let selectedEnterpriseIndex = sessionStorage.getItem('selectedEnterpriseIndex');

        getEnterpriseWithIndex(selectedEnterpriseIndex).then ((result) => {
            this.setState({
                enterprise: result.enterprise
            })
        });
    }

    render() {
        if(!sessionStorage.getItem('isLoggedIn')){
            return(
                <Redirect to="/login"/>
            );
        }
        let { enterprise } = this.state 
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