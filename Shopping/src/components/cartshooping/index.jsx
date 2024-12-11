import React, { useState } from "react";
import { motion } from "framer-motion";
import ModalConfirmation from "../modalconfirmation";

const CartShooping = ({ cartItems, onRemoveItem }) => {
  const [showOrder, setShowOrder] = useState(false); // Corrección en la inicialización del estado

  const handleRemoveItem = (item) => {
    onRemoveItem({ ...item, quantity: 0 }); // Eliminar del carrito y reiniciar cantidad
  };

  const toggleShowOrder = () => {
    setShowOrder((prev) => !prev); // Actualizar el estado del modal
  };

  return (
    <div className="bg-white w-full h-auto flex flex-col p-4 rounded-2xl my-4 font-redhattext">
      <h1 className="text-4xl font-bold my-4 text-[#c83b0e]">
        Your Cart <span>({cartItems.length})</span>
      </h1>
      {cartItems.length === 0 ? (
        <>
          <div className="w-full flex justify-center py-4">
            <img src="/images/illustration-empty-cart.svg" alt="" />
          </div>
          <p className="text-center font-semibold text-rose-800">
            Your added items will appear here
          </p>
        </>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center my-2 border-b border-gray-300 pb-6"
            >
              <p className="text-black font-semibold flex flex-col h-10">
                {item.name}
                <div>
                  <span className="text-[#c83b0e] ">x{item.quantity}</span>
                  <span className="px-4 text-orange-950 font-normal">
                    @${item.price.toFixed(2)}
                  </span>
                  <span className="font-normal text-rose-950">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </p>
              <button
                onClick={() => handleRemoveItem(item)}
                className="border border-[#c83b0e] text-[#c83b0e] p-2 rounded-full"
              >
                <img
                  src="/images/icon-remove-item.svg"
                  alt="Delete-icon"
                  className="scale-150"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center my-4 w-full">
        <p className="text-orange-950 font-normal text-lg flex justify-between w-full">
          Order total
          <span className="text-2xl font-bold">
            $
            {cartItems
              .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
              .toFixed(2)}
          </span>
        </p>
      </div>
      <p className="flex items-center font-normal my-6 mx-auto gap-2 text-orange-950">
        <img src="/images/icon-carbon-neutral.svg" alt="Carbon Neutral" />
        this is <span className="font-semibold">carbon-neutral</span> delivery
      </p>
      <motion.button
        whileTap={{ scale: 1.1, opacity: 0.8, y: -10 }}
        onClick={toggleShowOrder} // Mostrar el modal
        className="flex justify-center items-center w-full h-12 bg-orange-700 text-white font-normal text-lg rounded-full py-2 px-6 "
      >
        Confirm Order
      </motion.button>
      <ModalConfirmation showOrder={showOrder} cartItems={cartItems} /> 
    </div>
  );
};

export default CartShooping;
