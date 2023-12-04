import React from "react";
import { useState } from 'react';
import { eliminarPublicacion } from "../../services/ecoCommunity.services";

const CancelarPublicacion = ({close, postId}) =>{

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
    
    const handleDelete = () => {
      eliminarPublicacion(postId);
      console.log(postId);
      close();
    };
    return(
        <>
  
     
          <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-white bg-opacity-20">

            <div className="flex flex-col justify-center items-center bg-secondmodal-color rounded-lg p-6 w-2/6 h-auto">
              
              <h1 className="p-2 font-bold text-modal-color text-lg text-justify">¿Deseas eliminar esta publicación?</h1>
              <div className="flex">
                <p className="p-2 text-modal-color text-sm text-justify">Debes saber que esta es una acción irreversible</p>
              </div>
              
              <div className="flex gap-2 modal-footer justify-end">
                
                <button onClick={handleDelete} className="bg-transparent border-2 w-28 h-10 text-modal-color rounded-md font-bold border-modal-color hover:text-white hover:bg-red-500 hover:duration-300">Eliminar</button>
               <button onClick={close} className="bg-transparent border-2 w-28 h-10 text-modal-color rounded-md secondmodal-button border-modal-color font-bold hover:font-bold">Conservar</button>
              </div>

             
            </div>


          </div>
       
      </>
    );
}

export default CancelarPublicacion;