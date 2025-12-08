"use client"

import { XButton, XCard, XPopover } from "@/components/common"
import { ROUTER } from "@/lib/constants"
import { useTranslations } from "@/lib/hooks"
import { loginSelectors, useLoginStore } from "@/lib/stores"
import { UserRound } from "lucide-react"
import Link from "next/link"
import { useLayoutEffect, useState, startTransition } from "react"
import { LoginForm } from "@/modules/auth/components/login-form"

export function AccountGuest() {
  const t = useTranslations("auth")
  const [open, setOpen] = useState(false)
  const shouldOpen = useLoginStore(loginSelectors.shouldOpen)

  useLayoutEffect(() => {
    if (shouldOpen) {
      startTransition(() => {
        setOpen(true)
      })
      useLoginStore.getState().setShouldOpen(false)
    }
  }, [shouldOpen])

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
  }

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <XPopover
      open={open}
      onOpenChange={handleOpenChange}
      align="end"
      side="bottom"
      sideOffset={8}
      contentClassName="w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] lg:w-96 p-0"
      trigger={
        <XButton
          variant="ghost"
          size="icon"
          className="hover:text-destructive !bg-transparent uppercase font-semibold h-9 w-9 sm:h-10 sm:w-10 touch-manipulation"
          aria-label="Account"
        >
          <UserRound className="h-5 w-5 sm:h-5 sm:w-5" />
        </XButton>
      }
    >
      <XCard
        className="border-0 shadow-none"
        title={t("loginTitle")}
        description={t("loginDescription")}
        headerClassName="text-center pb-4"
        titleClassName="text-base sm:text-lg"
        descriptionClassName="text-xs"
      >
        <div className="px-4 sm:px-6 space-y-4 sm:space-y-6">
          <LoginForm onSuccess={() => setOpen(false)} />
          <div className="space-y-2 text-center">
            <div className="text-sm text-muted-foreground">
              {t("newCustomer")}{" "}
              <Link
                href={ROUTER.REGISTER}
                className="hover:text-primary hover:underline font-medium"
                onClick={handleLinkClick}
              >
                {t("createAccount")}
              </Link>
            </div>
          </div>
        </div>
      </XCard>
    </XPopover>
  )
}
