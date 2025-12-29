/* eslint-disable @next/next/no-img-element */
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchProductsByCategoryId, categoryNameById } from '@/lib/api';
import Loader from '@/components/Loader';
import Link from 'next/link';
import { totalItems } from '@/store/cartStore';
import { useSignalValue } from '@/hooks/useSignalValue';
import { use, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = use(params);
  const id = Number(idStr);
  const title = (categoryNameById(id) || 'Category').toUpperCase();
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['category', id],
    queryFn: () => fetchProductsByCategoryId(id),
  });

  const itemsCount = useSignalValue(totalItems);
  const [price, setPrice] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [q, setQ] = useState('');
  const mounted = typeof window !== 'undefined';
  useEffect(() => {
    const t = setTimeout(() => setQ(search.trim().toLowerCase()), 500);
    return () => clearTimeout(t);
  }, [search]);

  if (isLoading) return <Loader />;
  if (!products) return <div className="container mx-auto px-4 my-4">Category not found</div>;
  const filtered = products.filter((p) => {
    const priceOk =
      price === 'all' ||
      (price === 'lt50' && p.price < 50) ||
      (price === '50-100' && p.price >= 50 && p.price <= 100) ||
      (price === 'gt100' && p.price > 100);
    const searchOk = q === '' || p.title.toLowerCase().includes(q);
    return priceOk && searchOk;
  });

  return (
    <div className="container mx-auto px-4 my-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="section-title text-xl font-bold">{title}</h3>
        <Link href="/cart" className="border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition">
          Cart ({mounted ? itemsCount : 0})
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-3 md:items-end md:justify-between mb-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Price</label>
          <select
            className="flex bg-input-color items-center px-2 py-1 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="all">All</option>
            <option value="lt50">&lt; 50</option>
            <option value="50-100">50 - 100</option>
            <option value="gt100">&gt; 100</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label className="text-sm font-medium">Search</label>
          <div className="flex items-center gap-2">
          <form
            className="flex bg-input-color items-center px-2 rounded"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
          <Input
            className="bg-transparent border-0 outline-none w-[240px] shadow-none focus-visible:ring-0 placeholder:text-gray-500"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <div className="col" key={p.id}>
            <div className="card h-full border rounded shadow-sm hover:shadow-md transition bg-white">
              <Link href={`/product/${p.id}`} className="text-inherit no-underline h-full flex flex-col">
                <img
                  src={p.image}
                  className="w-full h-[160px] object-contain p-4"
                  alt={p.title}
                />
                <div className="p-4 flex-1 flex flex-col">
                  <div className="font-semibold truncate mb-2" title={p.title}>
                    {p.title}
                  </div>
                  <div className="mt-auto">AED {p.price.toFixed(2)}</div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
