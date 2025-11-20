"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface RadioItem {
  id: string;
}

interface XRadioGroupCardProps<T extends RadioItem> {
  items: T[];
  value: T | null;
  onChange: (item: T) => void;
  renderContent: (item: T) => ReactNode;
  renderExtra?: (item: T) => ReactNode;
  className?: string;
}

export function XRadioGroupCard<T extends RadioItem>({
  items,
  value,
  onChange,
  renderContent,
  renderExtra,
  className,
}: XRadioGroupCardProps<T>) {
  return (
    <RadioGroup
      value={value?.id || ""}
      onValueChange={(selectedId) => {
        const selectedItem = items.find((item) => item.id === selectedId);
        if (selectedItem) onChange(selectedItem);
      }}
      className={cn("space-y-2", className)}
    >
      {items.map((item) => (
        <div key={item.id}>
          <Label
            htmlFor={item.id}
            className={cn(
              "flex items-start justify-between w-full p-4 border-1 rounded-lg cursor-pointer transition-all",
              "hover:border-gray-400",
              value?.id === item.id
                ? "border-black bg-gray-50"
                : "border-gray-200"
            )}
          >
            <div className="flex items-start gap-3 flex-1">
              <RadioGroupItem value={item.id} id={item.id} className="mt-1" />
              <div className="flex-1">{renderContent(item)}</div>
            </div>
            {renderExtra && (
              <div className="flex items-center ml-3">{renderExtra(item)}</div>
            )}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

