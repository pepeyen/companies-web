export function getEnterpriseWithFilters(pesquisa) {
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
                resolve(response.json())
            })
            .catch((error) => {
                reject(error)
            });
        }
        else
        {
            if(pesquisa.nomeEmpresa === '' && pesquisa.tipoEmpresa !==null )
            {
                fetch(`https://empresas.ioasys.com.br/api/v1/enterprises?enterprise_types=${pesquisa.tipoEmpresa}`, requestOptions)
                .then((response) => {
                    resolve(response.json())
                })
                .catch((error) => {
                    reject(error)
                });
            }
            else 
            {
                if(pesquisa.nomeEmpresa !== '' && pesquisa.tipoEmpresa !==null)
                {
                    fetch(`https://empresas.ioasys.com.br/api/v1/enterprises?enterprise_types=${pesquisa.tipoEmpresa}&name=${pesquisa.nomeEmpresa}`, requestOptions)
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