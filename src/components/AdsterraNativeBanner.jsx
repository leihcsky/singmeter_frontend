import { useEffect, useRef } from 'react';

const AdsterraNativeBanner = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Prevent duplicate script injection
    if (wrapperRef.current && !wrapperRef.current.querySelector('script[src*="invoke.js"]')) {
      const script = document.createElement('script');
      script.src = "//pl28588591.effectivegatecpm.com/707774cb86b0aef9496b92be3fc38942/invoke.js";
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      
      wrapperRef.current.appendChild(script);
    }
  }, []);

  return (
    <div ref={wrapperRef} className="flex flex-col items-center justify-center my-8 w-full overflow-hidden">
      {/* Adsterra Native Banner Container */}
      <div id="container-707774cb86b0aef9496b92be3fc38942"></div>
    </div>
  );
};

export default AdsterraNativeBanner;
