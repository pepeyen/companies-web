export function getEnterpriseWithIndex(enterpriseIndex) {
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

        fetch(`https://empresas.ioasys.com.br/api/v1/enterprises/${enterpriseIndex}`, requestOptions)
        .then((response) => {
            resolve(response.json())
        })
        .catch((error) => {
            reject(error)
        });                 
   });
}