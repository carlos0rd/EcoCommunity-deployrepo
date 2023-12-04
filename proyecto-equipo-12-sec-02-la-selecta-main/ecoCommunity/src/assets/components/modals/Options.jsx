import React from "react";
import { useState } from 'react';

const Options = () =>{

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    return(
        <>
        <button onClick={toggleModal} className="rounded-md bg-white text-black h-8 w-28">Abrir Modal</button>
  
        {isOpen && (
          <div className="flex flex-wrap overflow-auto z-50 w-auto">

            <div className="flex flex-col justify-center items-center bg-modal-color rounded-lg p-6 w-1/4 h-auto">
            <button
                onClick={toggleModal}
                className="text-white hover:text-gray-300 self-end "
              >
                &times;
              </button>
              <div className="flex flex-col gap-2 modal-footer justify-end w-full">
                
                <button className="bg-transparent border-2 w-full h-10 text-secondmodal-color rounded-md  border-modal-color hover:text-green-500 hover:text-green-500">Cerrar sesión</button>
               <button className="bg-transparent border-2 w-full h-10 text-secondmodal-color rounded-md border-modal-color ">Configuraciones</button>
               <button className="w-full h-10 hover:text-green-500">Editar perfil</button>
              </div>

             
            </div>


          </div>
        )}
      </>
    );
}

export default Options;