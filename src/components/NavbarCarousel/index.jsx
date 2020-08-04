import React, { Component } from 'react';

//Styles
import './navbarCarousel.scss'

class NavbarCarousel extends Component{
    enterpriseTypeData = new Array (25)

    constructor(props){
        super(props);
        this.state = {
            enterpriseTypes: new Array(25),
            isLoading: true
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
    getEnterprise = (pesquisa) => {
        return new Promise((resolve, reject) =>{   
            var myHeaders = new Headers();
            
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("access-token", `${sessionStorage.getItem('access-token')}`);
            myHeaders.append("client", `${sessionStorage.getItem('client')}`);
            myHeaders.append("uid", `${sessionStorage.getItem('uid')}`);
                
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
    
            if(pesquisa.nomeEmpresa !== '' && pesquisa.tipoEmpresa === null)
            {
                fetch(`https://empresas.ioasys.com.br/api/v1/enterprises?name=${pesquisa.nomeEmpresa}`, requestOptions)
                .then((response) => {
                    this.setState({ isLoading: false });
                    resolve(response.json())
                })
                .catch((error) => {
                    this.setState({ isLoading: false });
                    reject(error)
                });
            }
            else
            {
                if(pesquisa.nomeEmpresa === '' && pesquisa.tipoEmpresa !== null)
                {
                    fetch(`https://empresas.ioasys.com.br/api/v1/enterprises?enterprise_types=${pesquisa.tipoEmpresa}`, requestOptions)
                    .then((response) => {
                        this.setState({ isLoading: false });
                        resolve(response.json())
                    })
                    .catch((error) => {
                        this.setState({ isLoading: false });
                        reject(error)
                    });
                }
                else 
                {
                    if(pesquisa.nomeEmpresa !== '' && pesquisa.tipoEmpresa !== null)
                    {
                        fetch(`https://empresas.ioasys.com.br/api/v1/enterprises?enterprise_types=${pesquisa.tipoEmpresa}&name=${pesquisa.nomeEmpresa}`, requestOptions)
                        .then((response) => {
                            this.setState({ isLoading: false });
                            resolve(response.json())
                        })
                        .catch((error) => {
                            this.setState({ isLoading: false });
                            reject(error)
                        });
                    }
                }        
            }                   
        });
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
            this.getEnterprise(pesquisa)
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
        let { isLoading } = this.state
        return(
            <ul className = { isLoading ? "enterprise-types --blured" : "enterprise-types" }>
                {this.state.enterpriseTypes.map((data, i) => {
                    return <button type="button" className = {this.state[`button${i}`] ? 'enterprise-types__button --active' : 'enterprise-types__button'} key={i} name={`button${i}`} value={i} onClick={this.setButtonState}>{data}</button>
                })}
            </ul>
        );  
    }
}

export default NavbarCarousel