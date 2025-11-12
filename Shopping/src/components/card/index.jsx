import React, { useState, useEffect } from "react";
import { useCart } from "../../Context";

const CardShooping = ({ image, name, category, price }) => {
  const { cartItems, updateCart } = useCart();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const itemInCart = cartItems.find((item) => item.name === name);
    setQuantity(itemInCart ? itemInCart.quantity : 0);
  }, [cartItems, name]);

  const handleAddToCart = () => {
    if (quantity === 0) {
      setQuantity(1);
      updateCart({ name, price, quantity: 1, image });
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      updateCart({ name, price, quantity: newQuantity, image });
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        const newQuantity = prev - 1;
        updateCart({ name, price, quantity: newQuantity, image });
        return newQuantity;
      } else {
        updateCart({ name, price, quantity: 0, image });
        return 0;
      }
    });
  };

  return (
    <div className="w-full h-full m-2 max-w-xs mx-auto">
      <img
        src={image.thumbnail}
        alt={name}
        className={`w-full h-auto object-cover rounded-lg cursor-pointer ${
          quantity > 0 ? "border border-orange-800 duration-300" : "border-none"
        }`}
        onClick={handleAddToCart}
        srcSet={`
                    ${image.mobile} 375w,
                    ${image.tablet} 768w,
                    ${image.desktop} 1200w
                `}
        sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
      />
      <div className="w-full flex justify-center">
        <button
          onClick={quantity === 0 ? handleAddToCart : null}
          className={`flex items-center px-8 py-3 text-orange-800 bg-white border border-rose-950 rounded-3xl -mt-6 font-semibold ${
            quantity > 0 ? "bg-orange-600 text-white duration-300" : ""
          }`}
        >
          {quantity > 0 ? (
            <div className="flex items-center justify-between  text-white space-x-9">
              <button onClick={handleDecrement}>
                <img
                  src="/images/icon-decrement-quantity.svg"
                  alt="Decrease quantity"
                  className="rounded-full border border-white p-1 py-2"
                />
              </button>
              <span>{quantity}</span>
              <button onClick={handleIncrement}>
                <img
                  src="/images/icon-increment-quantity.svg"
                  alt="Increase quantity"
                  className="rounded-full border border-white p-1"
                />
              </button>
            </div>
          ) : (
            <>
              <img
                src="/images/icon-add-to-cart.svg"
                alt="Add to Cart"
                className="mr-2"
              />
              Add to Cart
            </>
          )}
        </button>
      </div>
      <p className="text-gray-600">{category}</p>
      <h2 className="text-xl font-semibold mt-2">{name}</h2>
      <p className="text-lg font-bold text-[#c83b0e]">
        Precio: ${price.toFixed(2)}
      </p>
    </div>
  );
};

export default CardShooping;
