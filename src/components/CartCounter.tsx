"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useEffect, useState } from "react";

const CartCounter = () => {
    const items = useCartStore((state) => state.items);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <span className="text-gray-500">
                Cart (0)
            </span>
        )
    }

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <Link href="/cart" className="group -m-2 flex items-center p-2">
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white">
                Cart ({itemCount})
            </span>
        </Link>
    );
};

export default CartCounter;
