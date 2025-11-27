import Image from "next/image";
import { Link } from "@/lib/i18n/routing";
import { useTranslations } from "@/lib/hooks";

interface FeaturedCardProps {
	alt: string;
	carpetTitle: string;
	quality: string;
	buyNow: string;
}

function FeaturedCard({ alt, carpetTitle, quality, buyNow }: FeaturedCardProps) {
	return (
		<div className="relative">
			<Image
				src="https://theme.hstatic.net/200000349469/1001214457/14/slideshow_1.jpg?v=500"
				alt={alt}
				width={1920}
				height={500}
				className="w-full h-[500px] object-cover"
				priority
			/>
			<div className="absolute bottom-16 left-12 text-white">
				<span className="block text-sm font-medium mb-1">{carpetTitle}</span>
				<h3 className="text-xl font-bold mb-6">{quality}</h3>
				<Link className="inline-block bg-white text-black px-4 py-2 text-sm font-medium border border-white hover:bg-transparent hover:text-white transition-colors uppercase" href="/collections/all">
					{buyNow}
				</Link>
			</div>
		</div>
	);
}

export function FeaturedCategories() {
	const t = useTranslations("home");
	const tSeo = useTranslations("seo");

	const carpetTitle = t("carpetTitle");
	const quality = t("quality");
	const buyNow = t("buyNow");
	const availableNow = t("availableNow");
	const siteName = tSeo("siteName");

	return (
		<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1" aria-label="Featured categories">
			<FeaturedCard
				alt={`${carpetTitle} - ${quality} tại ${siteName}`}
				carpetTitle={carpetTitle}
				quality={quality}
				buyNow={buyNow}
			/>
			<FeaturedCard
				alt={`${carpetTitle} cao cấp - ${quality} đảm bảo tại ${siteName}`}
				carpetTitle={carpetTitle}
				quality={quality}
				buyNow={buyNow}
			/>
			<FeaturedCard
				alt={`${availableNow} - ${carpetTitle} ${quality} tại ${siteName}`}
				carpetTitle={carpetTitle}
				quality={quality}
				buyNow={buyNow}
			/>
		</section>
	);
}


