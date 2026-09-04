import React from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  clean?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  clean = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        !clean && 'max-w-7xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
