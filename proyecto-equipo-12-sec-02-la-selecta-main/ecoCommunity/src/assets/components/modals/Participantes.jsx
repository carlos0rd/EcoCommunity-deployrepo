import React from "react";
import { useState, useEffect } from 'react';
import { getParticipants } from "../../services/ecoCommunity.services";
import ParticipantsList from "./ParticipantsList";

const Participantes = ({close, postId}) =>{

    const [isOpen, setIsOpen] = useState(false);
    const [participantes, setParticipantes] = useState([]);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };


    const getVolunteers = async () => {
      const participantes = await getParticipants(postId);
      setParticipantes(participantes);
      console.log(participantes);
    };

    useEffect(()=>{
      getVolunteers();
    }, []);
  

    return(
        <>
  
          <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-white bg-opacity-20">

            <div className="flex flex-col justify-center items-center bg-secondmodal-color rounded-lg p-6 w-1/4 h-auto">
              
              <h1 className="p-2 font-bold text-modal-color text-lg">Participantes</h1>
     
              <ParticipantsList participantes = {participantes}/>

              <div className="flex gap-2 modal-footer justify-end pt-4">
                
                <button onClick={close} className="bg-transparent border-2 w-28 h-8 text-modal-color rounded-md secondmodal-button border-modal-color">Cancelar</button>
               <button className="bg-transparent border-2 w-28 h-8 text-modal-color rounded-md secondmodal-button border-modal-color">Guardar</button>
              </div>

             
            </div>


          </div>
   
      </>
    );
}

export default Participantes;