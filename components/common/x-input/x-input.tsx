import { Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { XButton } from "@/components/common";

interface XInputProps extends Omit<React.ComponentProps<typeof Input>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperTextClassName?: string;
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon';
}

const XInput = React.forwardRef<HTMLInputElement, XInputProps>(
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
      type,
      size = 'default',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const sizeClasses = {
      sm: 'h-8 px-2.5 py-1 text-sm',
      default: 'h-9 px-3 py-1 text-base md:text-sm',
      lg: 'h-10 px-4 py-1.5 text-base',
      xl: 'h-12 px-5 py-2 text-base',
      icon: 'size-9 p-0',
    };

    const toggleSizes = {
      sm: { button: 'h-7 w-7', icon: 'h-3.5 w-3.5', padding: 'pr-9' },
      default: { button: 'h-8 w-8', icon: 'h-4 w-4', padding: 'pr-10' },
      lg: { button: 'h-9 w-9', icon: 'h-4 w-4', padding: 'pr-11' },
      xl: { button: 'h-10 w-10', icon: 'h-5 w-5', padding: 'pr-12' },
      icon: { button: 'h-8 w-8', icon: 'h-4 w-4', padding: 'pr-10' },
    };

    const { button: buttonSize, icon: iconSize, padding: passwordPadding } = toggleSizes[size];

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
        <div className="relative">
          <Input
            ref={ref}
            type={inputType}
            className={cn(
              sizeClasses[size],
              isPassword && passwordPadding,
              className
            )}
            aria-invalid={!!error}
            {...props}
          />
          {isPassword && (
            <XButton
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
              className={cn(
                "absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                buttonSize
              )}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className={iconSize} />
              ) : (
                <Eye className={iconSize} />
              )}
            </XButton>
          )}
        </div>
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

XInput.displayName = "XInput";

export { XInput };
export type { XInputProps };

