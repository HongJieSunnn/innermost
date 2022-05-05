import axios from "axios";
const jsonpAdapter = require("axios-jsonp");

export interface LocationModel{
    locationUId:string;
    locationName:string;
    province:string;
    city:string;
    district:string;
    address:string;
    longitude:number|undefined;
    latitude:number|undefined;
}


export async function locateByIP(props:any){
    await axios
        .get("http://api.map.baidu.com/location/ip",{
            params:{
                ak:'xLPfY1PuuVSFjAFGwmubGnuDDRmsmPzb',
            },
            adapter:jsonpAdapter,
        })
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            props.setProvince(data.content.address_detail.province);
            props.setCity(data.content.address_detail.city);
        })
}

export async function getAddressSuggessions(query:string,region:string,setLocationSuggessions:React.Dispatch<React.SetStateAction<LocationModel[]>>){
    await axios
            .get("https://api.map.baidu.com/place/v2/suggestion",{
                params:{
                    ak:'xLPfY1PuuVSFjAFGwmubGnuDDRmsmPzb',
                    query:query,
                    region:region,
                    output:'json'
                },
                adapter:jsonpAdapter,
            })
            .then((response)=>{
                return response.data;
            })
            .then((data)=>{
                let locations=new Array<LocationModel>();
                data.result.forEach((l:any)=>{
                    locations.push(<LocationModel>{
                        locationUId:l.uid,
                        locationName:l.name,
                        province:l.province,
                        city:l.city,
                        district:l.district,
                        address:l.address,
                        longitude:l.location.lng,
                        latitude:l.location.lat
                    })
                })
                
                setLocationSuggessions(locations);
            })
}

export async function getCityLocation(city:string){
    let cityLocation:LocationModel=<LocationModel>{};
    await axios
            .get("https://api.map.baidu.com/place/v2/suggestion",{
                params:{
                    ak:'xLPfY1PuuVSFjAFGwmubGnuDDRmsmPzb',
                    query:city,
                    region:city,
                    output:'json'
                },
                adapter:jsonpAdapter,
            })
            .then((response)=>{
                return response.data;
            })
            .then((data)=>{
                for(let i=0;i<data.result.length;++i){
                    if(data.result[i].name===city){
                        cityLocation=<LocationModel>{
                            locationUId:data.result[i].uid,
                            locationName:data.result[i].name,
                            province:data.result[i].province,
                            city:data.result[i].city,
                            district:data.result[i].district,
                            address:data.result[i].address,
                            longitude:data.result[i].location.lng,
                            latitude:data.result[i].location.lat
                        }
                        break;
                    }
                }
            })
    return cityLocation;
}