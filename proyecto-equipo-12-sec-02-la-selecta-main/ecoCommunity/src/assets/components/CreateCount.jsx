import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateCount.css';
import backgroundImage from '../../images/monte.jpeg'
import logo from '../../images/Logo1.png';
import { createUser } from '../services/ecoCommunity.services';
const CreateCount = ({ hideHeader }) => {

  const initialFormData = {
    username: "",
    email: "",
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
        await createUser(formData);
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


  return (
    <div className="unique-create-account-container h-screen relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <img src={logo} className="corner-image" alt="Monte" />

      <div className="header-buttons absolute top-0 right-0 m-4">
        
        <Link to="/about" className="unique-about-button"style={{ fontSize: '25px', padding: '15px 15px' }}>
          Acerca de
        </Link>
        <Link to="/contact" className="unique-contact-button"style={{ fontSize: '25px', padding: '15px 15px' }}>
          Contáctenos
        </Link>
      </div>

      <div className="flex justify-center items-center h-full">
        <form onSubmit={handleSubmit} className="unique-form-container flex flex-col space-y-4">
          
        <input placeholder="username" className="unique-input-field" type="text" id={"username"} name={"username"} value={formData.username} onChange={handleChange}/>
          
        <input placeholder="email" className="unique-input-field" type="text" id={"email"} name={"email"} value={formData.email} onChange={handleChange}/>

        <input placeholder="password" className="unique-input-field" type="text" id={"password"} name={"password"} value={formData.password} onChange={handleChange}/>
          
          <div className="flex justify-between">
            <button type="button" className="forgot-password-button text-left ">
              ¿Olvidaste tu contraseña?
            </button>
            <button type="submit" className="unique-create-account-button ">
              Registrarse
            </button>
          </div>
          
          <Link to="/"className="have-account-button"onClick={() => hideCreateCount()}>
          
            ¿Tienes una cuenta? Inicia sesión
          
          </Link>
        </form>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col justify-center items-center bg-secondcolor p-6 rounded-xl h-44 w-64" style={{ color: "black" }}>
            <p className="text-xl font-semibold mb-4 text-white">
              Registro exitoso!!
            </p>
            <Link to={`./`} className="">
            <button
              onClick={closeConfirmation}
              className="bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Close
            </button></Link>
          </div>
        </div>
      )}

{showErrorConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col justify-center items-center bg-secondcolor p-6 rounded-xl h-44 w-1/4">
            
            {errorMessages.map((error, index) => (
                <p className='text-xl font-semibold mb-4 text-white' key={index}>{error}</p>
              ))}
          
            <button
              onClick={() => {
                closeErrorConfirmation();
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default CreateCount;





