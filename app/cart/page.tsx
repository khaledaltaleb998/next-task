/* eslint-disable @next/next/no-img-element */
'use client';
import { cartItems, totalPrice, removeFromCart, updateQuantity, clearCart } from '@/store/cartStore';
import { useSignalValue } from '@/hooks/useSignalValue';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const items = useSignalValue(cartItems);
  const total = useSignalValue(totalPrice);
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 my-8">
      <h3 className="text-2xl font-bold mb-6">Shopping Cart</h3>
      {items.length > 0 ? (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3">Product</th>
                  <th className="py-3 w-[140px]">Quantity</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Subtotal</th>
                  <th className="py-3"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <img src={it.image} alt="" width="60" height="60" className="object-contain" />
                        <Link href={`/product/${it.id}`} className="text-inherit no-underline hover:text-brand-gold">
                          {it.title}
                        </Link>
                      </div>
                    </td>
                    <td className="py-4">
                      <input 
                        type="number" 
                        min="1" 
                        value={it.quantity}
                        onChange={(e) => updateQuantity(it.id, Number(e.target.value))}
                        className="border rounded px-2 py-1 w-20"
                      />
                    </td>
                    <td className="py-4">AED {it.price.toFixed(2)}</td>
                    <td className="py-4">AED {(it.price * it.quantity).toFixed(2)}</td>
                    <td className="py-4 text-right">
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(it.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
            <button 
              className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            <div className="text-xl font-bold">Total: AED {total.toFixed(2)}</div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="mb-4 text-lg">Your cart is empty.</div>
          <Link href="/" className="bg-brand-dark text-white px-6 py-2 rounded hover:opacity-90 transition">
            Go Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
