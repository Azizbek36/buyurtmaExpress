import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка наверх при изменении пути
  }, [pathname]);

  return null; // Этот компонент ничего не рендерит
};

export default ScrollToTop;
