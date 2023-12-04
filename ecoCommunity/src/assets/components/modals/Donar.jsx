import React from "react";
import { useState } from 'react';
import DonativoAceptado from "./DonativoAceptado";
import DonativoRechazado from "./DonativoRechazado";

const Donar = ({ close }) => {
  const [count, setCount] = useState(0);
  const [isOpenAceptado, setIsOpenAceptado] = useState(false);
  const [isOpenRechazado, setIsOpenRechazado] = useState(false);

  const toggleAceptado = () => {
    setIsOpenAceptado(!isOpenAceptado);
  };

  const toggleRechazado = () => {
    setIsOpenRechazado(!isOpenRechazado);
  };

  const validValue = () => {
    if (count > 0) {
      setIsOpenAceptado(true);
    } else if (count <= 0) {
      setIsOpenRechazado(true);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-white bg-opacity-20">
      {isOpenAceptado ? (
        <DonativoAceptado close={close} />
      ) : isOpenRechazado ? (
        <DonativoRechazado close={close} />
      ) : (
        <div className="flex flex-col justify-center items-center bg-secondmodal-color rounded-lg p-6 w-1/4 h-auto">
          <h1 className="p-2 font-bold text-modal-color text-lg">¿Cuánto deseas donar?</h1>
          <div className="flex">
            <button
              onClick={() => setCount((count) => count - 1)}
              className="p-2 font-bold text-modal-color text-xl hover:text-green-700"
            >
              {" "}
              -{" "}
            </button>
            <h2 className="p-2 font-bold text-modal-color text-lg">${count}.00</h2>
            <button
              onClick={() => setCount((count) => count + 1)}
              className="p-2 font-bold text-modal-color text-xl hover:text-green-700"
            >
              {" "}
              +{" "}
            </button>
          </div>
          <div className="flex gap-2 modal-footer justify-end">
            <button
              onClick={close}
              className="bg-transparent border-2 w-28 h-10 text-modal-color rounded-md secondmodal-button border-modal-color"
            >
              Cancelar
            </button>
            <button
              onClick={validValue}
              className="bg-transparent border-2 w-28 h-10 text-modal-color rounded-md secondmodal-button border-modal-color"
            >
              Donar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donar;
