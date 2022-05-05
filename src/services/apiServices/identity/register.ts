import axios from "axios";
import { RegisterModel } from "../../../components/innermost.identity/Register";

export function register(registerModel:RegisterModel){
    axios
        .post("https://localhost:5106/Account/Register",registerModel)
        .then(res=>{
            if(res.status==200){
                return res.data;
            }

            if(res.status==400){
                
            }
        })
}