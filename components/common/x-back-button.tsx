"use client";

import { XButton } from "@/components/common";
import { useTranslations } from "@/lib/hooks";
import { Link } from "@/lib/i18n/routing";
import { CornerUpLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface XBackButtonProps {
  text?: string;
  href?: string;
  className?: string;
  variant?:
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
}

export function XBackButton({
  text,
  href,
  className = "inline-flex items-center justify-center gap-2 !bg-transparent hover:text-primary",
  variant = "ghost",
}: XBackButtonProps) {
  const t = useTranslations("common");
  const router = useRouter();
  const defaultText = t("backToHome");

  const handleGoBack = () => {
    router.back();
  };

  if (href) {
    return (
      <XButton variant={variant} asChild className={className}>
        <Link href={href}>
          <CornerUpLeft />
          {text || defaultText}
        </Link>
      </XButton>
    );
  }

  return (
    <XButton variant={variant} onClick={handleGoBack} className={className}>
      <CornerUpLeft />
      {text || defaultText}
    </XButton>
  );
}
