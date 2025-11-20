"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          success: "!bg-green-600 !text-white !border-green-600",
          error: "!bg-red-500 !text-white !border-red-500",
          title: "!text-white !font-semibold !opacity-100",
          description: "!text-white !opacity-100",
        },
        style: {
          background: "var(--toast-bg)",
          color: "var(--toast-text)",
          border: "var(--toast-border)",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
