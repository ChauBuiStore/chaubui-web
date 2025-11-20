"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface XRadioGroupOption {
  value: string;
  label: string;
  id: string;
}

export interface XRadioGroupProps {
  options: XRadioGroupOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
}

export const XRadioGroup = forwardRef<HTMLDivElement, XRadioGroupProps>(
  (
    {
      options,
      value,
      onValueChange,
      className,
      orientation = "vertical",
      disabled = false,
    },
    ref
  ) => {
    return (
      <RadioGroup
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        className={cn(
          orientation === "horizontal" ? "flex space-x-4" : "space-y-2",
          className
        )}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.id} />
            <label
              htmlFor={option.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup>
    );
  }
);

XRadioGroup.displayName = "XRadioGroup";
