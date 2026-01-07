import Image from 'next/image';

export function Logo() {
  return (
    <Image 
      src="/Image/Logo BMV Global_2025_02.png" 
      alt="BMV Global Logo" 
      width={120} 
      height={40} 
      className="h-8 w-auto"
      priority
    />
  );
}
