/* eslint-disable @next/next/no-img-element */
'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { fetchAllProducts } from '@/lib/api';
import Loader from '@/components/Loader';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Home() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const specialTrack = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(4);
  const [category, setCategory] = useState<string>('all');
  const [price, setPrice] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [q, setQ] = useState('');

  useEffect(() => {
    const updatePerView = () => {
      const w = window.innerWidth;
      setPerView(w >= 992 ? 4 : w >= 768 ? 4 : 2);
    };
    updatePerView();
    window.addEventListener('resize', updatePerView);
    return () => window.removeEventListener('resize', updatePerView);
  }, []);
  useEffect(() => {
    const t = setTimeout(() => setQ(search.trim().toLowerCase()), 500);
    return () => clearTimeout(t);
  }, [search]);

  if (isLoading) return <Loader />;
  if (!products) return null;

  const specials = products
    .filter((p) => (p.rating?.rate || 0) >= 3)
    .slice(0, 15);
  const arrivals = products.slice(-4);
  const filteredProducts = products.filter((p) => {
    const catOk =
      category === 'all' ||
      p.category.toLowerCase() === category;
    const priceOk =
      price === 'all' ||
      (price === 'lt50' && p.price < 50) ||
      (price === '50-100' && p.price >= 50 && p.price <= 100) ||
      (price === 'gt100' && p.price > 100);
    const searchOk = q === '' || p.title.toLowerCase().includes(q);
    return catOk && priceOk && searchOk;
  });

  const pages = Math.max(1, Math.ceil(specials.length / perView));

  const goTo = (index: number) => {
    const el = specialTrack.current;
    if (!el) return;
    const nextIndex = Math.min(pages - 1, Math.max(0, index));
    setCurrent(nextIndex);
    el.scrollTo({ left: nextIndex * el.clientWidth, behavior: 'smooth' });
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const onScroll = () => {
    const el = specialTrack.current;
    if (!el) return;
    setCurrent(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div>
      <section
        className="animate-fadeUp h-screen bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/Images/Header.jpg')" }}
      >
        <div className="flex items-center justify-center container mx-auto h-full w-full px-4">
          <div className="md:w-1/2">
            <h2 className="section-title mb-2 text-4xl">SALE</h2>
            <p className="mb-4">Access a limited selection with up to 70% off.</p>
            <Link href="/category/1" className="shop-btn inline-flex">
            <Button className="bg-brand-dark text-white hover:bg-brand-dark/90">
              <div className="uppercase">Shop Now</div>
              <span className="text-2xl">&rarr;</span>
            </Button>
            </Link>
          </div>
          <div className="md:w-1/2"></div>
        </div>
      </section>

      <section
        className="relative text-white vh-50 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/Images/Jewelry.jpg')" }}
      >
        <div className="container mx-auto h-full flex py-5 px-4 relative">
          <Link href="/category/2" className="see-more-btn self-end">
          <Button className="bg-white text-black hover:bg-white/90">
            <div className="uppercase">See more</div>
            <span className="text-2xl">&rarr;</span>
          </Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto my-5 px-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="section-title text-xl">SPECIAL OFFERS</h3>
          <Link href="/category/1" className="border border-black px-3 py-1 text-sm rounded hover:bg-black hover:text-white transition">
            View All
          </Link>
        </div>
        <div className="relative group">
          <button className="swiper-btn left" onClick={prev}>
            &larr;
          </button>
          <button className="swiper-btn right" onClick={next}>
            &rarr;
          </button>
          <div
            ref={specialTrack}
            className="specials-track"
            onScroll={onScroll}
          >
            {specials.map((p) => (
              <div className="specials-item p-2" key={p.id}>
                <div className="card h-full border rounded shadow-sm hover:shadow-md transition bg-white">
                  <Link href={`/product/${p.id}`} className="text-inherit no-underline h-full flex flex-col">
                    <img
                      src={p.image}
                      className="w-full h-[150px] object-contain p-4"
                      alt={p.title}
                    />
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="text-sm text-gray-500 capitalize mb-1">{p.category}</div>
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
          <div className="flex justify-center gap-2 mt-3">
            {Array.from({ length: pages }).map((_, i) => (
              <span
                key={i}
                className={`line ${current === i ? 'active' : ''}`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto my-6 px-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-end md:justify-between mb-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Category</label>
            <select
              className="flex bg-input-color items-center px-2 py-1 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men&apos;s Clothing</option>
              <option value="women's clothing">Women&apos;s Clothing</option>
            </select>
          </div>
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
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="w-6 h-6 text-brand-dark" />
            </form>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((p) => (
            <div className="col" key={p.id}>
              <div className="card h-full border rounded shadow-sm hover:shadow-md transition bg-white">
                <Link href={`/product/${p.id}`} className="text-inherit no-underline h-full flex flex-col">
                  <img
                    src={p.image}
                    className="w-full h-[160px] object-contain p-4"
                    alt={p.title}
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="text-sm text-gray-500 capitalize mb-1">{p.category}</div>
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
      </section>

      <section className="my-4 container mx-auto px-4">
        <div className="relative">
          <img
            src="/Images/Untitled-1.jpg"
            className="w-full h-auto rounded"
            alt="Brand"
          />
        </div>
      </section>

      <section className="container mx-auto my-5 px-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="section-title text-xl">NEW ARRIVALS</h3>
          <Link href="/category/4" className="border border-black px-3 py-1 text-sm rounded hover:bg-black hover:text-white transition">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {arrivals.map((p) => (
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
      </section>

      <section className="bg-brand-gold py-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-center gap-5 items-center px-4">
          <div className="font-semibold uppercase text-2xl text-center md:text-left">
            Become a member & get 15% off
          </div>
          <a href="#" className="shop-btn text-black border-b border-black pb-1">
          <Button className="bg-brand-gold text-black hover:bg-brand-gold/90">
            <div className="uppercase">Sign up for free</div>
            <span className="text-2xl">&rarr;</span>
          </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
