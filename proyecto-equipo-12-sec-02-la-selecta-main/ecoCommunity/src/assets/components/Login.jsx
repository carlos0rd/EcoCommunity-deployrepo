import React from "react";
import { useState, useEffect } from "react";
import { login, getAllPosts } from "../services/ecoCommunity.services";
import { Link } from "react-router-dom";
import Feed from "./Feed";

const Login = () => {
    
    const initialFormData = {
        identifier: "",
        password: "",
      };
    
      const [formData, setFormData] = useState(initialFormData);
      const [showConfirmation, setShowConfirmation] = useState(false);
      const [showErrorConfirmation, setShowErrorConfirmation] = useState(false);
      const [errorMessages, setErrorMessages] = useState([]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        //validaciones
        //const validationErrors = validateForm(formData);
    
        //Limpiar mensajes de error anteriores
        // if(validationErrors.length > 0){
          //  setErrorMessages(validationErrors);
            //return;
         //}
    
         try{
            await login(formData);
            setShowConfirmation(true);
            setFormData(initialFormData);
         }
         catch(error){
            setErrorMessages([error.message]);
            setShowErrorConfirmation(true);
         }
      };


      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]:
             e.target.value,
        });
      };
    
      const closeConfirmation = () => {
        setShowConfirmation(false);
      };
    
      const closeErrorConfirmation = () => {
        setShowErrorConfirmation(false);
      };


    return(
        <div className="h-auto min-w-full bg-maincolor ">
             <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 p-4 text-black">

                <input placeholder="username" type="text" id={"identifier"} name={"identifier"} value={formData.identifier} onChange={handleChange}/>
                <input placeholder="password" type="text" id={"password"} name={"password"} value={formData.password} onChange={handleChange}/>
               
                <button type="submit" className="bg-white ">Iniciar sesión</button>
              
                {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md" style={{ color: "black" }}>
            <p className="text-lg font-semibold mb-4">
              Bienvenido!!
            </p>
            <Link to={`./Feed`} className="">
            <button
              onClick={closeConfirmation}
              className="bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Close
            </button></Link>
          </div>
        </div>
      )}
            </form>
        </div>
    );
}

export default Login;