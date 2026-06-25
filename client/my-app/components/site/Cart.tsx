import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ICart } from "@/type/type";
import { BASE_URL } from "@/baseUri/base_Uri";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Cart = ({ open, setOpen }: Props) => {
  const cart = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleCheckout = async (cart: ICart[]) => {
    const { data } = await axios.post(`${BASE_URL}/api/v1/stripe/checkout`, { cart }, {
      withCredentials: true,
    });
    window.location.href = data.url;
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-8">

        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-xl font-bold">🛒 Your Cart</h2>
          <span className="text-sm text-gray-500">
            {cart.length} items
          </span>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              Your cart is empty 😢
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-3 p-3 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                {/* Image */}
                <img
                  src={item.images}
                  className="w-16 h-16 object-cover rounded-md border"
                />

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-500">
                    ${item.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity(item._id))
                      }
                      className="w-7 h-7 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </button>

                    <span className="text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(addToCart({ ...item }))
                      }
                      className="w-7 h-7 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() =>
                    dispatch(removeFromCart(item._id))
                  }
                  className="text-red-500 text-xs font-medium"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t pt-4 mt-3 space-y-3">

            {/* Total */}
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total}</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => dispatch(clearCart())}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Clear
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  handleCheckout(cart);
                }}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;