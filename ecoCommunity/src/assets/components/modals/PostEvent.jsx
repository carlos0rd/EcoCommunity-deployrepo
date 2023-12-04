import React from "react";
import { useState } from 'react';
import { createPost } from "../../services/ecoCommunity.services";

const PostEvent = ({close}) =>{

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
      fecha: "",
      ubicacion: "",
      tipo: "Evento"
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

    return(
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-white bg-opacity-20">

            <div className="flex flex-col justify-center items-center bg-modal-color rounded-lg p-6 w-7/12 h-auto">
              
              <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2 ">
         
            <div className="flex justify-center items-center flex-row w-full ">
                <div className="flex flex-col justify-center items-start items-center w-auto gap-2 pr-4 ">
                   
                 

                    <label htmlFor="etiquetas">Etiquetas</label>
                    <input type="text" name="etiquetas" id={"etiquetas"} value={formData.etiquetas} onChange={handleChange} className=" w-full bg-transparent border-2 rounded-xl"/>

                    <label htmlFor="fecha">Fecha del evento</label>
                    <input type="date" name="fecha" id={"fecha"} value={formData.fecha} onChange={handleChange} className="w-3/4 bg-transparent border-2 rounded-xl"/>

                    <label htmlFor="ubicacion">Ubicación del evento</label>
                    <input type="text" name="ubicacion" id={"ubicacion"} value={formData.ubicacion} onChange={handleChange} className=" w-full bg-transparent border-2 rounded-xl"/>
                    
                    <label htmlFor="imagen">Imagen (URL)</label>
                <input className="w-full bg-transparent border-2 rounded-xl" type="text" name="imagen" id={"imagen"} value={formData.imagen} onChange={handleChange} />


                </div>
                <div className="flex flex-col w-auto gap-2 p-2">
                    <label htmlFor="titulo">Titulo</label>
                    <input name="titulo" type="text" id={"titulo"} value={formData.titulo} onChange={handleChange} className="bg-transparent border-2 rounded-xl"/>
                  
                     <label htmlFor="descripcion">Descripción</label>
                     <textarea name="descripcion"  id={"descripcion"} value={formData.descripcion} onChange={handleChange} cols="30" rows="10" className="bg-transparent border-2 rounded-xl h-36 "></textarea>
                     
                     <label htmlFor="menciones">¿Colaboras con alguien? Etiquétalo</label>
                     <textarea name="menciones" id={"menciones"} value={formData.menciones} onChange={handleChange} cols="30" rows="10" className="bg-transparent border-2 rounded-xl h-28"></textarea>
                </div>
           </div>

            

              <div className="flex gap-2 modal-footer justify-end">
                <button onClick={close} className="bg-transparent border-2 w-28 h-12 text-white rounded-md modal-button">Cancelar</button>
               <button type="submit" className="bg-transparent border-2 w-28 h-12 text-white rounded-md modal-button">Publicar</button>
              </div>
              
              </form>
            </div>

                    
{showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col justify-center items-center bg-secondcolor p-16 rounded-xl h-44 w-64" style={{ color: "black" }}>
            <p className="text-xl font-semibold mb-4 text-white">
              Evento creado exitosamente!!
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

export default PostEvent;