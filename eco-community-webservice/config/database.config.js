const Mongoose = require("mongoose");
const debug = require('debug')('app:database');

const dbuser = process.env.DBUSER || "00055421";
const dbpasw = process.env.DBPW   || "DYvcvW2h7Iw8KcmN";
const dbname = process.env.DBNAME || "ecoommunity";

const dburi = process.env.DBURI || `mongodb+srv://${dbuser}:${dbpasw}@cluster0.zvegbsq.mongodb.net/${dbname}?retryWrites=true&w=majority`;

/*Metodo para la conexión a la base en mongodb*/
const connect = async () =>{
    try{
        await Mongoose.connect(dburi);
        debug("Connection to database started")
    }
    catch(error){
        console.error(error);
        debug("No se pudo establecer conexión a la base de datos");
        process.exit(1);
    }
} 

/*Metodo para desconectar la base de datos*/
const disconnect = async () =>{
    try{
        await Mongoose.disconnect();
        debug("Connection to database end")
    }
    catch(error){
        process.exit(1);
    }
} 

module.exports = {
    connect,
    disconnect
}