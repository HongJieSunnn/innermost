import { message } from "antd";
import axios from "axios";
import { Album, MusicRecord, Singer } from "../../../components/innermost.musichub/MusicHubTypes";

const domain="https://localhost:7037";

export async function searchMusicRecords(name:string):Promise<MusicRecord[]>{
    try {
        let res=await axios.get(`${domain}/api/search/music?name=${name}`);
        if(res.status===200){
            message.success("查询成功");
            return res.data;
        } 
    } catch (error) {
        message.error("查询失败");
    }
    return [];
}

export async function searchAlbums(name:string):Promise<Album[]>{
    try {
        let res=await axios.get(`${domain}/api/search/album?name=${name}`);
        if(res.status===200){
            message.success("查询成功");
            return res.data;
        } 
    } catch (error) {
        message.error("查询失败");
    }
    return [];
}

export async function searchSingers(name:string):Promise<Singer[]>{
    try {
        let res=await axios.get(`${domain}/api/search/singer?name=${name}`);
        if(res.status===200){
            message.success("查询成功");
            return res.data;
        } 
    } catch (error) {
        message.error("查询失败");
    }
    return [];
}