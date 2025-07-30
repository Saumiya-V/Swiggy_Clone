import { useLocation } from '@/hooks/useLocation';
import type { RootState } from '@/redux/store/store';
import React from 'react';
import { useSelector } from 'react-redux';

const PaymentPage: React.FC = () => {
 const cart = useSelector((state: RootState) => state.cart)
 const userAddress = useLocation()

 const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
 const deliveryFee = 2800 
 const totalWithDelivery = total + deliveryFee
 
  return (
    <div className="p-4 max-w-3xl mx-auto bg-white min-h-screen mt-30">
      <div className="text-sm text-gray-600 mb-2">
        <span className="font-semibold">Payment Options</span> · {cart.length} item · Total: ₹{totalWithDelivery/100} · <span className="text-green-600 font-semibold">Savings of ₹20</span>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="text-sm text-gray-800">
          <strong>{cart.map((item)=>{
            return <p>{item.name}</p>
          })}</strong> | Delivery in: 57 mins
        </div>
        <div className="text-sm text-gray-600">
          <strong>Home</strong> | {userAddress.userAddress}
        </div>
      </div>
      <div className="bg-green-100 text-green-700 p-3 text-sm rounded-md mb-4">
        Save upto ₹55 more with payment offers
      </div>

      <div className="mb-6">
        <h2 className="text-gray-700 font-semibold mb-2">Pay by any UPI App</h2>
        <div className="bg-gray-50 border rounded-md p-4">
          <button className="flex items-center space-x-2 text-orange-600 font-medium">
            <span className="text-xl font-bold">+</span>
            <span>Add New UPI ID</span>
          </button>
          <p className="text-xs text-gray-500 mt-1">You need to have a registered UPI ID</p>
        </div>
      </div>

      {/* Card Payment Option */}
      <div className="mb-6">
        <h2 className="text-gray-700 font-semibold mb-2">Credit & Debit Cards</h2>
        <div className="bg-gray-50 border rounded-md p-4">
          <button className="flex items-center space-x-2 text-orange-600 font-medium">
            <span className="text-xl font-bold">+</span>
            <span>Add New Card</span>
          </button>
          <p className="text-xs text-gray-500 mt-1">Save and Pay via Cards</p>
        </div>
      </div>

      {/* Other Payment Options */}
      <div>
        <h2 className="text-gray-700 font-semibold mb-2">More Payment Options</h2>
        <div className="space-y-3">
          <div className="bg-gray-50 border rounded-md p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-700 font-medium">Wallets</p>
              <p className="text-xs text-gray-500">PhonePe, Amazon Pay & more</p>
            </div>
            <span className="text-gray-400 text-xl">&gt;</span>
          </div>
          <div className="bg-gray-50 border rounded-md p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-700 font-medium">Pluxee</p>
              <p className="text-xs text-gray-500">Pluxee card valid only on Food & Instamart</p>
            </div>
            <span className="text-gray-400 text-xl">&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
