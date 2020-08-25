import React from 'react';
import { Link } from 'react-router-dom';

//Styles
import './enterprises.scss'

function Enterprises(props) {
    let responseData = [];

    const entepriseToBeShown = (enterpriseIndex) =>{
        let selectedEnterpriseIndex = enterpriseIndex;

        sessionStorage.setItem('selectedEnterpriseIndex', selectedEnterpriseIndex);
    }

    if(props.isSearched === true){
        responseData = props.responseData.enterprises
        
        if(responseData.length > 0){
            return(
                <ul className="enterprises">
                    {responseData.map((data, i) => {
                        return (
                            <Link 
                                className="enterprise__button" 
                                key={i} 
                                onClick={() => entepriseToBeShown(data.id)} 
                                to={`/empresa/${data.id}`}
                            >
                                <div className="enterprise__button-logo">{data.id}</div>
                                <div className="enterprise__button-info">
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
                <div className="search">
                    <p className="search__notfound">Nenhuma empresa foi encontrada para a busca realizada.</p>
                </div>
            );
        }
    }else{
        return(
            <div className="search">
                <p className="search__start">Clique na busca para iniciar.</p>
            </div>
        );
    }
}
export default Enterprises