import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";

interface Product {
    _id: string;
    name: string;
    slug: { current: string };
    price: number;
    mainImage: any;
    gallery: any[];
    description: any;
    category: string;
    stockStatus: string;
    material: string;
}

const ProductPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params;
    const product = await client.fetch<Product>(`
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      price,
      mainImage,
      gallery,
      description,
      category,
      stockStatus,
      material
    }
  `, { slug });

    if (!product) {
        notFound();
    }

    return (
        <div className="bg-white dark:bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                {/* Product Images */}
                <div className="mt-8 lg:mt-0">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
                        {product.mainImage && (
                            <Image
                                src={urlFor(product.mainImage).url()}
                                alt={product.name}
                                width={800}
                                height={800}
                                className="h-full w-full object-cover object-center"
                            />
                        )}
                    </div>
                    {/* Gallery */}
                    {product.gallery && (
                        <div className="mt-4 grid grid-cols-4 gap-4">
                            {product.gallery.map((image: any, index: number) => (
                                <div key={index} className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                                    <Image
                                        src={urlFor(image).url()}
                                        alt={`${product.name} gallery image ${index + 1}`}
                                        width={200}
                                        height={200}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h1>
                    <div className="mt-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900 dark:text-gray-200">${product.price}</p>
                    </div>

                    <div className="mt-6">
                        <h3 className="sr-only">Description</h3>
                        <div className="space-y-6 text-base text-gray-700 dark:text-gray-300">
                            {/* Simplified description rendering for now */}
                            {typeof product.description === 'string' ? product.description : <PortableText value={product.description} />}
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="flex items-center">
                            <span className="mr-2 font-semibold text-gray-900 dark:text-white">Category:</span>
                            <span className="capitalize text-gray-600 dark:text-gray-400">{product.category}</span>
                        </div>
                        <div className="flex items-center mt-2">
                            <span className="mr-2 font-semibold text-gray-900 dark:text-white">Material:</span>
                            <span className="capitalize text-gray-600 dark:text-gray-400">{product.material}</span>
                        </div>
                        <div className="flex items-center mt-2">
                            <span className="mr-2 font-semibold text-gray-900 dark:text-white">Status:</span>
                            <span className={`capitalize font-medium ${product.stockStatus === 'inStock' ? 'text-green-600' : 'text-red-600'}`}>
                                {product.stockStatus === 'inStock' ? 'In Stock' : product.stockStatus === 'preOrder' ? 'Pre-Order' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>


                    <div className="mt-10 flex">
                        <AddToCart product={{
                            _id: product._id,
                            name: product.name,
                            slug: product.slug.current,
                            price: product.price,
                            image: product.mainImage ? urlFor(product.mainImage).url() : ''
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
