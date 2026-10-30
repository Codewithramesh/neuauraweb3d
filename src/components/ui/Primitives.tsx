import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { site } from "../../content/site";
export function SectionLabel({
  number,
  children,
  right,
}: {
  number: string;
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="section-label">
      <span>
        <i />
        {number} / {children}
      </span>
      {right && <span>{right}</span>}
    </div>
  );
}
export function SampleLabel({ short = false }: { short?: boolean }) {
  return (
    <span className={`sample-label ${short ? "short" : ""}`}>
      {short ? "ILLUSTRATIVE" : site.sampleLabel}
    </span>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className="confirmation-dialog"
      aria-label={title}
      onCancel={onClose}
    >
      <div className="dialog-heading">
        <span className="eyebrow">HUMAN CONFIRMATION</span>
        <button
          aria-label="Close confirmation"
          className="icon-button"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>
      <h3>{title}</h3>
      {children}
    </dialog>
  );
}
