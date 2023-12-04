import React from "react";
import { useState } from 'react';

const PostInteractions = () =>{

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    return(
        <>  
      
          <div className="flex flex-wrap overflow-auto z-50 w-auto absolute">

            <div className="flex flex-col justify-center items-center bg-modal-color rounded-lg p-6 w-72 h-auto">
          
              <div className="flex flex-col gap-2 modal-footer justify-end w-full">
                
                <button className="flex gap-2 justify-center bg-transparent border-2 w-full h-10 text-secondmodal-color rounded-md  border-modal-color hover:text-green-500 hover:text-green-500">
                <span class="material-symbols-outlined">link</span>Copiar vínculo</button>
                
                <button className="flex gap-2 justify-center bg-transparent border-2 w-full h-10 text-secondmodal-color rounded-md  border-modal-color hover:text-green-500 hover:text-green-500">
                <span class="material-symbols-outlined">share</span>Compartir en</button>

                <button className="flex gap-2 justify-center bg-transparent border-2 w-full h-10 text-secondmodal-color rounded-md  border-modal-color hover:text-green-500 hover:text-green-500">
                <span class="material-symbols-outlined">mail</span>Enviar a</button>
              </div>

             
            </div>


          </div>
       
      </>
    );
}

export default PostInteractions;