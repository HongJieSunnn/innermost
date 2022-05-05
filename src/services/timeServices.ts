export function getFormatedLocationTime(json=false):string{
    let createTime=(new Date());
    createTime=new Date(createTime.getTime() - createTime.getTimezoneOffset() * 60000);
    if(!json){
        return createTime.toISOString().slice(0,19).replace("T"," ");
    }
    return createTime.toISOString().slice(0,19);
}

export function formatJsonTime(jsonTime:string):string{
    return jsonTime.replace("T"," ");
}