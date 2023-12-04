import React from "react";
import { useState } from "react";

const FotoPerfil = ({close}) => {
  
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    return (
        <div>

        </div>
    )
}

export default FotoPerfil;