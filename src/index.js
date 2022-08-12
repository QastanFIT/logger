import { createLogger } from "./create/createLogger";
import { addLog } from "./create/addLog";

import { ReactSession }  from 'react-client-session';

let Qastan = {};
let initObject = {"dns": "value", "integration": "test"};

Qastan.init = function({dns="", integration="", serverlink=""}){
    if(dns && integration){
        dns = dns.replace(/[^a-z0-9]/gi, '')
        integration = integration.replace(/[^a-z0-9]/gi, '')
        if(dns !== "" && integration !== "" && serverlink !== "" && serverlink.split('')[0] === "/"){
            if(integration.toLowerCase() === "frontend" || integration.toLowerCase() === "backend"){
                var result = createLogger(dns, integration)
                if(!result){
                    console.error("Could not create a new log")
                }
                else{
                    ReactSession.set("log_info", {"dns":dns, "integration":integration, "serverlink":serverlink})
                }
            }
        }
    }
}

Qastan.level = {"Info":"info", "Error":"error", "Warning":"warning"};
Qastan.type = {"User_action":"user_action", "Navigation":"navigation", "XHR":"xhr"}

Qastan.addLog = function({level="", type="", user=0, details={"title":"", "description":"", "eventtype":""}, method={"method":"", "url":""}}){
    const dns = ReactSession.get("log_info").dns;
    const integration = ReactSession.get("log_info").integration;
    const serverlink = ReactSession.get("log_info").serverlink;
    if(dns && integration){
        if(level !== "" && type !== "" && details.title !== "" && details.description !== "" && details.eventtype !== ""){
            details.timestamp = new Date().toISOString();

            let addLogData = {
                "dns": dns,
                "integration": integration,
                "level": level,
                "type": type,
                "details": details
            }

            if(user !== 0){
                addLogData.user = user
            }

            addLog(addLogData, serverlink);
        }
        else{
          return false
        }
    }
    else{
      return false
    }
}



var _default = Qastan;
export default _default;
