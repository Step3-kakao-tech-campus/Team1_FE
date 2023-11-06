import React, { useEffect, useState } from 'react';

const DefferedSuspense = ({ children, deffered = true }: { children: React.ReactNode; deffered?: boolean }) => {
  const [isDeferred, setIsDeferred] = useState(false);
  const time = deffered ? 200 : 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsDeferred(true);
    }, time);
    return () => clearTimeout(timeout);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return <>{children}</>;
};

export default DefferedSuspense;
