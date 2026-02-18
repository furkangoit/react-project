import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero"; // <-- 1. İMPORT ET

async function getData() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    image
  }`;

  const data = await client.fetch(query);

  return data.map((product: any) => ({
    ...product,
    imageUrl: product.image ? urlFor(product.image).url() : "",
    slug: product.slug // Ensure this matches what ProductCard expects
  }));
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="bg-white dark:bg-gray-900 pb-6 sm:pb-8 lg:pb-12">
      <Hero /> {/* <-- 2. BURAYA EKLE (En üste) */}

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            En Yeni Ürünler
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
