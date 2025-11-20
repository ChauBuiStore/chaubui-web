"use client";

import { XButton } from "@/components/common";
import { useTranslations } from "@/lib/hooks";
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
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <XButton variant={variant} onClick={handleGoBack} className={className}>
      <CornerUpLeft />
      {text || defaultText}
    </XButton>
  );
}
