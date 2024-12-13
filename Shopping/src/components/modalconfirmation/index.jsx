import React from "react";
import { useCart } from "../../Context";
import { AnimatePresence, motion } from "motion/react";

const ModalConfirmation = () => {
  const { showModal, toggleModal, cartItems, resetCart } = useCart();

  const handleNewOrder = () => {
    resetCart(); // Vaciar el carrito
    toggleModal(); // Cerrar el modal
  };

  return (
    <AnimatePresence>
      {showModal ? (
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "backInOut" }}
          className="fixed inset-0 z-50 flex items-end justify-center lg:items-center bg-black bg-opacity-50 overflow-hidden font-redhattext"
        >
          <motion.div
            exit={{ opacity: 0, y: "50%" }}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "backInOut" }}
            className="bg-rose-50 w-full h-5/6 lg:w-2/6 lg:h-3/4 rounded-t-xl lg:rounded-3xl p-6"
          >
            <img
              src="/images/icon-order-confirmed.svg"
              alt="Order Confirmed"
              className="mb-4"
            />
            <h2 className="text-3xl font-bold my-4">
              Order
              <span className="hidden lg:inline"> Confirmed</span>
              <br />
              <span className="lg:hidden">Confirmed</span>
            </h2>
            <p className="text-gray-700 mb-5">We hope you enjoy your food!</p>
            <div className="bg-orange-100 w-full h-2/4 rounded-3xl flex flex-col overflow-y-auto p-6">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2, ease: "backOut" }}
                    key={index}
                    className="flex items-center justify-between p-2 mb-2 border-b rounded-b-md border-b-gray-300 w-full"
                  >
                    <img
                      src={item.image.thumbnail}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex flex-col flex-grow px-4 truncate">
                      <span className="font-bold text-base truncate">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-x-3">
                        <span className="font-bold text-base text-orange-900">
                          {" "}
                          {item.quantity}x
                        </span>
                        <span className="text-orange-900 text-base">
                          @ ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-base text-orange-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No items in your cart
                </p>
              )}
              <div className="mt-6 flex justify-between items-center">
                <p className="text-orange-900 ">Order Total</p>
                <span className="font-bold text-2xl text-orange-950">
                  $
                  {cartItems
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 1.05, opacity: 0.9, y: -10 }}
              className="bg-orange-700 text-white p-4 w-full rounded-full mt-4"
              onClick={handleNewOrder}
            >
              Start New Order
            </motion.button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ModalConfirmation;
