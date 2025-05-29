import jsonwebtoken from "jsonwebtoken";
import {config} from "../config.js"

export const validateAuthToken = (allowedUserTypes = [])=>{

    return (req, res, next)=>{
        try {
            // extraer el token de las cookies
            const {authToken} = req.cookies;
            // imprimir un mensaje de eeror si no hay cookies
            if(!authToken){
                return res.json({message: "No suth token found, you must login"})
            }
            // estrarer información del token
            const decoded = jsonwebtoken.verify(authToken, config.JWT.secret)
            //verificar si es usuario permitido
            if(!allowedUserTypes.includes(decoded.userType)){
                return res.json({message: "Acces denied"})
            }
            next();
        } catch (error) {
            console.log("error"+error)
        }
    }
}