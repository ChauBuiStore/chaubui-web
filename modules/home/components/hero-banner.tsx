import Image from "next/image";
import { useTranslations } from "@/lib/hooks";

export function HeroBanner() {
	const t = useTranslations("home");
	const tSeo = useTranslations("seo");

	return (
		<section aria-label="Hero banner">
			<Image
				src="https://theme.hstatic.net/200000349469/1001214457/14/slideshow_1.jpg?v=359"
				alt={`${tSeo("siteName")} - ${t("newProducts")} - ${t("carpetTitle")} ${t("quality")}`}
				width={1920}
				height={1000}
				className="w-full h-auto"
				priority
			/>
		</section>
	);
}


