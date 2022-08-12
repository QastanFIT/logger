export const createLogger = (dns, integration, serverlink) =>{
    let data = {
        "dns": dns.toString(),
        "integration": integration.toString(),
    }

    return fetch(process.env.REACT_APP_SERVER_LINK+"create_log", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(
        res => res.json()
    ).then(
        json => {
            if(json){
                return true;
            }
            else{
                return false;
            }
        }
    )
}
