import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { type SanityImageSource } from "@sanity/image-url";

interface ProductCardProps {
    product: {
        _id: string;
        name: string;
        slug: { current: string };
        price: number;
        mainImage: SanityImageSource;
        category: string;
        stockStatus: string;
    };
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Link href={`/products/${product.slug.current}`} className="group relative block overflow-hidden rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-indigo-500/50">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                {product.mainImage ? (
                    <Image
                        src={urlFor(product.mainImage).url()}
                        alt={product.name}
                        fill
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}

                {product.stockStatus === 'outOfStock' && (
                    <div className="absolute top-2 right-2 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                        Out of Stock
                    </div>
                )}
                {product.stockStatus === 'preOrder' && (
                    <div className="absolute top-2 right-2 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                        Pre-Order
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                    <span className="inline-block rounded-full bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 capitalize">
                        {product.category}
                    </span>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        ${product.price}
                    </p>
                </div>

                <h3 className="text-base font-medium text-gray-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {product.name}
                </h3>
            </div>
        </Link>
    );
};

export default ProductCard;
