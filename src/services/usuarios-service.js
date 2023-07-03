
import sql from 'mssql';
import config from '../../dbconfig.js';
import EscribirError from '../modules/log-helper.js';
import { randomUUID } from "crypto";
import { error } from 'console';

export default class UsuariosService {

    
    getAll = async (top, orderField, sortOrder) => {

        let resultado = null

        console.log("Estoy en : UsuariosService.GetAll")

        try {
            let pool = await sql.connect(config)
            let result = await pool.request().
                query("SELECT * FROM Usuarios")

            resultado = result.recordsets[0]

        } catch (error) {
            
            EscribirError(" UsuariosService.GetAll: " + error)
        }
        return resultado;
    }

    getById = async (id) => {
        let resultado = null

        console.log("Estoy en : UsuariosService.GetByid")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().input('pid', sql.Int, id).query("SELECT * FROM Usuarios WHERE Id = @pId")

            resultado = result.recordsets[0][0]
                  

        } catch (error) {
            
            EscribirError("UsuariosService.getById: " + error)
        }
        return resultado
    }


    getByNamePassword = async (userName, password) =>
    
    {

        let returnUsuario = null;
        console.log("Estoy en : UsuariosService.GetUsuarioByNamePassword")

        try{
            let pool = await sql.connect(config);
            let result = await pool.request() 
                .input('pUserName', sql.VarChar, userName)
                .input('pPassWord', sql.VarChar, password)
                .query(`SELECT * FROM Usuarios WHERE UserName = @pUserName AND Password = @pPassWord`);
                returnUsuario = result.recordsets[0][0];
        } catch (error){
            EscribirError("UsuariosService/GetUsuarioByNamePassword: " + error);
        }
        return returnUsuario;        
    }

    getByToken = async (token) =>{
        let returnUsuario = null;
        console.log("Estoy en : UsuariosService.GetUsuarioByToken")
        try{
            let pool = await sql.connect(config);
            let result = await pool.request() 
                .input('pToken', sql.VarChar, token)
                .query(`SELECT * FROM Usuarios WHERE Token = @pToken`);
                returnUsuario = result.recordsets[0][0];
        } catch (error){
            EscribirError("UsuariosService/GetUsuarioByToken: " + error);
        }
        return returnUsuario;        
    }

    updateTokenById = async (id) => {
        let rowsAffected = 0;
        console.log("Estoy en : UsuariosService.updateTokenById")
        try{

            let token = randomUUID();
            let tokenExpirationDate = new Date();
            tokenExpirationDate.setMinutes(tokenExpirationDate.getMinutes() + 20); //le suma 20 min al tiempo actual;            

            let pool = await sql.connect(config);
            let result = await pool.request()  
                .input('pId', sql.Int, id)  
                .input('pToken', sql.VarChar, token)    
                .input('pTokenExpirationDate', sql.DateTime, tokenExpirationDate)                
                .query('UPDATE Usuarios SET Token = @pToken, TokenExpirationDate = @pTokenExpirationDate WHERE Id = @pId ');
            rowsAffected = result.rowsAffected; // devuelve la cantidad de registros afectados (1 en caso de haberse actualizado correctamente la pizza)
        } catch (error){
            EscribirError("UsuariosService/UpdateToken: " + error);
        }
        return rowsAffected;
    }

    login = async (usuario) => {
        let usuarioActualizado = null;
        console.log("Estoy en: UsuariosService.login")
        try{

            let username = usuario.UserName;
            let password = usuario.Password;
            let usuarioSeleccionado = await this.getByNamePassword(username, password);     
                
            let rowsAffected = await this.updateTokenById(usuarioSeleccionado.Id);            
            usuarioActualizado = await this.getById(usuarioSeleccionado.Id);       
        } catch (error){
            EscribirError("UsuariosService/Login: " + error);
        }
        return usuarioActualizado;
    }

}