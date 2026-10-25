"use client";

import { useEffect, useState } from "react";

export default function A4ULoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1850);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="a4u-loader" aria-label="Loading Anime4u" role="status">
      <div className="a4u-loader-logo">
        <img className="a4u-loader-base" src="/assets/anime4u-loader-white.png" alt="" />
        <div className="a4u-loader-fill">
          <img src="/assets/anime4u-loader-pink.png" alt="" />
        </div>
      </div>
    </div>
  );
}
