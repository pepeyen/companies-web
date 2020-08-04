import React, { Component } from 'react';

//Services
import { getEnterpriseWithFilters } from '../../services/GET/getEnterpriseWithFilters'

//Styles
import './carousel.scss'

class Carousel extends Component{
    enterpriseTypeData = []

    constructor(props){
        super(props);
        this.state = {
            enterpriseTypes: []
        }
    
    }
    setButtonState = (e) => {
        e.preventDefault();
        
        if(this.state[e.target.name] === false){
            this.setState({
                [e.target.name] : true
            })
            sessionStorage.setItem("enterpriseTypeValue", e.target.value);
        }else{
            this.setState({
                [e.target.name] : false
            })
            sessionStorage.removeItem("enterpriseTypeValue");
        }
    }
    componentDidMount() {
        this.getEnterpriseTypes();
    }
    getEnterpriseTypes = () =>{
        let pesquisa={
            nomeEmpresa: '',
            tipoEmpresa: null
        }

        for (let i = 1; i < 25; i++) {
            pesquisa ={
                nomeEmpresa: '',
                tipoEmpresa: i
            }
            getEnterpriseWithFilters(pesquisa)
            .then ((result) =>{
                this.sortEnterpriseTypes(result)
            });    
        }
    }
    sortEnterpriseTypes = (result) => { 
        let currentEnterpriseTypeId = result.enterprises[0].enterprise_type.id;
        let currentEnterpriseTypeName = result.enterprises[0].enterprise_type.enterprise_type_name;

        this.enterpriseTypeData[currentEnterpriseTypeId] = currentEnterpriseTypeName;

        this.setState({
            enterpriseTypes: this.enterpriseTypeData,
            [`button${currentEnterpriseTypeId}`]: false
        })
    }
    render() {
        return(
            <ul className = "carousel">
                {this.state.enterpriseTypes.map((data, i) => {
                    return (
                        <button 
                            className = {this.state[`button${i}`] ? 'carousel__button --active' : 'carousel__button'} 
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