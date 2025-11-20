import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { cn } from '@/lib/utils';
import React from 'react';

interface XAvatarProps extends React.ComponentProps<typeof Avatar> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
}

const sizeClasses = {
  xs: 'size-6',
  sm: 'size-8',
  default: 'size-10',
  lg: 'size-12',
  xl: 'size-16',
};

const XAvatar = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  XAvatarProps
>(({ src, alt, fallback, size = 'default', className, ...props }, ref) => {
  return (
    <Avatar
      ref={ref}
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      {src && <AvatarImage src={src} alt={alt} />}
      {fallback && <AvatarFallback>{fallback}</AvatarFallback>}
    </Avatar>
  );
});

XAvatar.displayName = 'XAvatar';

export { XAvatar };
export type { XAvatarProps };

