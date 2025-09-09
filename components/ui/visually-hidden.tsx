"use client";

import * as React from "react";
import { Root as RadixVisuallyHidden } from "@radix-ui/react-visually-hidden";

const VisuallyHidden = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<typeof RadixVisuallyHidden>>(
  ({ ...props }, ref) => <RadixVisuallyHidden ref={ref} {...props} />
);

VisuallyHidden.displayName = "VisuallyHidden";

export { VisuallyHidden };


