/* eslint-disable @next/next/no-img-element */
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/lib/api';
import Loader from '@/components/Loader';
import Link from 'next/link';
import { addToCart } from '@/store/cartStore';
import { useState, use } from 'react';
import { Button } from '@/components/ui/button';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = use(params);
  const id = Number(idStr);
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  });

  const [qty, setQty] = useState(1);

  if (isLoading) return <Loader />;
  if (!product) return <div className="container mx-auto px-4 my-4">Product not found</div>;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    }, qty);
  };

  return (
    <div className="container mx-auto px-4 my-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="border rounded p-4 bg-white flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-[500px] w-auto object-contain" />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
          <div className="text-gray-500 mb-4 capitalize">{product.category}</div>
          <div className="text-2xl font-semibold mb-6">AED {product.price.toFixed(2)}</div>
          <p className="mb-6 text-gray-700 leading-relaxed">{product.description}</p>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <input 
              type="number" 
              min="1" 
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className="border rounded px-3 py-2 w-24"
            />
            <Button 
              className="bg-brand-dark text-white px-6 py-5 rounded hover:opacity-90 transition text-base"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
            <Link href="/cart" className="border border-black px-6 py-2 rounded hover:bg-black hover:text-white transition">
              Go to cart
            </Link>
          </div>
          
          <div className="text-sm text-gray-500">
            Rating: {product.rating?.rate ?? '-'} ({product.rating?.count ?? 0} reviews)
          </div>
        </div>
      </div>
    </div>
  );
}
