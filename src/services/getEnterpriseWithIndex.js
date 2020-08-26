export function getEnterpriseWithIndex(enterpriseIndex) {
    return new Promise((resolve, reject) =>{   
        var myHeaders = new Headers();
        
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("access-token", `${sessionStorage.getItem('access-token')}`);
        myHeaders.append("client", `${sessionStorage.getItem('client')}`);
        myHeaders.append("uid", `${sessionStorage.getItem('uid')}`);
            
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        fetch(`${process.env.REACT_APP_API_PROXY}${process.env.REACT_APP_API_URL}/enterprises/${enterpriseIndex}`, requestOptions)
        .then((response) => {
            resolve(response.json())
        })
        .catch((error) => {
            reject(error)
        });                 
   });
}