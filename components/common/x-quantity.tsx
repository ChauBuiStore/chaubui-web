"use client";

import { XButton, XInput } from "@/components/common";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface XQuantityProps {
  value?: number;
  initialValue?: number;
  min?: number;
  max?: number;
  className?: string;
  size?: "default" | "small";
  onChange?: (value: number) => void;
}

export function XQuantity({
  value: controlledValue,
  initialValue = 1,
  min = 1,
  max = 99,
  className = "",
  size = "default",
  onChange
}: XQuantityProps) {
  const [internalValue, setInternalValue] = useState(initialValue);
  
  const isControlled = controlledValue !== undefined;
  const quantity = isControlled ? controlledValue : internalValue;

  const handleQuantityChange = (newQuantity: number) => {
    const clampedQuantity = Math.max(min, Math.min(max, newQuantity));
    
    if (isControlled) {
      onChange?.(clampedQuantity);
    } else {
      setInternalValue(clampedQuantity);
      onChange?.(clampedQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      handleQuantityChange(min);
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        handleQuantityChange(numValue);
      }
    }
  };

  const handleMinus = () => {
    handleQuantityChange(quantity - 1);
  };

  const handlePlus = () => {
    handleQuantityChange(quantity + 1);
  };

  const isSmall = size === "small";

  return (
    <div className={`flex items-center ${isSmall ? "mb-4" : "mb-6"} ${className}`}>
      <XButton
        type="button"
        variant="outline"
        size="icon"
        onClick={handleMinus}
        disabled={quantity <= min}
        className={`${isSmall ? "h-8 w-8" : "h-10 w-10"} border-none bg-gray-200`}
      >
        <Minus className={`${isSmall ? "h-3 w-3" : "h-4 w-4"}`} />
      </XButton>

      <XInput
        type="number"
        id="quantity"
        name="quantity"
        value={quantity.toString()}
        min={min}
        max={max}
        onChange={handleInputChange}
        className={`${isSmall ? "w-16 h-8" : "w-20 h-10"} text-center bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
      />

      <XButton
        type="button"
        variant="outline"
        size="icon"
        onClick={handlePlus}
        disabled={quantity >= max}
        className={`${isSmall ? "h-8 w-8" : "h-10 w-10"} border-none bg-gray-200`}
      >
        <Plus className={`${isSmall ? "h-3 w-3" : "h-4 w-4"}`} />
      </XButton>
    </div>
  );
}
