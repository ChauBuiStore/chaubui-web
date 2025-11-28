"use client";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import * as React from "react";

import { XButton, XPopover } from "@/components/common";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export interface XComboboxItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface XComboboxProps {
  items: XComboboxItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  fullWidth?: boolean;
  minWidth?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  contentClassName?: string;
}

export const XCombobox = React.forwardRef<HTMLDivElement, XComboboxProps>(
  (
    {
      items = [],
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      placeholder = "Select...",
      searchPlaceholder = "Search...",
      emptyText = "No results found.",
      fullWidth = false,
      minWidth = "200px",
      disabled = false,
      className,
      buttonClassName,
      contentClassName,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [buttonWidth, setButtonWidth] = React.useState<number | null>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    useEffect(() => {
      if (buttonRef.current) {
        const updateWidth = () => {
          setButtonWidth(buttonRef.current?.offsetWidth || null);
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
      }
    }, []);

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const selectedItem = items.find((item) => item.value === value);

    return (
      <XPopover
        ref={ref}
        className={className}
        open={open}
        onOpenChange={setOpen}
        disabled={disabled}
        align="start"
        contentClassName={cn("p-0 w-auto", contentClassName)}
        trigger={
          <XButton
            ref={buttonRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "justify-between rounded-none",
              fullWidth ? "w-full" : "",
              buttonClassName
            )}
            style={{ minWidth: fullWidth ? undefined : minWidth }}
          >
            <span className="truncate">
              {selectedItem ? selectedItem.label : placeholder}
            </span>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </XButton>
        }
      >
        <Command
          style={{
            width: buttonWidth ? `${buttonWidth}px` : undefined,
            minWidth: fullWidth ? undefined : minWidth,
          }}
        >
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    handleValueChange(newValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </XPopover>
    );
  }
);

XCombobox.displayName = "XCombobox";
