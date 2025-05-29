import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"

import clientModel from "../models/customers.js"
import employeeModel from "../models/employees.js"

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailRecovery.js"
import { config } from "../config.js"

//Array de funciones

const RecoveryPasswordController = {};

RecoveryPasswordController.requestCode = async (req, res) =>{
    const { email } = req.body;

    try {
        let userFound
        let userType

        userFound = await clientModel.findOne({email})
        if(userFound){
            userType = "client";
        } else {
            userFound = await employeeModel.findOne({email})
            if (userFound) {
                userType = "employee";
            }
        }

        if (!userFound){
            return res.json({ message: "User not found"});
        }

        //codigo aleatorio
        const code= Math.floor(10000 + Math.random() * 90000).toString

        const token = jsonwebtoken.sign(
            //¿Que voy a Guardar?
            {email, code, userType, verified: false},
            //Secret Key
            config.JWT.secret,
            //¿Cuando expira?
            {expiresIn: "20m"}

        )

        //Guardar el Token en un a Cookie
        res.cookie("tokenRecoveryCode", token, {maxAge: 20*60*1000})

        await sendEmail(
            email,
            "Password recovery code",
            `Your verification code is: $(code)`,
            HTMLRecoveryEmail(code)
        )

        res.json({message: "Verification code sent"})

    } catch (error) {
        console.log("error" + error)
    }
}


//Verificar Codigo

RecoveryPasswordController.verifieCode = async (req, res) =>{
    const { code } = req.body

    try {
        //Obtenemos el Token
        const token = req.cookies.tokenRecoveryCode
        //Encontrar el codigo del token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        //Comparar el codigo que el usuario escribe con el que tenfo gardado en el token, eso lo hacemos con un if, si el codigo que tengo guardado en decoded es igual al codigo que el ususario escribio
        if(decoded.code !== code){
           return  res.json({message: "Invalid Code"})
        }
        const newToken = jsonwebtoken.sign(

            {email: decoded.email,
                code: decoded.code,
                userType: decoded.userType,
                verified: true
            },
            //secret Key
            config.JWT.secret,
            {expiresIn: "20m"}
        )

        res.cookie("tokenRecoveryCode", newToken,{maxAge: 20*60*100})

        res.json({message: "Codigo Verificado"})
    } catch (error) {
        console.log("error" + error)
    }
}

export default RecoveryPasswordController;