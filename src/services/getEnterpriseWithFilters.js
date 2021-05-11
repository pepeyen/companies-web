export function getEnterpriseWithFilters(searchedEnterprise) {
    return new Promise((resolve, reject) =>{   
        var myHeaders = new Headers();
        
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("access-token", `${sessionStorage.getItem('access-token')}`);
        myHeaders.append("client", `${sessionStorage.getItem('client')}`);
        myHeaders.append("uid", `${sessionStorage.getItem('uid')}`);
        myHeaders.append("Access-Control-Allow-Origin", "*");
            
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        if(searchedEnterprise.nomeEmpresa !== '' && searchedEnterprise.tipoEmpresa === null)
        {
            fetch(`${process.env.REACT_APP_API_PROXY}/${process.env.REACT_APP_API_URL}/enterprises?name=${searchedEnterprise.nomeEmpresa}`, requestOptions)
            .then((response) => {
                resolve(response.json())
            })
            .catch((error) => {
                reject(error)
            });
        }
        else
        {
            if(searchedEnterprise.nomeEmpresa === '' && searchedEnterprise.tipoEmpresa !==null )
            {
                fetch(`${process.env.REACT_APP_API_PROXY}/${process.env.REACT_APP_API_URL}/enterprises?enterprise_types=${searchedEnterprise.tipoEmpresa}`, requestOptions)
                .then((response) => {
                    resolve(response.json())
                })
                .catch((error) => {
                    reject(error)
                });
            }
            else 
            {
                if(searchedEnterprise.nomeEmpresa !== '' && searchedEnterprise.tipoEmpresa !==null)
                {
                    fetch(`${process.env.REACT_APP_API_PROXY}/${process.env.REACT_APP_API_URL}/enterprises?enterprise_types=${searchedEnterprise.tipoEmpresa}&name=${searchedEnterprise.nomeEmpresa}`, requestOptions)
                    .then((response) => {
                        resolve(response.json())
                    })
                    .catch((error) => {
                        reject(error)
                    });
                }
            }        
        }                   
   });
}