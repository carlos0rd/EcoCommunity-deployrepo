import React from "react";
import { useState } from "react";

const DonativoAceptado = ({close}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModel = () => {
      setIsOpen(!isOpen);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
            <div className="flex flex-col justify-center items-center bg-maincolor rounded-lg p-6 w-1/4 h-auto">
                <h2 className="p-2 font bold text-secondmodal-color text-lg">Donación aceptada</h2>
                <button><span className="material-symbols-outlined">check_circle</span></button>
                <div className="flex gap-2 modal-footer justify-end">
                    <button onClick={close} className="bg-transparent border-2 w-28 h-10 text-secondmodal-color rounded-md secondmodal-butto border-secondmodal-color">Ok</button>
                </div>
            </div>
        </div>
    )
}

export default DonativoAceptado;