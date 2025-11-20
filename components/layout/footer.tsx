"use client";

import { useTranslations } from "@/lib/hooks";
import { MapPinIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const t = useTranslations("footer");
  const tMenu = useTranslations("menu");
  const tSeo = useTranslations("seo");
  return (
    <footer
      className="bg-background"
      aria-label={t("ariaLabel")}
    >
      <section className="bg-muted py-3" aria-labelledby="support-section">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0">
            <div className="flex py-4 space-x-2">
              <PhoneIcon aria-hidden="true" />
              <span className="font-medium">{t("supportPhone")}</span>
              <a
                href="tel:0934581544"
                className="text-phone hover:text-primary transition-colors duration-200 cursor-pointer"
                aria-label={t("callSupport")}
              >
                0934581544
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-8" aria-labelledby="footer-links">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 id="footer-links" className="font-medium text-xl">
                {t("contactInfo")}
              </h3>
              <address className="not-italic space-y-2">
                <div className="flex items-start space-x-2">
                  <MapPinIcon aria-hidden="true" />
                  <p className="text-sm">{t("address")}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm">0934581544</span>
                </div>
              </address>
            </div>

            <nav className="space-y-3" aria-labelledby="product-links">
              <h3 id="product-links" className="font-medium text-xl">
                {t("links")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {tMenu("allProducts")}
                  </Link>
                </li>
              </ul>
            </nav>

            <nav className="space-y-3" aria-labelledby="support-links">
              <h3 id="support-links" className="font-medium text-xl">
                {t("support")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {t("search")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {t("about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {t("returnPolicy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {t("privacyPolicy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {t("termsOfService")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {t("contact")}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="space-y-3">
              <h3 className="font-medium text-xl">{t("fanpage")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-lg border-l-[5px] border-l-border py-2 px-5 block hover:text-primary hover:border-l-primary transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("visitFanpage")}
                  >
                    {tSeo("siteName")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-t border-border py-5"
        aria-labelledby="copyright"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center">
            <p id="copyright" className="text-sm">
              {t("copyright")} <time dateTime={new Date().getFullYear().toString()} suppressHydrationWarning>{new Date().getFullYear()}</time>
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
