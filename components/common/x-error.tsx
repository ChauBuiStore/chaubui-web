import { useTranslations } from "@/lib/hooks";

interface XErrorProps {
  error: unknown;
}

export function XError({ error }: XErrorProps) {
  const t = useTranslations();
  const errorMessage =
    error instanceof Error ? error.message : t("error.unknown");

  return (
    <div className="flex items-center justify-center py-8">
      <p className="text-destructive">{errorMessage}</p>
    </div>
  );
}
