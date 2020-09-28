import React, { Component } from 'react';

//Services
import { getEnterpriseWithFilters } from '../../services/getEnterpriseWithFilters'

//Styles
import './carousel.scss'

class Carousel extends Component{
    enterpriseTypeData = []

    constructor(props){
        super(props);
        this.state = {
            enterpriseTypes: [],
            selectedType: ''
        }
    
    }
    setButtonState = (e) => {
        e.preventDefault();
        
        this.setState({
            selectedType : e.target.name
        })
        sessionStorage.setItem("enterpriseTypeValue", e.target.value);
    }
    componentDidMount() {
        this.getEnterpriseTypes();
    }
    getEnterpriseTypes = () =>{
        let searchedEnterprise={
            nomeEmpresa: '',
            tipoEmpresa: null
        }

        for (let i = 1; i < 30; i++) {
            searchedEnterprise ={
                nomeEmpresa: '',
                tipoEmpresa: i
            }
            getEnterpriseWithFilters(searchedEnterprise)
            .then ((result) =>{
                this.sortEnterpriseTypes(result)
            });   
        }
    }
    sortEnterpriseTypes = (result) => { 
        if(result.enterprises.length !== 0){
            let currentEnterpriseTypeId = result.enterprises[0].enterprise_type.id;
            let currentEnterpriseTypeName = result.enterprises[0].enterprise_type.enterprise_type_name;
    
            this.enterpriseTypeData[currentEnterpriseTypeId] = currentEnterpriseTypeName;
    
            this.setState({
                enterpriseTypes: this.enterpriseTypeData,
                [`button${currentEnterpriseTypeId}`]: false
            })
        }
    }
    render() {
        return(
            <ul className="carousel">
                {this.state.enterpriseTypes.map((data, i) => {
                    return (
                        <button 
                            className={this.state.selectedType === `button${i}` ? 'carousel__button --active' : 'carousel__button'} 
                            name={`button${i}`}
                            type="button" 
                            value={i}                            
                            key={i} 
                            onClick={this.setButtonState}
                        >
                            {data}
                        </button>
                    )
                })}
            </ul>
        );  
    }
}

export default Carousel