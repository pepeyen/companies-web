import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Styles
import './enterprises.scss'

class Enterprises extends Component{
    responseData = []

    buttonHandler = (enterpriseIndex) =>{
        let selectedEnterpriseIndex = enterpriseIndex;

        sessionStorage.setItem('selectedEnterpriseIndex', selectedEnterpriseIndex);
    }

    render() {
        if(this.props.isSearched === true){
            this.responseData = this.props.responseData.enterprises

            if(this.responseData.length > 0){
                return(
                    <ul className = "enterprise">
                        {this.responseData.map((data, i) => {
                            return (
                                <Link className="enterprise__button" key={i} onClick={() => this.buttonHandler(data.id)} to={`/empresa/${data.id}`}>
                                    <div className="enterprise__button-logo">{data.id}</div>
                                    <div className = "enterprise__button-info">
                                        <p className="enterprise__button-name">{data.enterprise_name}</p> 
                                        <p className="enterprise__button-type">{data.enterprise_type.enterprise_type_name}</p>
                                        <p className="enterprise__button-country">{data.city}</p> 
                                    </div>
                                </Link>
                            );
                        })}
                    </ul>
                );
            }else{
                return(
                    <div className = "search__notification">
                        <p className="search__feedback-notfound">Nenhuma empresa foi encontrada para a busca realizada.</p>
                    </div>
                );
            }
        }else{
            return(
                <div className = "search__notification">
                    <p className="search__feedback-start">Clique na busca para iniciar.</p>
                </div>
            );
        }
    }
}
export default Enterprises