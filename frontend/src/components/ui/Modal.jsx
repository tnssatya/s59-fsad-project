import { FiX } from "react-icons/fi";
import Button from "./Button";

function Modal({ isOpen, onClose, title, children, side = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 p-4" onClick={onClose}>
      <div
        className={`h-full overflow-auto rounded-2xl bg-white p-5 shadow-panel dark:bg-surfaceDark ${
          side ? "ml-auto w-full max-w-xl" : "mx-auto mt-10 w-full max-w-2xl"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button
            variant="ghost"
            size="sm"
            iconLeft={FiX}
            aria-label="Close modal"
            onClick={onClose}
            className="!p-1"
          />
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
