'use client';

import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Logo({ className = '', size = 'medium' }: LogoProps) {
  const sizes = {
    small: { width: 80, height: 40 },
    medium: { width: 120, height: 60 },
    large: { width: 160, height: 80 }
  };

  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/logo.png"
        alt="brtH Logo"
        width={sizes[size].width}
        height={sizes[size].height}
        priority
        className="object-contain"
      />
    </div>
  );
} 