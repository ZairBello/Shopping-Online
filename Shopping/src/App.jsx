import React from "react";
import CardShooping from "./components/card";
import CartShooping from "./components/cartshooping";
import ModalConfirmation from "./components/modalconfirmation";
import { CartProvider } from "./Context";
import data from "./data/data.json";
import { motion } from "framer-motion";

const App = () => {
  return (
    <CartProvider>
      <main className="bg-rose-50 w-full min-h-screen p-4 font-redhattext">
        <div className="container lg:grid lg:grid-cols-4 p-6 gap-4">
          <div className="col-span-3 flex justify-between items-center">
            <h1 className="text-4xl font-black mb-4">Desserts</h1>
            <p className="text-orange-900">zairb1001@gmail.com</p>
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container m-auto col-span-3 ">
            {data.map((postre, index) => (
              <CardShooping
                key={index}
                image={postre.image}
                name={postre.name}
                category={postre.category}
                price={postre.price}
              />
            ))}
          </motion.div>
          <div className="col-span-2 col-start-4 row-span-2 row-start-1">
            <CartShooping />
          </div>
          <ModalConfirmation />
        </div>
      </main>
    </CartProvider>
  );
};

export default App;
