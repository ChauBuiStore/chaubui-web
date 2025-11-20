import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import React from 'react';

interface XButtonProps 
  extends Omit<React.ComponentProps<typeof Button>, 'size'> {
  children: React.ReactNode;
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon';
}

const XButton = React.forwardRef<HTMLButtonElement, XButtonProps>(
  ({ children, size, className, ...props }, ref) => {
    const xlSizeClass = size === 'xl' ? 'h-12 px-8 has-[>svg]:px-6' : '';
    
    return (
      <Button 
        ref={ref} 
        size={size === 'xl' ? undefined : (size as 'default' | 'sm' | 'lg' | 'icon')}
        className={cn(`cursor-pointer rounded-none ${xlSizeClass}`, className)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

XButton.displayName = 'XButton';

export { XButton };
export type { XButtonProps };
