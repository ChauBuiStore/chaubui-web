import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/lib/hooks";

function FeaturedCard({ alt }: { alt: string }) {
	const t = useTranslations("home");
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
				<span className="block text-sm font-medium mb-1">{t("carpetTitle")}</span>
				<h3 className="text-xl font-bold mb-6">{t("quality")}</h3>
				<Link className="inline-block bg-white text-black px-4 py-2 text-sm font-medium border border-white hover:bg-transparent hover:text-white transition-colors uppercase" href="/collections/all">
					{t("buyNow")}
				</Link>
			</div>
		</div>
	);
}

export function FeaturedCategories() {
	const t = useTranslations("home");
	const tSeo = useTranslations("seo");
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1" aria-label="Featured categories">
			<FeaturedCard alt={`${t("carpetTitle")} - ${t("quality")} tại ${tSeo("siteName")}`} />
			<FeaturedCard alt={`${t("carpetTitle")} cao cấp - ${t("quality")} đảm bảo tại ${tSeo("siteName")}`} />
			<FeaturedCard alt={`${t("availableNow")} - ${t("carpetTitle")} ${t("quality")} tại ${tSeo("siteName")}`} />
		</section>
	);
}


