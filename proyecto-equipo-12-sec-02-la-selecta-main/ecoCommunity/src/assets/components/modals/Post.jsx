import React from "react";
import { useState, useEffect} from 'react';
import { createPost } from "../../services/ecoCommunity.services";

const Post = ({close}) =>{

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
    
    const initialFormData = {
      titulo: "",
      descripcion: "",
      imagen: "",
      menciones: "",
      etiquetas: "",
      tipo: "Publicación"
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
          await createPost(formData);
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

    //close();
    return(
        <>
  
          <div className="fixed inset-0 flex items-center justify-center z-100 overflow-auto bg-white bg-opacity-20">

            <div className="flex flex-col justify-center items-center bg-modal-color rounded-lg p-6 w-7/12 h-auto">
              
              <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col w-full gap-2 ">
         
            <div className="flex justify-center items-center ">
                
                <div className="flex flex-col gap-2 p-2">

                <label htmlFor="titulo">Título</label>
                  <input type="text" name="titulo" id={"titulo"} value={formData.titulo} onChange={handleChange} className="bg-transparent border-2 rounded-xl"/>

                  <label htmlFor="descripcion">Descripción</label>
                <textarea name="descripcion" id={"descripcion"} value={formData.descripcion} onChange={handleChange} cols="15" rows="10" className="bg-transparent border-2 rounded-xl h-32"></textarea>

                <label htmlFor="menciones">¿Colaboras con alguien? Etiquétalo</label>
                  <input name="menciones" id={"menciones"} value={formData.menciones} onChange={handleChange} type="text" className="bg-transparent border-2 rounded-xl"/>

                </div>
           </div>

              <div className="w-4/5 flex justify-center items-center flex-col">
                <label htmlFor="etiquetas">Etiquetas</label>
                <input className="w-full bg-transparent border-2 rounded-xl" type="text" name="etiquetas" id={"etiquetas"} value={formData.etiquetas} onChange={handleChange} />

                <label htmlFor="imagen">Imagen (URL)</label>
                <input className="w-full bg-transparent border-2 rounded-xl" type="text" name="imagen" id={"imagen"} value={formData.imagen} onChange={handleChange} />

              </div>

              <div className="flex gap-2 modal-footer justify-end pt-4">
                <button onClick={close} className="bg-transparent border-2 w-28 h-12 text-white rounded-md modal-button">Cancelar</button>
               <button type='submit' className="bg-transparent border-2 w-28 h-12 text-white rounded-md modal-button">Publicar</button>
                               
              </div>
     
              
              </form>

             
            </div>
            
{showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col justify-center items-center bg-secondcolor p-6 rounded-xl h-44 w-64" style={{ color: "black" }}>
            <p className="text-xl font-semibold mb-4 text-white">
              Publicacion creada exitosamente!!
            </p>       
            <button
              onClick={closeConfirmation}
              className="bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Cerrar
            </button>
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
              Cerrar
            </button>
          </div>
        </div>
      )}

          </div>
      </>
    );
}

export default Post;