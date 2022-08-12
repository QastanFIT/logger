export const addLog = async (object, serverlink) =>{

    if(object.user){
        const persistenttoken = "CA04CFD070F5741A3298A8FDAFA4BED9F29A731B5CBA5AFB8E6BE1E01CFD664E2FF70188F8C22288F0C02C37EB27C83ACE46F480D39F7788D8A32804AC7EAFEDCD0ACE7876A177036420C1E51017520739A5DB0983C8FD42D2D9C57AFEBE4F53D7CA0E37D4EE9BDFD8331724DD911AE3D0D3C2C35BF1463458412E60DEF75B2AE2C54E2E4A959C593922D34D7C0A04A095243C29E7E320B4557ECCE63A548CD580E05BFF907E52F77313F6CDC4A21315"
        const resp = await fetch(process.env.REACT_APP_SERVER_LINK+"getUser?token="+persistenttoken+"&user="+object.user);
        const user = await resp.json().object;

        if(user){
            object.user = {};
            object.user.id = user.id;
            object.user.email = user.username;
        }
        else{
            if(JSON.parse(window.sessionStorage.getItem("user_data"))){
                if(JSON.parse(window.sessionStorage.getItem("user_data")).id){
                    object.user = {}
                    object.user.id = JSON.parse(window.sessionStorage.getItem("user_data")).id;
                    object.user.email = JSON.parse(window.sessionStorage.getItem("user_data")).username
                }
                else{
                    object.user = "unknown"
                }
            }
            else{
                object.user = "unknown"
            }
        }
    }

    const resp = await fetch(process.env.REACT_APP_SERVER_LINK+"add_log", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    })
    const addlog = await resp.json();

    console.log("log created");
}
