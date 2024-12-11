import React, { useEffect, useState } from "react";
import CardShooping from "./components/card";
import CartShooping from "./components/cartshooping";
import data from "./data/data.json";

const App = () => {
  const [postres, setPostres] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setPostres(data);
  }, []);

  const handleUpdateCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.name === product.name);
      if (product.quantity === 0) {
        return prev.filter((item) => item.name !== product.name);
      } else if (exists) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: product.quantity }
            : item
        );
      } else {
        return [...prev, product];
      }
    });
  };

  return (
    <main className="bg-rose-50 w-full min-h-screen p-4 font-redhattext">
      <h1 className="text-4xl font-black mb-4">Desserts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container m-auto">
        {postres.map((postre, index) => (
          <CardShooping
            key={index}
            image={postre.image}
            name={postre.name}
            category={postre.category}
            price={postre.price}
            onUpdateCart={handleUpdateCart}
            cartItems={cartItems} // Pasar carrito para sincronización
          />
        ))}
      </div>
      <CartShooping cartItems={cartItems} onRemoveItem={handleUpdateCart} />
    </main>
  );
};

export default App;
