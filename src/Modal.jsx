import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ children }) => {
  const elref = useRef(null);
  if (!elref.current) {
    elref.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elref.current);

    return () => modalRoot.removeChild(elref.current);
  }, []);

  return createPortal(<div>{children}</div>, elref.current);
};
