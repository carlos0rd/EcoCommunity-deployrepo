import React from "react";
import { useState } from 'react';
import Post from "./Post";
import PostEvent from "./PostEvent";

const Crear = ({closeModal}) =>{

   const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    const toggle = () =>{
      setIsOpen2(!isOpen2);
      //closeModal();
    }

    return(
        <>
  
      
          <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-white bg-opacity-20">

            <div className="flex flex-col justify-center items-center bg-secondmodal-color rounded-lg p-6 w-1/4 h-auto">
              
              <h1 className="p-6 font-bold text-modal-color text-lg">Crear:</h1>
              <div className="flex gap-2 modal-footer justify-end">
                
                <button onClick={toggle} className="bg-transparent border-2 w-28 h-12 text-modal-color rounded-md secondmodal-button border-modal-color">Publicación </button>
                {isOpen2 && (
                            <Post close = {closeModal}/>
                            )}
                            
               <button onClick={toggleModal} className="bg-transparent border-2 w-28 h-12 text-modal-color rounded-md secondmodal-button border-modal-color">Evento</button>
               {isOpen && (
                            <PostEvent close = {closeModal}/>
                            )}
              </div>

             
            </div>


          </div>
     
      </>
    );
}

export default Crear;