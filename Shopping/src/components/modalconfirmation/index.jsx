import { AnimatePresence, motion } from "framer-motion";

const ModalConfirmation = ({ showOrder, cartItems }) => {
  console.log(cartItems);
  return (
    <AnimatePresence>
      {showOrder && (
        <motion.div
          exit={{ y: "-100%", opacity: 0 }}
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50"
        >
          <div className="bg-rose-50 w-full h-3/4 max-w-lg rounded-lg shadow-lg p-6">
            <img
              src="/images/icon-order-confirmed.svg"
              alt="Order Confirmed"
              className="mx-auto"
            />
            <h2 className="text-3xl font-bold text-center my-4">
              Order Confirmed
            </h2>
            <p className="text-center text-gray-700">
              We hope you enjoy your food!
            </p>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-2 rounded-lg mb-2 shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex flex-col flex-grow px-4">
                    <span className="font-bold text-lg">{item.name}</span>
                    <span className="text-gray-500">
                      $ {item.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="font-bold text-lg">x {item.quantity}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No items in your cart</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalConfirmation;
