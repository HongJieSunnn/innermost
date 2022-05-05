import axios from "axios";
import { guid } from "../../services/guidServices";

export function setAuthHeader(token:string|null){
    axios.defaults.headers.common['Authorization'] = token ? 'Bearer ' + token : '';
}