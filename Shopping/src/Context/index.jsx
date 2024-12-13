import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const updateCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.name === product.name);
      if (product.quantity === 0) {
        return prev.filter((item) => item.name !== product.name);
      } else if (exists) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: product.quantity, image: product.image }
            : item
        );
      } else {
        return [...prev, { ...product, image: product.image }];
      }
    });
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  // Función para reiniciar el carrito
  const resetCart = () => {
    setCartItems([]); // Vacía la lista de productos en el carrito
  };

  return (
    <CartContext.Provider
      value={{ cartItems, updateCart, showModal, toggleModal, resetCart }} // Agregamos resetCart aquí
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);