// hooks/useIsMobile.ts
import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint: number = 768): boolean => {
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
const checkScreenSize = () => {
    setIsMobile(window.innerWidth < breakpoint);
};

checkScreenSize(); // Initial check
window.addEventListener('resize', checkScreenSize);

return () => window.removeEventListener('resize', checkScreenSize);
}, [breakpoint]);

return isMobile;
};