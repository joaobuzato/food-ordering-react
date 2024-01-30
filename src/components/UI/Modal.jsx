import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
export default function Modal({ children, open, className = " ", onClose }) {
  const dialog = useRef();
  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }
    //esta é uma cleanup function, que roda após a variável OPEN mudar
    //logo, se este useEffect re executar e OPEN não for TRUE, fecha a modal
    return () => modal.close();
  }, [open]);
  return createPortal(
    <dialog ref={dialog} className={"modal " + className} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
