import * as React from "react";
import { cn } from "@/lib/utils";

type XCardProps = Omit<React.ComponentProps<"div">, "title" | "content"> & {
  header?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  actionClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
};

const XCard = React.forwardRef<HTMLDivElement, XCardProps>(
  (
    {
      header,
      title,
      description,
      action,
      content,
      footer,
      headerClassName,
      titleClassName,
      descriptionClassName,
      actionClassName,
      contentClassName,
      footerClassName,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-slot="card"
        className={cn(
          "bg-card text-card-foreground flex flex-col gap-6 rounded-none border py-6 shadow-sm",
          className
        )}
        {...props}
      >
        {(header || title || description || action) && (
          <div
            data-slot="card-header"
            className={cn(
              "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
              headerClassName
            )}
          >
            {title && (
              <div
                data-slot="card-title"
                className={cn("leading-none font-semibold", titleClassName)}
              >
                {title}
              </div>
            )}
            {description && (
              <div
                data-slot="card-description"
                className={cn(
                  "text-muted-foreground text-sm",
                  descriptionClassName
                )}
              >
                {description}
              </div>
            )}
            {action && (
              <div
                data-slot="card-action"
                className={cn(
                  "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
                  actionClassName
                )}
              >
                {action}
              </div>
            )}
            {header}
          </div>
        )}

        {content && (
          <div
            data-slot="card-content"
            className={cn("px-6", contentClassName)}
          >
            {content}
          </div>
        )}

        {children}

        {footer && (
          <div
            data-slot="card-footer"
            className={cn(
              "flex items-center px-6 [.border-t]:pt-6",
              footerClassName
            )}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }
);

XCard.displayName = "XCard";

export { XCard };
export type { XCardProps };
