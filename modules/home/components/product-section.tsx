import { XProduct, XSkeletonProduct } from "@/components/common";
import { QUERY_KEYS } from "@/lib/constants";
import { productService } from "@/lib/services/product.service";
import { Product } from "@/modules/products/types";
import { useQuery } from "@tanstack/react-query";

interface ProductSectionProps {
	id: string;
	title: string;
}

export function ProductSection({ id, title }: ProductSectionProps) {
	const { data: productsResponse, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.PRODUCTS, id],
		queryFn: () => productService.getProducts({ limit: 8 }),
	});

	const products: Product[] = productsResponse?.data ?? [];

	return (
		<section className="max-w-7xl mx-auto mt-8 px-3 sm:px-4 md:px-6" aria-labelledby={`${id}-heading`}>
			<h2 id={`${id}-heading`} className="text-2xl font-bold py-4">{title}</h2>
			{isLoading ? (
				<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
					{[...Array(8)].map((_, i) => (
						<XSkeletonProduct key={`skeleton-${i}`} />
					))}
				</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
					{products.map((product: Product, index: number) => (
						<XProduct key={product.id} product={product} priority={index < 3} />
					))}
				</div>
			)}
		</section>
	);
}


