import React from "react";
import { useState, useEffect } from 'react';
import { getParticipants } from "../../services/ecoCommunity.services";
import Volunteer from "./Volunteer";


const ParticipantsList = ({participantes}) => {

    if(participantes[0] == undefined){
        return(
            <h1 className="text-sm text-maincolor font-bold">Aún no hay participantes...</h1>
        );
    }
    else{
        return(
      
            <div className="w-full">
  
            {participantes.map((list) => (
                        <Volunteer list = {list} key = {list._id}/>                    
                    ))}   
  
            </div>
     
      );
    }
   
}

export default ParticipantsList;