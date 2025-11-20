import { Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";
import React from "react";

interface XTextareaProps extends React.ComponentProps<typeof Textarea> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperTextClassName?: string;
}

const XTextarea = React.forwardRef<HTMLTextAreaElement, XTextareaProps>(
  (
    {
      label,
      error,
      helperText,
      containerClassName,
      labelClassName,
      errorClassName,
      helperTextClassName,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <Textarea
          ref={ref}
          className={className}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p
            className={cn(
              "text-destructive text-xs font-medium",
              errorClassName
            )}
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p
            className={cn("text-muted-foreground text-xs", helperTextClassName)}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

XTextarea.displayName = "XTextarea";

export { XTextarea };
export type { XTextareaProps };

