import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../images/monte.jpeg'
import logoImage from '../../images/Logo1.png';
import './Header.css';
import { login, whoAmI } from '../services/ecoCommunity.services';


const Header = () => {

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
  return (
    <div className="header-container relative flex justify-center items-center">
      <img src={backgroundImage} alt="Fondo" className="header-image" />
      <div className="header-overlay absolute inset-0 flex items-center">
        <div className='flex justify-center items-center w-1/2'>
        <img src={logoImage} alt="Logo" className="logo-image" />
        </div>

        <div className="login-section w-1/2 flex justify-center items-center">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Usuario"
              className="input-field"
              id={"identifier"}
              name={"identifier"} 
              value={formData.identifier} 
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="input-field"
              id={"password"}
              name={"password"} 
              value={formData.password} 
              onChange={handleChange}
            />
            <div className="flex flex-col items-center">
              <div className="flex justify-between items-center w-full">
                <button className="forgot-password-button">
                  ¿Olvidaste tu contraseña?
                </button>
                <button className="text-maincolor bg-green-500 rounded-3xl h-16 w-56" type='submit' >
                  Iniciar Sesión
                </button>
              </div>
              <Link to="/create-account"className="create-account-button"onClick={() => hideHeader()}>
               Crear nueva cuenta
                  </Link>

            </div>
          </form>
        </div>
      </div>
      <div className="header-buttons absolute top-0 right-0 m-4">
        <Link to="/about" className="about-button" style={{ fontSize: '25px', padding: '15px 15px' }}>
          Acerca de
        </Link>
        <Link to="/contact" className="contact-button" style={{ fontSize: '25px', padding: '15px 15px' }}>
          Contáctenos
        </Link>
      </div>
      
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col justify-center items-center bg-secondcolor p-6 rounded-xl h-44 w-64" style={{ color: "black" }}>
            <p className="text-xl font-semibold mb-4 text-white">
              Bienvenido!!
            </p>
            <Link to={`/Feed`} className="">
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

export default Header;















